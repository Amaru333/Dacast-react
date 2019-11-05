import { ColorsApp } from '../../../styled/types';

export type Size = "large" | "small" | "xs"
export type Type = "primary" | "secondary" | "tertiary";


type Color = 'red' | 'blue' | 'green';

export interface ButtonCustomProps {
    sizeButton: Size;
    typeButton: Type;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    buttonColor?: Color;
    colorObject?: ColorObject;
}

export interface ColorObject {hoverColor: ColorsApp; primaryHoverColor: ColorsApp; color: ColorsApp; focusColor: ColorsApp; primaryFocusColor: ColorsApp; disabledColor: ColorsApp; disabledTextColor: ColorsApp}

export const buttonArrayColor: {[key: string]: ColorObject } = {
    "red": {primaryHoverColor:"red40", hoverColor:"red40", color:"red", primaryFocusColor:"red60", focusColor:"red60", disabledColor: "red60", disabledTextColor: "red"},
    "blue": {primaryHoverColor:"violet40", hoverColor:"violet20", color:"violet", primaryFocusColor:"violet60", focusColor:"violet40", disabledColor: "violet60", disabledTextColor: "violet"},
}

export type ButtonProps = ButtonCustomProps & React.HTMLAttributes<HTMLButtonElement>;
