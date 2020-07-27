import styled, { css, keyframes } from "styled-components";
import { ProgressBarProps } from './ProgressBarTypes';

const move = (endValue: number) =>  keyframes`
   from { width: 0px; }
   to { width: ${endValue}%; }
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
    background-color: ${props => props.theme.colors[props.color]};
    height: 8px;
    border-radius: 4px;
    width: ${props => props.static ? props.startingValue + '%' : 'auto'}
    ${props => !props.static && css`
      animation: ${move(props.startingValue)} 2s linear normal forwards;
    `}
    ${props => (props.size == "small") && css`
    height: 4px;
  `}

`;