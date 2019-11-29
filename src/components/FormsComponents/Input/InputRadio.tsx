import * as React from "react";
import { RadioProps } from './InputTypes';
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
                defaultChecked={props.defaultChecked}
                name={name}
                id={props.label} 
                value={props.value}
                disabled={props.disabled} 
                type="radio" 
                onFocus={() => setFocus(true)} 
                onBlur={() => setFocus(false) } 
                onClick={() => setChecked(!checked)}
                ref={radioButtonRef}
            />
            <RadioLabelStyle htmlFor={props.label} >
                {label ? <RadioTextStyle 
                    color={props.disabled ? "gray-4" : "gray-1"} 
                    size={14} weight="reg"                   
                > 
                    {label} 
                </RadioTextStyle> 
                    : null} 
            </RadioLabelStyle>
        </RelativeContainer>
        
    )

}   