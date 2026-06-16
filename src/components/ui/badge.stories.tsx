import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "info", "violet", "outline"],
      description: "Couleur et style du badge",
    },
    children: { control: "text" },
  },
  args: {
    children: "En production",
    variant: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: { variant: "success", children: "Actif" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "En production" },
};

export const Info: Story = {
  args: { variant: "info", children: "Disponible" },
};

export const Violet: Story = {
  args: { variant: "violet", children: "Déployé" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Next.js" },
};

export const ProjectStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Actif</Badge>
      <Badge variant="info">Disponible</Badge>
      <Badge variant="violet">Déployé</Badge>
      <Badge variant="warning">En production</Badge>
    </div>
  ),
};

export const TechStack: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js", "WordPress"].map((tech) => (
        <Badge key={tech} variant="outline">{tech}</Badge>
      ))}
    </div>
  ),
};
