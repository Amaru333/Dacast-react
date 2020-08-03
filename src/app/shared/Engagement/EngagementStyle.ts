import styled, { css } from 'styled-components';

export const TextStyle = styled.span<{}>`
    display: block;
    margin-right: 12px;
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

export const AdTableURLContainer = styled.div`
    max-width: 400px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`