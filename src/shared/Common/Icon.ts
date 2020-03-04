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
    display:block;
    .material-icons{
        margin-right:16px;
    }
`