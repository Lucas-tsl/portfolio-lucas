import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#09090b" },
      ],
    },
    a11y: { test: "todo" },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "#09090b";
      return (
        <div className={isDark ? "dark" : ""}>
          <div className="bg-white p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 min-h-screen">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
