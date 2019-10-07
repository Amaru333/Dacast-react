import * as React from "react";
import { ButtonProps } from './ButtonTypes';
import { ButtonStyle } from './ButtonStyle';


export const Button = (props : ButtonProps) => {

    return <ButtonStyle {...props}>{props.children}</ButtonStyle>;

}

Button.defaultProps = {typeButton: "primary", sizeButton: "large"}