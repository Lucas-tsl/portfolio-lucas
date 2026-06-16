import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
      description: "Apparence visuelle du bouton",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Taille du bouton",
    },
    isLoading: {
      control: "boolean",
      description: "Affiche un spinner et désactive le bouton",
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Envoyer le message",
    variant: "primary",
    size: "md",
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Voir le code source" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Annuler" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Supprimer" },
};

export const Loading: Story = {
  args: { isLoading: true, children: "Envoi en cours…" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Indisponible" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Petit</Button>
      <Button size="md">Moyen</Button>
      <Button size="lg">Grand</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
