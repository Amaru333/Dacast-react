import styled, {css} from 'styled-components';
import { ColorsApp } from '../../app/styled/types';

export const CardStyle = styled.div<{isMobile: boolean; backgroundColor: ColorsApp}>`
    box-sizing: border-box;
    padding: 24px;
    ${props => props.isMobile && css`
        padding: 16px !important;
    `};
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.theme.colors[props.backgroundColor]};
    display: flex;
    flex-direction: column;
`