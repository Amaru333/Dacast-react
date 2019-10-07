import styled, { css } from "styled-components";
import {TabProps} from './TabTypes';


export const TabContainer = styled.div<{}>`
    display: flex;
`;
export const TabHeaderContainer = styled.div<TabProps>`
    display: flex;
    flex-direction: row;
    ${props => props.orientation == "vertical" && css`
        flex-direction: column;
    `}
    border: 1px solid ${props => props.theme.colors["gray-7"]};
`;


export const TabStyle = styled.div<{selected: boolean, orientation: string}>`
    display: flex;
    flex-flow: column;
    height: 40px;
    min-width: 84px;
    ${props => props.selected && css`
        background-color: ${props => props.theme.colors["violet20"]};
        color: ${props => props.theme.colors["dark-violet"]};
    `}
    ${props => props.selected && props.orientation == "vertical" && css`
        border-left: 4px solid ${props => props.theme.colors["dark-violet"]};
    `}
    &:hover {
        cursor: pointer;
    }
`;

export const TabBody = styled.div<{}>`
    display: flex;
`;

export const TabContentStyle = styled.div<{isDisplayed: boolean}>`
    display: none;
    ${props => props.isDisplayed && css`
        display: flex;   
    `}
`;