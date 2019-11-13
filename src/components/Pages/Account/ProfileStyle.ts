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

export const ToggleTextInfo = styled.p<{}>`
    margin-top: 0px;
    display: inline-flex;
`
