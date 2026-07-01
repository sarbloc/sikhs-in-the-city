import Link from "next/link";
import { BLOCKS, INLINES, MARKS, type Document } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => <p className="leading-relaxed">{children}</p>,
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mt-8 text-2xl font-bold tracking-tight text-foreground">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="list-disc space-y-2 pl-6 marker:text-primary">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="list-decimal space-y-2 pl-6 marker:text-primary">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_node, children) => (
      <blockquote className="border-l-4 border-primary bg-muted/50 py-3 pr-4 pl-5 text-lg italic text-foreground/80">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-border" />,
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = String((node.data as { uri?: string }).uri ?? "");
      const className = "font-medium text-primary underline underline-offset-4";
      if (uri.startsWith("/")) {
        return (
          <Link href={uri} className={className}>
            {children}
          </Link>
        );
      }
      // Allow-list safe schemes only. mailto:/tel:/#fragment keep default
      // behaviour; real http(s) links open in a new tab.
      if (/^(#|mailto:|tel:)/i.test(uri)) {
        return (
          <a href={uri} className={className}>
            {children}
          </a>
        );
      }
      if (/^https?:\/\//i.test(uri)) {
        return (
          <a href={uri} target="_blank" rel="noopener noreferrer" className={className}>
            {children}
          </a>
        );
      }
      // Unknown / unsafe scheme (javascript:, data:, ...): render as plain text.
      return <span>{children}</span>;
    },
  },
};

/** Renders a Contentful rich-text document with the site's article styling. */
export function NewsBody({ document }: { document: Document }) {
  return (
    <div className="space-y-5 text-base text-foreground/90">
      {documentToReactComponents(document, options)}
    </div>
  );
}
