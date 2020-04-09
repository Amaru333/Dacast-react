import styled from "styled-components";
import { LabelProps } from './LabelTypes';

export const LabelStyleContainer = styled.div<LabelProps>`
    background-color: ${props => props.theme.colors[props.backgroundColor]};
    border-radius: 4px;
    display: inline-block;
    padding: 2px 8px;
    text-align: center;
`;