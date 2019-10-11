import * as React from "react";
import { Text } from '../../Typography/Text';
import Icon from '@material-ui/core/Icon';
import { InputProps } from './InputTypes';
import { ContainerStyle, LabelStyle, RelativeContainer, InputStyle, HelpStyle, IconStyle } from './InputStyle';

export const Input = (props: InputProps) => {

    var { label, name, icon, help, isError, className, ...other } = props;

    return (
        <ContainerStyle className={className} >
            {label ? <LabelStyle disabled={props.disabled} > <Text color={props.disabled ? "gray-4" : "gray-1" } size={14} weight="med" > {props.label} </Text> </LabelStyle> : null}
            <RelativeContainer>
                <InputStyle isError={isError} {...other} />
                {icon ? <IconStyle><Icon>{icon}</Icon></IconStyle> : null}
            </RelativeContainer>
            {help ? <HelpStyle>
                <Text color={props.isError ? "red" : props.disabled ? "gray-4" : "gray-3"} size={12} weight="reg"> {help} </Text>
            </HelpStyle> : null}
        </ContainerStyle>
    );

}

Input.defaultProps = { isError: false, disabled: false }
