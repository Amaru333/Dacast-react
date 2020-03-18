import { ColorsApp } from "../../../../app/styled/types";

type Size = "large" | "medium" | "small";

interface LoadingSpinnerCustomProps {
    size: Size;
    color: ColorsApp;
}

export type LoadingSpinnerProps = LoadingSpinnerCustomProps & React.HTMLAttributes<HTMLDivElement>;
