import React from "react";

import { Xmark } from "@gravity-ui/icons";
import { Button, Card, Flex, Icon, Text, TextInput } from "@gravity-ui/uikit";

import { FormRow } from "@/shared/form-components";

import styles from "./CreateWordCard.module.scss";

export interface CreateWordCardProps {
    className?: string;
    onClose: () => unknown;
}

export const CreateWordCard: React.FC<CreateWordCardProps> = ({
    className,
    onClose,
}) => {
    return (
        <Card className={className}>
            <Flex
                className={styles.CreateWordCardContent}
                direction={"column"}
                gap={8}
            >
                <Flex justifyContent={"space-between"}>
                    <Text variant="subheader-3">Add new word</Text>
                    <Button view="flat" onClick={onClose}>
                        <Button.Icon>
                            <Icon data={Xmark} />
                        </Button.Icon>
                    </Button>
                </Flex>
                <Flex direction={"column"} gap={3} style={{ maxWidth: 300 }}>
                    <FormRow title="Source word">
                        <TextInput />
                    </FormRow>
                    <FormRow title="Translations">123</FormRow>
                </Flex>
                <div>
                    <Button view="action" size="l">
                        Add word
                    </Button>
                </div>
            </Flex>
        </Card>
    );
};
