import styled from 'styled-components';

export const TextStyle = styled.span<{}>`
    display: block;
`

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

export const AvatarInputContainer = styled.div<{}>`
    display: flex;
    flex-direction: row;
`

export const ToggleTextInfo = styled.div<{}>`
    display: inline-flex;
    padding-left: 4px;
`

export const ToggleContainer = styled.div`
    padding-left: 8px;
`
