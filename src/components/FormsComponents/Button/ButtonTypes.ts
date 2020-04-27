import { ColorsApp } from '../../../styled/types';

export type Size = "large" | "small" | "xs"
export type Type = "primary" | "secondary" | "tertiary";


type Color = 'red' | 'blue' | 'green' | 'gray';

export interface ButtonCustomProps {
    sizeButton: Size;
    typeButton: Type;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    buttonColor?: Color;
    colorObject?: ColorObject;
    form?: string;
    isLoading?: boolean;
}

export interface ColorObject {hoverColor: ColorsApp; primaryHoverColor: ColorsApp; color: ColorsApp; focusColor: ColorsApp; primaryFocusColor: ColorsApp; disabledColor: ColorsApp; disabledTextColor: ColorsApp; borderColor?: ColorsApp}

export const buttonArrayColor: {[key: string]: ColorObject } = {
    "red": {primaryHoverColor:"red40", hoverColor:"red40", color:"red", primaryFocusColor:"red60", focusColor:"red60", disabledColor: "red60", disabledTextColor: "red"},
    "blue": {primaryHoverColor:"violet40", hoverColor:"violet20", color:"violet", primaryFocusColor:"violet60", focusColor:"violet40", disabledColor: "violet60", disabledTextColor: "violet"},
    "gray": {primaryHoverColor:"violet40", hoverColor:"violet10", color:"gray-1", primaryFocusColor:"violet60", focusColor:"violet10", disabledColor: "white", disabledTextColor: "gray-1", borderColor: "gray-7"},
}

export type ButtonProps = ButtonCustomProps & React.HTMLAttributes<HTMLButtonElement>;
