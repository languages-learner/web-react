import React from "react";

import { Select } from "@gravity-ui/uikit";

import { type ApiDatabase } from "@/shared/services/api";

export interface WordStatusSelectorProps {
    status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
    onUpdate: (
        status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
    ) => unknown;
}

export const WordStatusSelector: React.FC<WordStatusSelectorProps> = ({
    status,
    onUpdate,
}) => {
    return (
        <Select
            title="Word status"
            onUpdate={(values) =>
                onUpdate(
                    values[0] as ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
                )
            }
            value={[status]}
            size={"l"}
        >
            <Select.Option content={"New"} value={"New"} />
            <Select.Option content={"Learn"} value={"Learn"} />
            <Select.Option content={"Learned"} value={"Learned"} />
        </Select>
    );
};
