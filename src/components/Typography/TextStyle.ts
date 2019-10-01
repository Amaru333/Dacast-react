import { TextProps } from "./TextTypes";
import styled from 'styled-components';

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
        case 16 :
            return 24;
        case 14 :
            return 24;
        case 12:
            return 18;
        case 10:
            return 16;
        default:
            return 16;
    }
}

export const SpanStyle = styled.span<TextProps>`
    font-size: ${props => props.size}px;
    color: ${props => props.theme.colors[props.color]};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: ${props => props.weight === "med" ? 500 : 'normal'};
    line-height: ${props => returnLineHeight(props.size)}px;
`;