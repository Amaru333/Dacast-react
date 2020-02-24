import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { ColorsApp } from '../../../styled/types';

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

export const IconStyle = styled(Icon)<{coloricon: ColorsApp}>`
    color: ${props => props.theme.colors[props.coloricon]};
`