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
  
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid ${props => props.color};
  width: 120px;
  height: 120px;

  animation: ${spin} 2s linear infinite;
  ${props => (props.size == "small") && css`
    height: 60px;
    width: 60px;
    border: 8px solid #f3f3f3;
    border-top: 8px solid ${props.color};
  `}
  ${props => (props.size == "medium") && css`
    height: 90px;
    width: 90px;
    border: 12px solid #f3f3f3;
    border-top: 12px solid ${props.color};
  `}
`;