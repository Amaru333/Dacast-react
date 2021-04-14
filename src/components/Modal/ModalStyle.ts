import styled, { css } from 'styled-components';
import { ModalProps, ModalCardProps } from './ModalTypes';

export const OverlayStyle = styled.div<{ opened: boolean; index?: number }>`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.overlay70};
    ${props => props.opened && css`
        display: block;
    `}
    z-index: ${props => props.index ? props.index : 9998 };
`;


export const ModalContainerStyle = styled.div<ModalProps & {isMobile: boolean}>`
    box-sizing: border-box;
    padding: 24px;

    width: 600px;
    ${props => props.size === "small" && css`
        width: 400px;
    `};
    @media (max-width: 40em) {
        padding: 16px;
        width: 80%;
    }
 
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
    display: none;
    ${props => props.opened && css`
        display: block;
    `};
    position: fixed;
    left: 50%;
    top: 50vh;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors["white"]};
    z-index: 9999;
    max-height: 90%;
    overflow-x: auto;
`;
export const ModalTitleStyle = styled.div`
    margin-bottom: 8px;
    align-items: center;
    display: flex;
`;
export const ModalCloseButtonStyle = styled.button`
    float: right;
    border: none;
    margin-left: auto;
    cursor: pointer;
    background-color: ${props => props.theme.colors["white"]};
`;

export const ModalBodyStyle = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
    flex-wrap: wrap;
    & > * { 
        margin-bottom: 8px;
    }
`;

export const ModalFooterStyle = styled.div`
    & > * { 
        margin-right: 12px;
    }
`;

export const ModalCardContainerStyle = styled.div<ModalCardProps>`
    box-sizing: border-box;
    padding: 24px;
    width: 600px;
    ${props => props.size === "small" && css`
        width: 400px;
    `};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
    position:relative;
    background-color: ${props => props.theme.colors["white"]};
    z-index: 9999;
`;