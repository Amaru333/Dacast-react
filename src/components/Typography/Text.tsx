import * as React from "react";
import { TextProps } from './TextTypes';
import { SpanStyle } from './TextStyle';

export class Text extends React.Component<TextProps> {

    constructor(props: TextProps) {
        super(props);
    }

    render() {

        var { size, weight, ...other } = this.props;

        return (
            <SpanStyle size={size} weight={weight} {...other} > {this.props.children}  </SpanStyle>
        );
    }
    static defaultProps = { color: "gray-1" };
}