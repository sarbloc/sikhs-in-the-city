/**
 * Minimal RFC4180-style CSV parser — quoted fields, escaped quotes ("" -> "),
 * CRLF/LF line endings. No streaming, no config: sized for small result files,
 * not a general-purpose library (deliberately no dependency).
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    // Skip rows that are entirely empty (e.g. trailing newline).
    if (row.length > 1 || row[0] !== "") rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"' && field === "") {
      inQuotes = true;
    } else if (ch === ",") {
      endField();
    } else if (ch === "\n") {
      endRow();
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (inQuotes) {
    // EOF inside a quoted field — the file is malformed; surface it so callers
    // can show an error state instead of silently rendering partial data.
    throw new Error("Malformed CSV: unterminated quoted field");
  }
  if (field !== "" || row.length > 0) endRow();
  return rows;
}
