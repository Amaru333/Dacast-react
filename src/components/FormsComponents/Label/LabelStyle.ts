import styled, { css } from "styled-components";
import { LabelProps } from './LabelTypes';

export const LabelStyleContainer = styled.div<LabelProps>`
    background-color: ${props => props.theme.colors[props.backgroundColor]};
    border-radius: 4px;
    width: fit-content;
    padding: 0px 8px;
`;