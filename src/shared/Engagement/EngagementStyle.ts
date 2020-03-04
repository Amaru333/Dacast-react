import styled, { css } from 'styled-components';

export const TextStyle = styled.span<{}>`
    display: block;
    margin-right: 12px;
`

export const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
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