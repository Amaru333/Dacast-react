import styled from 'styled-components';

export const TextStyle = styled.span<{}>`
    display: block;
`

export const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`