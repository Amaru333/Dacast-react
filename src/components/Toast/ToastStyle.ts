import styled, { css } from "styled-components";
import { ToastProps, NotificationType } from './ToastTypes';

// Weird color bug still not fixed - need to overwrite global transition

export const ToastContainer = styled.div<ToastProps>`
    position: fixed;
    margin: auto;
    top: 56px;
    left: 0;
    z-index:9999;
    right: 0;
    padding: 15px 16px 16px;
    display: flex;
    flex-direction: column;
`;

export const ToastStyle = styled.div<ToastProps>`
    max-width: 500px;
    min-height: 40px;
    margin: auto;
    border: none;
    padding: 8px 16px;
    margin: 10px 0;
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 9999;
    align-self: ${props => ({left: 'flex-start', right: 'flex-end'}[props.toast.position] || 'center')};
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
    ${props => (props.toast.notificationType == "notification") && css`
        background-color: ${props => props.theme.colors["gray-1"]};
    `}
    ${props => (props.toast.notificationType == "other") && css`
        background-color: ${props => props.theme.colors["gray-2"]};
    `}
`

export const IconStyle = styled.div`
    color: ${props => props.theme.colors};
    float: left;
    margin-right: 8px;
    display: flex;
    align-items: center;
`;

export const ToastCloseButtonStyle = styled.div<{notificationType: NotificationType} & React.HTMLAttributes<HTMLDivElement>>`
  float: right;
  border: none;
  margin-left: 12px;
  display: flex;
  align-items: center;
  color: ${props => (props.notificationType == "warning" ? props.theme.colors["black"] : props.theme.colors["white"] )};
  background: inherit;

    &:hover {
        cursor: pointer;
    }
  `;

  export const ToastLink = styled.span`
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.colors['blue-2']};
    }
`