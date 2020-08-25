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

export const LoadingSpinnerStyle = styled.div<LoadingSpinnerProps>`
/*   
    text-align: center;
    align-items: flex-start;
    cursor: default;
    box-sizing: border-box;
    font: 400 11px system-ui;
    padding: 1px 7px 2px; */
    display: inline-block;


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
  
  ${props => (props.center) && css`
    margin-left: auto;
    margin-right: auto;
    margin-top: 20%;
  `}  

  ${props => (props.size == "small") && css`
    border-width: 3px;
    width: 32px;
    height: 32px;
  `}
  ${props => (props.size == "xs") && css`
    border-width: 3px;
    width: 24px;
    height: 24px;
  `}
  ${props => (props.size == "xxs") && css`
    border-width: 3px;
    width: 20px;
    height: 20px;
  `}
  
  &:before, &:after {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${props => props.theme.colors[props.color]};
    position: absolute;
    ${props => (props.size == "medium") && css`
        width: 5px;
        height: 5px;
    `}
    ${props => (props.size == "small") && css`
        width: 3px;
        height: 3px;
    `}
    ${props => (props.size == "xs" || props.size == "xxs" || props.size == "small" ) && css`
        display:none;
    `}
  }
  &:before {
    top: 5px;
    left: 4px;
    ${props => (props.size == "medium") && css`
        top: 2.5px;
        left: 3px;
    `}
  ${props => (props.size == "small") && css`
    left: 2px;
    top: 21.8px;
  `}
  } 
  &:after {
    bottom: 4px;
    left: 60px;
    ${props => (props.size == "medium") && css`
    bottom: 3.5px;
        left: 40.9px;
    `}
    ${props => (props.size == "small") && css`
            bottom: 3.5px;
        left: 27px;
    `}
  ${props => (props.size == "xs" || props.size == "xxs") && css`
    display:none;
  `}
  }
`

//Used in container pages to get spinner in centre of page
export const SpinnerContainer  = styled.div`
left: 50%;
bottom: 50%;
position: absolute
`