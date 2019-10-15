import styled, { css } from "styled-components";
import { ToastProps, NotificationType } from './ToastTypes';

export const ToastContainer = styled.div`
    position: fixed;
    margin: auto;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, -50%);

`;

export const ToastStyle = styled.div<ToastProps>`
    width: 400px;
    height: 40px;
    margin: auto;
    border: none;
    padding: 8px 16px;
    margin: 10px 0;
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 9999;
    transition: all 2s ease-in-out;
    ${props => (props.toast.size == "flexible") && css`
        width: auto;
    `}

    ${props => (props.toast.notificationType == "error") && css`
        background-color: ${props => props.theme.colors["red"]};
    `}

    ${props => (props.toast.notificationType == "success") && css`
        background-color: ${props => props.theme.colors["green"]};
    `}

    ${props => (props.toast.notificationType == "information") && css`
        background-color: ${props => props.theme.colors["blue"]};
    `}
    ${props => (props.toast.notificationType == "warning") && css`
        background-color: ${props => props.theme.colors["yellow"]};
    `}
    ${props => (props.toast.notificationType == "other") && css`
        background-color: ${props => props.theme.colors["gray-2"]};
    `}

`
    
export const IconStyle = styled.div`
    color: ${props => props.theme.colors};
    float: left;
    margin-right: 8px;
`;

export const ToastCloseButtonStyle = styled.button<{notificationType: NotificationType} & React.HTMLAttributes<HTMLButtonElement>>`
  float: right;
  border: none;
  color: ${props => (props.notificationType == "warning" ? props.theme.colors["black"] : props.theme.colors["white"] )};
  background: inherit;
  `;