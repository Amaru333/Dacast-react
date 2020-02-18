import styled, { css, keyframes } from "styled-components";
import { LoadingSpinnerProps } from './LoadingSpinnerTypes';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinnerStyle = styled.button<LoadingSpinnerProps>`
  
  border-style: solid;
  border-color: ${props => props.theme.colors[props.color]} ${props => props.theme.colors[props.color]} 
  ${props => props.theme.colors["gray-9"]} ${props => props.theme.colors["gray-9"]};
  border-radius: 50%;
  animation: ${spin} 1.5s infinite;
  position: relative;
  border-width: 7px;
  width: 72px;
  height: 72px;
  background-color: inherit

  ${props => (props.size == "medium") && css`
    border-width: 5px;
    width: 48px;
    height: 48px;
  `}
  ${props => (props.size == "small") && css`
    border-width: 3px;
    width: 32px;
    height: 32px;
  `}
  &:before, &:after {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${props => props.theme.colors[props.color]};
    position: absolute;
    ${props => (props.size == "medium") && css`
    width: 4.5px;
    height: 4.5px;
  `}
  ${props => (props.size == "small") && css`
    width: 3px;
    height: 3px;
  `}
  } 
  &:before {
    top: 2px;
    left: 3px;
    ${props => (props.size == "medium") && css`
    top: 1.5px;
    left: 1px;
  `}
  ${props => (props.size == "small") && css`
    top: 0.5px;
    left: 1.5px;
  `}
  } 
  &:after {
    bottom: 2px;
    left: 48px;
    ${props => (props.size == "medium") && css`
    left: 32px;
  `}
  ${props => (props.size == "small") && css`
    bottom: 1px;
    left: 21px;
  `}
  }
`

//Used in container pages to get spinner in centre of page
export const SpinnerContainer  = styled.div`
left: 50%;
bottom: 50%;
position: absolute
`