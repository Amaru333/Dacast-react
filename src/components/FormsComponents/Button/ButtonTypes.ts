import { ColorsApp } from '../../../styled/types';

export type Size = "large" | "small";
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

export interface ColorObject {hoverColor: ColorsApp; color: ColorsApp; focusColor: ColorsApp; disabledColor: ColorsApp; disabledTextColor: ColorsApp}

export const buttonArrayColor: {[key: string]: ColorObject } = {
    "red": {hoverColor:"red40", color:"red", focusColor:"red60", disabledColor: "red60", disabledTextColor: "red"},
    "blue": {hoverColor:"violet40", color:"violet", focusColor:"violet60", disabledColor: "violet60", disabledTextColor: "violet"},
}

export type ButtonProps = ButtonCustomProps & React.HTMLAttributes<HTMLButtonElement>;
