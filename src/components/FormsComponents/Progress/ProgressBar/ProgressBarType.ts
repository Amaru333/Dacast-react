import { ColorsApp } from '../../../../styled/types';

type Size = "large" | "small";

export interface ProgressBarSpecificProps {
    size: Size;
    color: ColorsApp;
    startingValue: string;
}

export type ProgressBarProps = ProgressBarSpecificProps & React.HTMLAttributes<HTMLDivElement>;