import * as React from "react";

import { TextInput } from "@gravity-ui/uikit";

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
                    <TextInput />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row title={"Very very very long title"}>
                    <TextInput />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row title={"Medium title"}>
                    <TextInput />
                </FormRowsContainer.Row>
            </React.Fragment>
        ),
    },
};
