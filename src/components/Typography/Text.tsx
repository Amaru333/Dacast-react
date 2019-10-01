import * as React from "react";
import { TextProps } from './TextTypes';
import { SpanStyle } from './TextStyle';

export const Text: React.FC<TextProps> = props => {

    var { size, weight, ...other } = props;

    return (
        <SpanStyle size={size} weight={weight} {...other} > {props.children}  </SpanStyle>
    );
}

Text.defaultProps = { color: "gray-1" };