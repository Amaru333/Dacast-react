export interface ToggleCustomProps {
    label: string;
    callback? : Function;
    name?: string;
    refForwarded?: any;
}

export type ToggleProps = ToggleCustomProps & React.HTMLAttributes<HTMLInputElement>