import React from "react";

import { HelpMark } from "@gravity-ui/uikit";

import styles from "./FormRowLabel.module.scss";

export interface FormRowLabelProps {
    title?: React.ReactNode;
    note?: React.ReactNode | string;
    // required?: boolean;
}

export const FormRowLabel: React.FC<FormRowLabelProps> = ({
    title,
    note,
    // required,
}) => {
    const noteElement = note ? (
        <HelpMark className={styles.Note} popoverProps={{ placement: ["bottom", "top"] }}>
            {note}
        </HelpMark>
    ) : null;

    return (
        <div>
            <span>{title}</span>
            {Boolean(noteElement) && <React.Fragment>&nbsp;</React.Fragment>}
            {noteElement}
        </div>
    );
};
