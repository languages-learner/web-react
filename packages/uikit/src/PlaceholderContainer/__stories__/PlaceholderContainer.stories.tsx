import { PlaceholderContainer } from "../PlaceholderContainer";
import { PlaceholderContainerStatus } from "../constants";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "UiKit/PlaceholderContainer",
    component: PlaceholderContainer,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        title: "",
        description: "Some description",
        actions: [{ text: "Action", onPress: () => alert("onPress") }],
        status: PlaceholderContainerStatus.Empty,
    },
} satisfies Meta<typeof PlaceholderContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Statuses: Story = {
    render: (args) => {
        const statuses = Object.keys(PlaceholderContainerStatus);
        const placeholders = statuses.map((status) => (
            <PlaceholderContainer
                key={status}
                {...args}
                title={`Status: ${status}`}
                status={status as unknown as PlaceholderContainerStatus}
                className="border border-black"
            />
        ));

        return <div className="flex flex-wrap gap-10">{placeholders}</div>;
    },
};
