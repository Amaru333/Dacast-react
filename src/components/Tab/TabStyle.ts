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
        width: 173px;
        margin-right: 24px;
    `}
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.theme.colors["white"]};
`;


export const TabStyle = styled.div<{selected: boolean; orientation: string}>`
    display: flex;
    flex-flow: column;
    height: 40px;
    justify-content: center;
    align-items: center;
    min-width: 84px;
    ${props => props.selected && css`
        background-color: ${props => props.theme.colors["violet20"]} !important;
        color: ${props => props.theme.colors["dark-violet"]};
    `}
    ${props => props.selected && props.orientation == "vertical" && css`
        border-left: 4px solid ${props => props.theme.colors["dark-violet"]};
    `}
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors["gray-10"]};
        span {
            font-weight: 500 !important;
        }
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