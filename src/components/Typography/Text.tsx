import * as React from "react";
import styled from 'styled-components';
import { ColorsApp } from '../../styled/types';

type Size = 48 | 40 | 32 | 24 | 20 | 16 | 14 | 12 | 10;
type Weight = 'reg' | 'med';

export interface TextSpecificProps {
    size: Size,
    weight: Weight,
    color: ColorsApp
}

type TextProps = TextSpecificProps & React.HTMLAttributes<HTMLSpanElement>;

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

function returnLineHeight(size: number) {
    switch (size) {
        case 48:
            return 56;
        case 40:
            return 42;
        case 32:
            return 40;
        case 24:
            return 32;
        case 20:
            return 28;
        case 16 || 14:
            return 24;
        case 12:
            return 18;
        case 10:
            return 16;
        default:
            return 16;
    }
}

const SpanStyle = styled.span<TextProps>`
    font-size: ${props => props.size}px;
    color: ${props => props.theme.colors[props.color]};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: ${props => props.weight === "med" ? 500 : 'normal'};
    line-height: ${props => returnLineHeight(props.size)}px;
`;
