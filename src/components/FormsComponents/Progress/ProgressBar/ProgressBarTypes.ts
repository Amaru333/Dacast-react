import { ColorsApp } from '../../../../styled/types';

type Size = "large" | "small";

export interface ProgressBarSpecificProps {
    size: Size;
    color: ColorsApp;
    startingValue: number;
    label?: string;
    static?: boolean;
}

export type ProgressBarProps = ProgressBarSpecificProps & React.HTMLAttributes<HTMLDivElement>;