import { ColorsApp } from "../../../../styled/types";

type Size = "large" | "medium" | "small" | 'xs' | 'xxs';

interface LoadingSpinnerCustomProps {
    size: Size;
    color: ColorsApp;
    center? : boolean;
}

export type LoadingSpinnerProps = LoadingSpinnerCustomProps & React.HTMLAttributes<HTMLDivElement>;
