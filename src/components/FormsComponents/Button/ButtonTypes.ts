type Size = "large" | "small";
type Type = "primary" | "secondary" | "tertiary";

export interface ButtonCustomProps {
    sizeButton: Size;
    typeButton: Type;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
}

export type ButtonProps = ButtonCustomProps & React.HTMLAttributes<HTMLButtonElement>;
