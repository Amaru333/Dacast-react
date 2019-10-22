import * as React from "react";
import { ButtonProps, buttonArrayColor } from './ButtonTypes';
import { ButtonStyle } from './ButtonStyle';


export const Button = (props: ButtonProps) => {

    return <ButtonStyle colorObject={buttonArrayColor[props.buttonColor!]} {...props}>{props.children}</ButtonStyle>;

}

Button.defaultProps = {typeButton: "primary", sizeButton: "large", buttonColor: "blue"}