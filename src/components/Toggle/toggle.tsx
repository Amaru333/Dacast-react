import * as React from "react";
import { ToggleLabelStyle, ToggleWrapperStyle, ToggleStyle, LabelTextStyle} from "./ToggleStyle"
import { ToggleProps } from './ToggleTypes';

export const Toggle = (props: ToggleProps) => {

    var { name, refForwarded, ...other } = props;

    return (
        <ToggleWrapperStyle {...other}>
            <ToggleStyle checked={props.checked} name={name} ref={refForwarded} onChange={(value) => {props.callback ? props.callback(value.target.checked) : null}  } id={props.label} defaultChecked={props.defaultChecked} type="checkbox"/>
            <ToggleLabelStyle htmlFor={props.label}>
                <LabelTextStyle color="gray-1" size={16} weight="med">{props.label}</LabelTextStyle>
            </ToggleLabelStyle>
        </ToggleWrapperStyle> 
    );

}

  
