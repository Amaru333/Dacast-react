export interface TooltipCustomProps {
    target: string;
    leftValueToZero?:boolean;
}

export type TooltipProps = TooltipCustomProps & React.HTMLAttributes<HTMLDivElement>