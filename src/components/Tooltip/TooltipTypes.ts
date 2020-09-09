export interface TooltipCustomProps {
    target: string;
    leftPositionValueToZero?:boolean;
}

export type TooltipProps = TooltipCustomProps & React.HTMLAttributes<HTMLDivElement>