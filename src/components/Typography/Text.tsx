import * as React from "react";
import { TextProps } from './TextTypes';
import { SpanStyle } from './TextStyle';

export const Text = (props: TextProps) => {

    var { size, weight, lineHeight, ...other } = props;

    return (
        <SpanStyle lineHeight={lineHeight} size={size} weight={weight} {...other} > {props.children}  </SpanStyle>
    );
}

Text.defaultProps = { color: "gray-1", weight: 'reg', size: 14 };