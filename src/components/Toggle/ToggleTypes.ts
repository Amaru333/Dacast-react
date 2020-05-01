export interface ToggleCustomProps {
    label: string;
    callback? : Function;
    name?: string;
    refForwarded?: any;
    checked? : boolean;
}

export type ToggleProps = ToggleCustomProps & React.HTMLAttributes<HTMLInputElement>