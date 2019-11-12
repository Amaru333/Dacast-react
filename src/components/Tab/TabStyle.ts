import styled, { css } from "styled-components";
import {TabProps} from './TabTypes';


export const TabContainer = styled.div<{mobile: boolean}>`
    display: flex;
    ${props => props.mobile && css`
        flex-direction: column;
    `}
`;
export const TabHeaderContainer = styled.div<TabProps & {mobile: boolean}>`
    display: flex;
    flex-direction: row;
    background-color: ${props => props.theme.colors["white"]};
    ${props => props.orientation == "vertical" && css`
        flex-direction: column;
        min-width: 174px;
        padding: 16px 0;
        margin-right: 24px;
        height: fit-content;
    `}

    ${props => !props.mobile && css `
        border: 1px solid ${props => props.theme.colors["gray-7"]};
        
    `}

    ${props => props.mobile && css `
        border: none;
        width: 100%;
        margin: auto;
        margin-bottom: 24px;
    `} 
`;


export const TabStyle = styled.div<{selected: boolean; orientation: string}>`
    display: flex;
    flex-flow: column;
    height: 40px;
    justify-content: center;
    align-items: center;
    min-width: 84px;
    ${props => props.orientation == 'vertical' && css `
        padding-left: 20px;
        align-items: unset;
    `}
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