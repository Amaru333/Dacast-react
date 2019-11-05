import styled, { css } from 'styled-components';
import { DropdownProps } from './DropdownTypes';
import { Text } from "../../Typography/Text"

export const ContainerStyle = styled.div<DropdownProps>`
    display: flex;
    flex-direction: column;
    height:auto;
    ${props => props.isNavigation && css`
        position: relative;
    `}
`;

export const DropdownLabel = styled.div`
    display: flex;
`;

export const TitleContainer = styled.div<{isOpened: boolean; isNavigation: boolean | undefined}>`
    display: flex;
    flex-direction: row;
    position: relative;
    height: auto;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.theme.colors["gray-10"]};
    ${props => props.isNavigation && css`
        background-color: ${props.theme.colors.white};
    `}
    &:hover {
        cursor: pointer;
    }
    &:focus {
        border: 1px solid ${props => props.theme.colors["violet"]};
    }
    ${props => props.isOpened && css`
        border: 1px solid ${props => props.theme.colors["violet"]};
    `}
`;

export const Title = styled.div<{ref: any}>`
    padding: 8px 44px 8px 12px;
    text-overflow: ellipsis;
`;

export const IconStyle = styled.div`
    position: absolute;
    right: 8%;
    top: 17%;
`;

export const DropdownList = styled.ul<{displayDropdown: boolean; isNavigation: boolean | undefined}>`
    display: none;
    ${props => (props.displayDropdown) && css `
        display: block;
    `}
    margin-block-start: 0px;
    padding-inline-start: 8px;
    padding-inline-end: 8px;
    padding-block-end: 8px;
    max-height: 200px;
    overflow: scroll;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    box-shadow: 0px 1px 4px rgba(34, 47, 62, 0.1);
    ${props => props.isNavigation && css`
        position: absolute;
        top: 42px;
        width: 97.5%;
        z-index: 99;
        background-color: ${props.theme.colors.white};
    `}
`;

export const DropdownItem = styled.li<{isSelected: boolean}>`
    display: block;
    position: relative;
    min-height: 32px;
    height: 100%;
    padding: 0 8px;
    &:hover {
        background-color: ${props => props.theme.colors["gray-10"]};
        cursor: pointer;
    }
    ${props => props.isSelected && css `
        background-color: ${props => props.theme.colors["violet10"]};
        color: ${props => props.theme.colors["dark-violet"]};
        transition: none;
    `}
`;

export const BorderItem = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    width: 110%;
    margin-left: -5%;
`;

export const DropdownIconStyle = styled.div`
    position: absolute;
    right: 0%;
    top: 25%;
    padding-right: 8px;
    
`;

export const DropdownItemText = styled(Text)`
    position: absolute;
    display: contents;
    width: 80%;
    min-height: 100%;
    padding-top: 4px;
`