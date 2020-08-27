import * as React from "react";
import { Text } from '../../Typography/Text';
import Icon from '@material-ui/core/Icon';
import { InputProps } from './InputTypes';
import { ContainerStyle, LabelStyle, RelativeContainer, InputStyle, HelpStyle, IndicationLabelStyle, AddonStyle, TextAreaStyle } from './InputStyle';
import { Tooltip } from '../../Tooltip/Tooltip';
import { IconStyle } from '../../../shared/Common/Icon';
import { replaceAt } from '../../../utils/utils';

export const Input = React.forwardRef((props: InputProps, ref?: React.RefObject<HTMLInputElement>) => {

    var { inputPrefix, suffix, label, indicationLabel, icon, help, isError, className, tooltip, ...other } = props;


    const handleOnBlurEvent= (event) => {
        if(event.target.value.length < 8 && event.target.value.length > 0) {
            var completePart = '00:00:00';
            var returnValue =  event.target.value + completePart.slice(event.target.value.length);
            props.onChange(returnValue)    
        }
    }

    const handleValueInput = (event) => {
        
        if(event.target.value.length < 8) {
            var returnValue =  event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1:').trim();
        } else {
            var returnValue = event.target.value;
        }
        if( parseInt(event.target.value.charAt(3)) > 5 ) {
            returnValue = replaceAt(returnValue, 3, event.target.value.length > 4 ? '0' : '');   
        }
        if( parseInt(event.target.value.charAt(6)) > 5 ) {
            returnValue =  replaceAt(returnValue, 6, event.target.value.length > 7 ? '0' : '');
        }
        props.onChange(returnValue)    
    }

    return (
        <ContainerStyle hidden={props.hidden} className={className} >
            {
                label ?
                    <LabelStyle tooltip={props.tooltip} disabled={props.disabled ? true : false} >
                        <Text color={props.disabled ? "gray-4" : "gray-1"} size={14} weight="med" >
                            {props.label}
                        </Text>
                        {
                            tooltip ?
                                <div>
                                    <IconStyle fontSize="small" id={tooltip}>info_outlined</IconStyle>
                                    <Tooltip target={tooltip}>{tooltip}</Tooltip>
                                </div> : null

                        }
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
            <RelativeContainer >
                {inputPrefix ?
                    <AddonStyle suffix={false}>
                        {inputPrefix}
                    </AddonStyle>
                    :
                    null}
                {
                    props.type === 'textarea' ?
                        <TextAreaStyle isError={isError} {...other} /> :
                        props.type === 'video-time' ?
                            <InputStyle ref={ref} isError={isError} {...other} maxLength={8} onBlur={(event) => handleOnBlurEvent(event)} onChange={(event) => handleValueInput(event)} /> :
                            <InputStyle ref={ref} isError={isError} {...other} />
                }


                {suffix ?
                    <AddonStyle suffix={true}>
                        {suffix}
                    </AddonStyle>
                    :
                    null}
            </RelativeContainer>


            {icon ? <IconStyle disabled={props.disabled ? true : false}><Icon>{icon}</Icon></IconStyle> : null}
            {help ? <HelpStyle>
                <Text color={props.isError ? "red" : props.disabled ? "gray-4" : "gray-3"} size={12} weight="reg"> {help} </Text>
            </HelpStyle> : null}
        </ContainerStyle>
    );

})

Input.defaultProps = { isError: false, disabled: false, required: false }
Input.displayName = 'Input';
