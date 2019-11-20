import styled from 'styled-components';

export const CardStyle = styled.div`
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.theme.colors["white"]};
    display: inline-block;
`