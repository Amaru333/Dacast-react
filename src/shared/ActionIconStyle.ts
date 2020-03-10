import styled from "styled-components";

export const ActionIcon = styled.div`
position: relative;
z-index: 1;
color :  ${props => props.theme.colors["gray-3"]} ;
display: inline-flex;
height: 24px;
width: 24px;
top: 2px;
margin-right: 16px;
align-items: center;
&:before {
    content: '';
    left: -8px;
    display: inline-block;
    width: 40px;
    z-index: -1;
    height: 40px;
    position: absolute;
    border-radius: 50%;
    background-color: inherit;
}
&:hover {
    &:before {
        background-color: ${props => props.theme.colors["gray-10"]} ;
    }
}
`