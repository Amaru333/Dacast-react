import * as React from "react";
import { InputProps } from './InputTypes';
import { Text } from '../../Typography/Text';
import { LabelStyle, InputRadioStyle, ContainerStyle, RadioStyle } from './InputStyle';

export const InputRadio = (props: InputProps) => {

    let {label, ...other} = props

    return (

        <ContainerStyle {...props}>
            <InputRadioStyle type="radio"/>
            <LabelStyle>
                <RadioStyle></RadioStyle>
                {label ? <Text color={props.disabled ? "gray-4" : "gray-1"} size={14} weight="med" > {props.label} </Text> : null} 
            </LabelStyle>
        </ContainerStyle>
        
    )

}