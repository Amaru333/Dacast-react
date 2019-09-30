import * as React from "react";
import { ToggleLabelStyle, ToggleWrapperStyle, ToggleStyle, LabelTextStyle} from "./ToggleStyle"
import { ToggleProps } from './ToggleType';


export class Toggle extends React.Component<ToggleProps> {
    constructor(props: ToggleProps) {
        super(props);
    }

    render() {
        

        return (
           <ToggleWrapperStyle {...this.props}>
               <ToggleStyle id={this.props.label} type="checkbox" />
                <ToggleLabelStyle htmlFor={this.props.label}>
                    <LabelTextStyle size={16} weight="med">{this.props.label}</LabelTextStyle>
                </ToggleLabelStyle>
           </ToggleWrapperStyle> 
        );
    }

   

}



  
