import { CardContent } from "../CardContent";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "UiKit/CardContent",
    component: CardContent,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof CardContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Title",
        closable: true,
        onClose: () => window.alert("onClose"),
        children: <div>Any content</div>,
    },
};
