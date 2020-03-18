import { ColorsApp } from '../../../../app/styled/types';

type Size = "large" | "small";

export interface ProgressBarSpecificProps {
    size: Size;
    color: ColorsApp;
    startingValue: number;
    label?: string;
}

export type ProgressBarProps = ProgressBarSpecificProps & React.HTMLAttributes<HTMLDivElement>;