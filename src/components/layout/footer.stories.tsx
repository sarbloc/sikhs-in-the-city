import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./footer";

const meta = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithPageContent: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto p-8">
        <h1 className="text-3xl font-bold">Page Content</h1>
        <p className="mt-4 text-muted-foreground">
          The footer appears at the bottom of the page.
        </p>
      </main>
      <Footer />
    </div>
  ),
};
