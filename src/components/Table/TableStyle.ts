import styled, {css} from "styled-components";
import { ColorsApp } from '../../styled/types';
import { IconGreyContainer } from '../../shared/Common/Icon';

export const TableContainer = styled.table<{contentLoading: boolean}>`
    height: auto;
    border-spacing: unset;
    border-collapse: collapse;
    width:100%;
    border-color: ${props => props.theme.colors["gray-7"]};
    border: 1px solid ${props => props.theme.colors["gray-8"]};
    ${props => props.contentLoading && css`
        cursor: not-allowed !important;
        pointer-events: none;
        opacity: 0.5;
    `}
`;

export const TableHeaderContainer = styled.thead<{}>`
`;

export const WrapperResponsiveContainer = styled.div<{hasContainer: boolean; tableHeight?: number}>`
    ${props => props.tableHeight && css `
        height: ${props.tableHeight+"px"};
        overflow-x: auto;
    `}
    margin: ${props => props.hasContainer ? "0"  : "16px 0" };
    
`;

export const TableHeaderRow = styled.tr<{backgroundColor: ColorsApp}>`
    width: auto;
    height: 52px;
    background-color: ${props => props.theme.colors[props.backgroundColor]};
    padding-left: 16px;
`;

export const TableHeaderCell = styled.td<{sortApplied: boolean; contentLoading: boolean}>`
    padding-left: 16px;
    max-width: 150px;
    border-bottom: 1px solid ${props => props.theme.colors["gray-8"]};
    ${props => props.sortApplied && css `
        border-bottom: 2px solid ${props.theme.colors["dark-violet"]};
    `}
    ${props => props.contentLoading && css`
        cursor: not-allowed !important;
        pointer-events: none;
        opacity: 0.5;
    `}
`;

export const TableBodyContainer = styled.tbody<{}>`
`;

export const TableBodyRow = styled.tr<{contentLoading: boolean}>`
    width: auto;
    height: 48px;
    background-color: ${props => props.theme.colors["white"]};
    :not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.colors["gray-8"]};
    }
    padding-left: 16px;
    &:hover {
        ${IconGreyContainer} {
            &:before {
                background-color: ${props => props.theme.colors["white"]} ;
            }
        }
        cursor: pointer;
        background-color: ${props => props.theme.colors["violet10"]};
        td {
            .iconAction {
                visibility: visible;
            }
        }
        ${props => props.contentLoading && css`
            cursor: not-allowed !important;
            pointer-events: none;
            opacity: 0.5;
        `}
    }
`;

export const TableBodyCell = styled.td<{contentLoading: boolean}>`
    padding-left: 16px;
    min-width: 100px;
    box-sizing: border-box;
    ${props => props.contentLoading && css`
        cursor: not-allowed !important;
        pointer-events: none;
        opacity: 0.5;
    `}
`;

export const TableFooterContainer = styled.tfoot<{}>`
`;

export const TableFooterRow = styled.tr<{}>`
    width: auto;
    height: 52px;
    background-color: ${props => props.theme.colors["gray-10"]};
    padding-left: 16px;
`;

export const TableFooterCell = styled.td<{}>`
    padding-left: 16px;
    border-bottom: 1px solid ${props => props.theme.colors["gray-8"]};
    width: 150px;
`;