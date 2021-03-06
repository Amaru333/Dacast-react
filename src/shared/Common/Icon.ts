import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import { ColorsApp } from '../../styled/types';

export const IconStyle = styled(Icon)<{coloricon?: ColorsApp; disabled?: boolean; customsize?: number}>`
    color: ${props => props.coloricon ? props.theme.colors[props.coloricon] : props.theme.colors['gray-1']};
    ${props => props.disabled && css`
        cursor: not-allowed;
    `}
    ${props => props.customsize && css `
        font-size: ${props.customsize}px !important;
    `}
    
`

export const IconContainer = styled.div`
    float:right;
    width: max-content;
    display:block;
    .material-icons{
        margin-right:16px;
    }
`
export const IconGreyActionsContainer = styled.div<{isFocus?: boolean}>`
    justify-content: center;
    position: relative;
    z-index: 1;
    color :  ${props => props.theme.colors["gray-3"]} ;
    display: inline-flex;
    height: 40px;
    width: 40px;
    align-items: center;
    ${props => props.isFocus && css`
        &:before {
            content: '';
            display: inline-block;
            width: 40px;
            z-index: -1;
            height: 40px;
            position: absolute;
            border-radius: 50%;
            background-color: ${props => props.theme.colors["gray-8"]} ;
        }
    `}
    &:hover {
        &:before {
            content: '';
            display: inline-block;
            width: 40px;
            z-index: -1;
            height: 40px;
            position: absolute;
            border-radius: 50%;
            background-color: ${props => props.theme.colors["gray-10"]} ;
        }
    }
    
`
export const IconGreyContainer = styled.div<{}>`
    justify-content: center;
    position: relative;
    z-index: 1;
    color :  ${props => props.theme.colors["gray-3"]} ;
    display: inline-flex;
    height: 28px;
    width: 28px;
    align-items: center;
    &:before {
        content: '';
        display: inline-block;
        width: 28px;
        z-index: -1;
        height: 28px;
        position: absolute;
        border-radius: 50%;
        background-color: ${props => props.theme.colors["gray-8"]} ;
    }
`

export const ActionIcon = styled.div`
position: relative;
z-index: 1;
color :  ${props => props.theme.colors["gray-3"]} ;
display: inline-flex;
height: 24px;
width: 24px;
top: 2px;
margin-right: 16px;
align-items: center;
&:before {
    content: '';
    left: -8px;
    display: inline-block;
    width: 40px;
    z-index: -1;
    height: 40px;
    position: absolute;
    border-radius: 50%;
    background-color: inherit;
}
&:hover {
    &:before {
        background-color: ${props => props.theme.colors["gray-10"]} ;
    }
}
`