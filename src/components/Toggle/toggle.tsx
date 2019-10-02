import * as React from "react";
import { ToggleLabelStyle, ToggleWrapperStyle, ToggleStyle, LabelTextStyle} from "./ToggleStyle"
import { ToggleProps } from './ToggleType';

export const Toggle: React.FC<ToggleProps> = (props) => {

    return (
        <ToggleWrapperStyle {...props}>
            <ToggleStyle id={props.label} type="checkbox" />
            <ToggleLabelStyle htmlFor={props.label}>
                <LabelTextStyle color="gray-1" size={16} weight="med">{props.label}</LabelTextStyle>
            </ToggleLabelStyle>
        </ToggleWrapperStyle> 
            );

}

  
