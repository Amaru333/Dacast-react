import * as React from "react";
import { ButtonProps } from './ButtonTypes';
import { ButtonStyle } from './ButtonStyle';


export class Button extends React.Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return <ButtonStyle {...this.props}>{this.props.children}</ButtonStyle>;
    }

    static defaultProps = {typeButton: "primary", sizeButton: "large"}

}