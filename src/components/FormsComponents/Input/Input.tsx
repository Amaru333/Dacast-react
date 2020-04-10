import * as React from "react";
import { Text } from '../../Typography/Text';
import Icon from '@material-ui/core/Icon';
import { InputProps } from './InputTypes';
import { ContainerStyle, LabelStyle, RelativeContainer, InputStyle, HelpStyle, IndicationLabelStyle, AddonStyle } from './InputStyle';
import { Tooltip } from '../../Tooltip/Tooltip';
import { IconStyle } from '../../../shared/Common/Icon';

export const Input = React.forwardRef((props: InputProps, ref?: React.RefObject<HTMLInputElement>) => {

    var { inputPrefix, suffix, label, indicationLabel, icon, help, isError, className, tooltip, ...other } = props;

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
                <InputStyle ref={ref} isError={isError} {...other} />
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
