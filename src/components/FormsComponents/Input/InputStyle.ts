import styled, { css } from "styled-components";
import { InputProps, InputCheckboxProps, RadioProps } from './InputTypes';
import { Text } from "../../Typography/Text"

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
    align-items: center;
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

export const InputCheckboxStyle = styled.input<InputCheckboxProps>`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

export const CheckBoxStyle = styled.div<{defaultChecked: boolean | undefined, disabled: boolean | undefined, isFocus: boolean, indeterminate: boolean | undefined, checkbox : React.RefObject<HTMLInputElement>}>`
    display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background-color: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    border-radius: 2px;
    height:16px;
    width: 16px;
    cursor: pointer;
    margin-right: 8px;
    ${props => ((!props.checkbox.current && props.defaultChecked) || (props.checkbox.current && props.checkbox.current.checked))  && css`
        &:after{
            font-family: Material Icons;
            content: "check";
            color: ${props => props.theme.colors["white"]};
        }
        border: none;
        background: ${props => props.theme.colors["violet"]};
    `}
    ${props => (props.indeterminate) && css`
        &:after{
            font-family: Material Icons;
            content: "remove";
            color: ${props => props.theme.colors["white"]};
        }
        border: none;
        background: ${props => props.theme.colors["violet"]};
    `}
    ${props => ((props.disabled) || (props.checkbox.current && props.checkbox.current.disabled)) && css`
        opacity: 0.5;
        cursor: auto;
    `}
    ${props => props.isFocus && css`
        outline: rgb(59, 153, 252) auto 5px;
    `}
`




export const RadioLabelStyle = styled.label<{isFocus: boolean}>`

    display: flex;
    align-items: center;
    position: fixed;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background-color: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    border-radius: 50%;
    height:16px;
    width: 16px;
    margin-right: 8px;
    
    ${props => props.isFocus && css`
        box-shadow: 0 0 0 3px ${props => props.theme.colors["blue60"]} ;
    `}
`

export const InputRadioStyle = styled.input<{checked: boolean | undefined, disabled: boolean | undefined}>`
    opacity: 0;
    z-index: 1;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    cursor: pointer;

    ${props => (props.disabled) && css `
        cursor: auto;
    `}
    & + ${RadioLabelStyle} {
        ${props => (props.disabled) && css `
            opacity: 0.5;
        `}
    }
    &:checked + ${RadioLabelStyle} {
        border: 1px solid ${props => props.theme.colors["violet"]} ;
        ${props => (props.disabled) && css `
                opacity: 0.5;
        `}       
        &::after {
            content: "";
            display: block;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            margin-left: 3px;
            background: ${props => props.theme.colors['violet']};
        }   
    } 
`;

export const RadioTextStyle = styled(Text)`
position: fixed;
display: block;
margin-left: 24px;
`