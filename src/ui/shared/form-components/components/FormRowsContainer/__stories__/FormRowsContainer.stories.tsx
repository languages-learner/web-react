import * as React from "react";

import { Input } from "@heroui/input";

import { FormRowsContainer } from "../FormRowsContainer";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "UiKit/FormRowsContainer",
    component: FormRowsContainer,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof FormRowsContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <React.Fragment>
                <FormRowsContainer.Row title={"Small title"}>
                    <Input placeholder="Your text" />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row title={"Very very very long title"}>
                    <Input placeholder="Your text" />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row title={"Medium title"}>
                    <Input placeholder="Your text" />
                </FormRowsContainer.Row>
            </React.Fragment>
        ),
    },
};
