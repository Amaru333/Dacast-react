import * as React from "react";
import { ButtonProps, buttonArrayColor } from './ButtonTypes';
import { ButtonStyle } from './ButtonStyle';
import { LoadingSpinner } from '../Progress/LoadingSpinner/LoadingSpinner';


export const Button = (props: ButtonProps) => {
    const { disabled, ...other } = props;

    return <ButtonStyle colorObject={buttonArrayColor[props.buttonColor!]} {...other} disabled= {disabled || props.isLoading ? true : false } >{props.children}{ props.isLoading && <LoadingSpinner className="ml1" color={props.typeButton === "primary" ? 'white' : 'violet'} size={props.sizeButton === "xs" ? 'xxs' : "xs"} />}</ButtonStyle>;

}

Button.defaultProps = {typeButton: "primary", sizeButton: "large", buttonColor: "blue"}