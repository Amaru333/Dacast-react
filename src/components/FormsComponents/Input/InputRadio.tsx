import * as React from "react";
import { RadioProps } from './InputTypes';
import { Text } from '../../Typography/Text';
import { RadioLabelStyle, InputRadioStyle, RelativeContainer, RadioTextStyle } from './InputStyle';

export const InputRadio = (props: RadioProps) => {

    
    const [checked, setChecked] = React.useState<boolean>(false)
    const [focus, setFocus] = React.useState<boolean>(false)
    let radioButtonRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {}, [focus, checked]);

    let {label, name, ...other} = props

    return (

        <RelativeContainer {...other}>
            <InputRadioStyle 
                checked={props.checked} 
                name={name} 
                disabled={props.disabled} 
                type="radio" 
                onFocus={() => setFocus(true)} 
                onBlur={() => setFocus(false) } 
                onClick={() => setChecked(!checked)}
                ref={radioButtonRef}
            />
            <RadioLabelStyle isFocus={focus}>
                {label ? <RadioTextStyle 
                    color={props.disabled ? "gray-4" : "gray-1"} 
                    size={14} weight="med"                   
                > 
                    {label} 
                </RadioTextStyle> 
                    : null} 
            </RadioLabelStyle>
        </RelativeContainer>
        
    )

}   