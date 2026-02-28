import React from "react";

export const useDebounce = <Value>(initialValue: Value, delay: number) => {
    const [value, setValue] = React.useState<Value>(initialValue);
    React.useEffect(() => {
        const handler = setTimeout(() => setValue(initialValue), delay);

        return () => clearTimeout(handler);
    }, [initialValue, delay]);

    return value;
};

export const useDebounceState = <Value>(initialValue: Value, delay: number) => {
    const [value, setValue] = React.useState<Value>(initialValue);
    const debounceValue = useDebounce(value, delay);

    return [value, setValue, debounceValue] as const;
};
