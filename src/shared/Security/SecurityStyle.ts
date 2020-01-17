import styled, { css } from 'styled-components';
import { Card } from '../../components/Card/Card';

export const TextStyle = styled.span<{}>`
    display: block;
    `

export const ToggleTextInfo = styled.p<{}>`
    margin-top: 0px;
    margin-block-end: 8px;
    display: inline-flex;
`

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`
export const DisabledCard = styled(Card)<{settingsEditable: boolean}>`
pointer-events: none;
opacity: 0.5;
    ${props => props.settingsEditable && css`
        pointer-events: auto;
        opacity: 1;
    `}
`