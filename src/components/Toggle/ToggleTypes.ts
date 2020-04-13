export interface ToggleCustomProps {
    label: string;
    callback? : Function;
    name?: string;
    ref?: any;
}

export type ToggleProps = ToggleCustomProps & React.HTMLAttributes<HTMLInputElement>