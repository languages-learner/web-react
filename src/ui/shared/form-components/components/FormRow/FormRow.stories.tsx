import { TextInput } from "@gravity-ui/uikit";

import { FormRow } from "./FormRow";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "UiKit/FormRow",
    component: FormRow,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof FormRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Title",
        children: <TextInput />,
    },
};
