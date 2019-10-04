import styled, { css } from 'styled-components';
import { DropdownProps } from './DropdownTypes';
import { ColorsApp } from '../../../styled/types';

export const ContainerStyle = styled.div<DropdownProps>`
    display: flex;
    flex-direction: column;
    height:auto;
`;

export const DropdownLabel = styled.div`
    display: flex;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
`;

export const TitleContainer = styled.div<{isOpened: boolean}>`
    display: flex;
    flex-direction: row;
    position: relative;
    height: auto;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.theme.colors["gray-10"]};
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

export const Title = styled.div`
    padding: 8px 44px 8px 12px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
`;

export const IconStyle = styled.div`
    position: absolute;
    right: 2%;
    top: 17%;
`;

export const DropdownList = styled.ul<{displayDropdown: boolean}>`
    display: none;
    ${props => (props.displayDropdown) && css `
        display: block;
    `}
    margin-block-start: 0px;
    padding-inline-start: 10px;
    padding-inline-end: 10px;
    padding-block-end: 10px;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    box-shadow: 0px 1px 4px rgba(34, 47, 62, 0.1);
`;

export const DropdownItem = styled.li<{isSelected: boolean, hasBottomBorder: boolean}>`
    display: block;
    position: relative;
    min-height: 32px;
    &:hover {
        background-color: ${props => props.theme.colors["gray-10"]};
        cursor: pointer;
    }
    ${props => props.isSelected && css `
        background-color: ${props => props.theme.colors["violet10"]};
        color: ${props => props.theme.colors["dark-violet"]};
    `}
    ${props => props.hasBottomBorder && css`
        border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    `}
`;

export const DropdownIconStyle = styled.div`
    position: absolute;
    right: 2%;
    top: 2%;
`;