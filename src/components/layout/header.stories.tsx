import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./header";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithContent: Story = {
  render: () => (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Page Content</h1>
        <p className="mt-4 text-muted-foreground">
          The header stays fixed at the top as you scroll.
        </p>
        <div className="mt-8 h-[200vh] rounded-lg bg-muted p-8">
          <p>Scroll down to see the sticky header behavior.</p>
        </div>
      </main>
    </div>
  ),
};
