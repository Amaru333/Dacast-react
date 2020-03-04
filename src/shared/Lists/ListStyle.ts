import styled from 'styled-components';

export const IconGreyContainer = styled.div<{}>`
    position: relative;
    z-index: 1;
    color :  ${props => props.theme.colors["gray-3"]} ;
    display: inline-flex;
    height: 28px;
    width: 28px;
    align-items: center;
    &:before {
        content: '';
        display: inline-block;
        width: 28px;
        z-index: -1;
        height: 28px;
        position: absolute;
        border-radius: 50%;
        background-color: ${props => props.theme.colors["gray-8"]} ;
    }
`