import { ColorsApp } from '../../styled/types';

export interface BadgeCustomProps {
    number: number;
    color?: ColorsApp;
}

export type BadgeProps = BadgeCustomProps & React.HTMLAttributes<HTMLDivElement>;