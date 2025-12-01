import { Button } from "@heroui/button";
import { BiEdit } from "react-icons/bi";

import { ActionsPanel } from "../ActionsPanel";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "UiKit/ActionsPanel",
    component: ActionsPanel,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof ActionsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        note: "10 words",
        onClose: () => window.alert("onClose"),
        actions: [
            <Button
                key="update-status"
                startContent={<BiEdit size={16} />}
                variant="light"
                size="sm"
                className="text-primary-foreground"
            >
                Update status
            </Button>,
        ],
    },
};
