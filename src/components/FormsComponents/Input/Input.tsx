import * as React from "react";
import { Text } from '../../Typography/Text';
import Icon from '@material-ui/core/Icon';
import { InputProps } from './InputTypes';
import { ContainerStyle, LabelStyle, RelativeContainer, InputStyle, HelpStyle, IconStyle, IndicationLabelStyle } from './InputStyle';

export const Input = React.forwardRef((props: InputProps, ref?: React.RefObject<HTMLInputElement>) => {

    var { label, indicationLabel, icon, help, isError, className, ...other } = props;

    return (
        <ContainerStyle className={className} >
            {
                label ? 
                    <LabelStyle disabled={props.disabled} >
                        <Text color={props.disabled ? "gray-4" : "gray-1" } size={14} weight="med" >
                            {props.label} 
                        </Text>
                        {
                            indicationLabel ?
                                <IndicationLabelStyle>
                                    <Text color='gray-4' size={12} weight="reg" >
                                        {props.indicationLabel} 
                                    </Text>
                                </IndicationLabelStyle>
                                : 
                                null
                        }
                    </LabelStyle> 
                    : 
                    null
            }
            <RelativeContainer>
                <InputStyle ref={ref} isError={isError} {...other} />
                {icon ? <IconStyle disabled={props.disabled}><Icon>{icon}</Icon></IconStyle> : null}
            </RelativeContainer>
            {help ? <HelpStyle>
                <Text color={props.isError ? "red" : props.disabled ? "gray-4" : "gray-3"} size={12} weight="reg"> {help} </Text>
            </HelpStyle> : null}
        </ContainerStyle>
    );

})

Input.defaultProps = { isError: false, disabled: false, required: false }
Input.displayName = 'Input';
