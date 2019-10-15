import styled, { css } from 'styled-components';
import { ModalProps, ModalCardProps } from './ModalTypes';
import { ColorsApp } from '../../styled/types';

export const IconStyle = styled.div<{ iconColor: ColorsApp }>`
    color: ${props => props.theme.colors[props.iconColor]};
    float: left;
    margin-top: 4px;
    margin-right: 8px;
`;

export const OverlayStyle = styled.div<{ opened: boolean }>`
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
`;


export const ModalContainerStyle = styled.div<ModalProps>`
    box-sizing: border-box;
    padding: 24px;
    width: ${props => (props.size === "small" ? "400px" : "600px")};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
    display: ${props => (props.opened ? "block" : "none")};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors["white"]};
    z-index: 9999;
`;
export const ModalTitleStyle = styled.div`
    margin-bottom: 16px;
    align-items: center;
    display: flex;
`;
export const ModalCloseButtonStyle = styled.button`
    float: right;
    border: none;
    margin-left: auto;
    cursor: pointer;
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
    width: ${props => (props.size === "small" ? "400px" : "600px")};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
    position:relative;
    background-color: ${props => props.theme.colors["white"]};
    z-index: 9999;
`;