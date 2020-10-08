import styled, { css } from 'styled-components';

export const ContainerHalfSelector = styled.div<{}>`
background-color: white;
border: 1px solid ${props => props.theme.colors["gray-7"]};;
height: 550px; 
overflow-x: auto;
`

export const HeaderBorder = styled.div<{}>`
height:52px;
border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
box-sizing: border-box;
`

export const TabSetupStyle = styled.div<{ selected: boolean }>`
width:50%;
box-sizing: border-box;
float:left;
text-align:center;
height: 38px;
padding: 7px 0;
${props => props.selected && css`
    background-color: ${props.theme.colors["violet20"]} !important;
    color: ${props.theme.colors["dark-violet"]};
`}
`
export const TabSetupStyles = styled.div<{ selected: boolean }>`
box-sizing: border-box;
margin-bottom: 16px;
float:left;
text-align:center;
height: 38px;
padding: 7px 0;
${props => props.selected && css`
    background-color: ${props.theme.colors["violet20"]} !important;
    color: ${props.theme.colors["dark-violet"]};
`}
`
export const TabSetupContainer = styled.div<{}>`
border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
`

export const ItemSetupRow = styled.div<{ selected: boolean }>`
border-top: 1px solid ${props => props.theme.colors['gray-7']};
height: 64px;
${props => props.selected && css`
    background-color: ${props.theme.colors['violet10']};
`}
&:last-child {
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
}
&:hover {
    .iconAction {
        visibility: visible;
    }
    background-color: ${props => props.theme.colors['violet10']};
}
`