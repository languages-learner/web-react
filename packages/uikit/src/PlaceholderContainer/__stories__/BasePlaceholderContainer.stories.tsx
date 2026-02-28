import { BasePlaceholderContainer } from "../BasePlaceholderContainer";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "UiKit/BasePlaceholderContainer",
    component: BasePlaceholderContainer,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof BasePlaceholderContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const ImageComponentTest = () => {
    return (
        <svg width="230" height="230" viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
                <text
                    fill="#999999"
                    fontFamily="Sans-serif"
                    fontSize="26"
                    strokeWidth="0"
                    textAnchor="middle"
                    transform="matrix(1.88041 0 0 1.88041 -48.1289 -81.7475)"
                    x="86.49"
                    y="114"
                >
                    1:1
                </text>
            </g>
        </svg>
    );
};

export const Default: Story = {
    args: {
        title: "Some title",
        description:
            "Some long descriptionProps text that can contain of long long very long text etc. It can be repeated like this. Some long descriptionProps text that can contain of long long very long text etc.",
        actions: [{ text: "Action", onPress: () => alert("onPress") }],
        image: <ImageComponentTest />,
    },
};
