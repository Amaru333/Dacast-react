import styled, { css } from "styled-components";
import { InputProps } from './InputTypes';

export const ContainerStyle = styled.div<InputProps>`
    display: flex;
    flex-direction: column;
    height:auto;
`;

export const HelpStyle = styled.div<InputProps>`
    margin-top: 8px;
`;

export const RelativeContainer = styled(ContainerStyle)`
    position: relative;
`;

export const IconStyle = styled.div<InputProps>`
    position: absolute;
    right: 12px;
    top: 8px;    
    color: ${props => props.disabled ? props.theme.colors["gray-6"] : props.theme.colors["gray-3"]};
`;

export const LabelStyle = styled.label<InputProps>`
    display: flex;
    height:auto;
    margin-bottom: 4px;
`;

export const InputStyle = styled.input<InputProps>`
    display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    padding: 8px 12px;
    height:40px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: ${props => props.theme.colors["gray-1"]};
    ${props => props.isError && css`
        border-bottom: 2px solid ${props => props.theme.colors["red"]};
        background: ${props => props.theme.colors["red10"]};
    `}
    ${props => props.disabled && css`
        background: ${props => props.theme.colors["gray-8"]};
    `}
    ::placeholder{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: ${props => props.theme.colors["gray-5"]};
        ${props => props.disabled && css`
            color: ${props => props.theme.colors["gray-6"]} ;
        `}
    }
    &:focus {
        border: 1px solid ${props => props.theme.colors["violet"]} ;
        ${props => props.isError && css`
            border-bottom: 2px solid ${props => props.theme.colors["red"]};
        `}
    }
`;