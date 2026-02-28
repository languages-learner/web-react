import { Spinner } from "@heroui/spinner";
import type { SpinnerProps } from "@heroui/spinner";

export type LoaderProps = Omit<SpinnerProps, "variant">;

export const Loader: React.FC<LoaderProps> = (props) => {
    return <Spinner {...props} variant="wave" />;
};
