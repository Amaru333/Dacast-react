import * as React from "react";
import { Text } from '../../Typography/Text';
import { InputCheckboxProps } from './InputTypes';
import { ContainerStyle, InputCheckboxStyle, LabelStyle, CheckBoxStyle } from './InputStyle';


export const InputCheckbox = (props: InputCheckboxProps) => {

    let checkboxRef = React.useRef<HTMLInputElement>(null);
    const [focus, setFocus] = React.useState<boolean>(false)
    const [checked, setChecked] = React.useState<boolean>(false)
    React.useEffect(() => {}, [focus, checked]);

    let { label, className, ...other } = props;

    return (
        <ContainerStyle className={className} >
            <InputCheckboxStyle checked={props.defaultChecked}  onFocus={() => setFocus(true)} onBlur={() => setFocus(false) }  {...other} type="checkbox" onClick={() => setChecked(!checked)} ref={checkboxRef} />
            <LabelStyle disabled={props.disabled} htmlFor={props.id}>
                <CheckBoxStyle indeterminate={props.indeterminate}  isFocus={focus} disabled={props.disabled} defaultChecked={props.defaultChecked} checkbox={checkboxRef} ></CheckBoxStyle>
                {label ? <Text color={props.disabled ? "gray-4" : "gray-1"} size={14} weight={props.labelWeight} > {props.label} </Text> : null} 
            </LabelStyle>
        </ContainerStyle>
    )
}

InputCheckbox.defaultProps = { disabled: false, indeterminate: false, labelWeight: "reg" }

