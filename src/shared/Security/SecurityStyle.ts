import styled, { css } from 'styled-components';
import { Card } from '../../components/Card/Card';
import { Icon } from '@material-ui/core';

export const TextStyle = styled.span<{}>`
    display: block;
    margin-right: 12px;
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

export const DisabledSection = styled.div<{settingsEditable: boolean}>`
pointer-events: none;
opacity: 0.5;
    ${props => props.settingsEditable && css`
        pointer-events: auto;
        opacity: 1;
    `}
`

export const Header = styled.div`
display: flex;
align-items: center;
`

export const UnlockSettingsIcon = styled(Icon)`
cursor: pointer;
`