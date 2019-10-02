import styled, { css, keyframes } from "styled-components";
import { ProgressBarProps } from './ProgressBarType';

const move = keyframes`
   from { width: 0px; }
   to { width: 100%; }
`;

export const ProgressBarContainerStyle = styled.div<ProgressBarProps>`
    display: flex;
    width: 100%;
    height: 8px;
    background-color: ${props => props.theme.colors["gray-9"]};
    border-radius: 4px;
    ${props => (props.size == "small") && css`
    height: 4px;
  `}

`;

export const ProgressBarStyle = styled.div<ProgressBarProps>`
    display: flex;
    width: auto;
    background-color: ${props => props.theme.colors[props.color]};
    height: 8px;
    border-radius: 4px;
    animation: ${move} 5s linear infinite;
    ${props => (props.size == "small") && css`
    height: 4px;
  `}

`;