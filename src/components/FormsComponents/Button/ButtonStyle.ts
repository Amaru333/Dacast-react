import styled, { css } from "styled-components";
import { ButtonProps } from './ButtonTypes';

export const ButtonStyle = styled.button<ButtonProps>`
  
  width: auto;
  height: 40px;
  padding: 8px 16px;
  border-radius: 4px;
  border: ${props => (props.typeButton == "secondary") ? `1px solid ${props.theme.colors.violet}` : "none"};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  background: ${props => (props.typeButton == "primary") ?  props.theme.colors.violet : props.theme.colors.white};
  color: ${props => (props.typeButton == "primary") ? props.theme.colors.white : props.theme.colors["dark-violet"] };

  ${props => (props.sizeButton == "small") && css`
    height: 32px;
    padding: 8px 12px;
    font-size: 12px
  `}

  &:hover {
   background: ${props => (props.typeButton == "tertiary") ? props.theme.colors.white : props.theme.colors.violet40 };
   cursor: pointer;   
  };

  &:focus {
    background: ${props => (props.typeButton == "tertiary") ? props.theme.colors.white : props.theme.colors.violet60 };
  };

  &:disabled {
    background: ${props => props.theme.colors.violet60};
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;

    ${props => (props.typeButton == "secondary") && css`
        background: ${props => props.theme.colors.white};
        color: ${props => props.theme.colors["dark-violet"]};
        opacity: 0.5;
    `}


    ${props => (props.typeButton == "tertiary") && css`
        background: white;
        color: ${props => props.theme.colors["gray-5"]};
    `};
    }
`;