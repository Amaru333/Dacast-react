import styled, {css} from "styled-components";
import {TableProps} from './TableTypes';

export const TableContainer = styled.table<{}>`
    height: auto;
    border-spacing: unset;
    border-collapse: collapse;
    width:100%;
    border-color: ${props => props.theme.colors["gray-7"]};
`;

export const TableHeaderContainer = styled.thead<{}>`
`;

export const WrapperResponsiveContainer = styled.div<TableProps & {isMobile: boolean}>`
    overflow-x: auto;
    ${props => props.isMobile && css`
        overflow-x: scroll;
        ::-webkit-scrollbar {
            -webkit-appearance: none;
            height: 5px;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, .5);
            -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
        }
    `}
    border: 1px solid ${props => props.theme.colors["gray-8"]};
`;

export const TableHeaderRow = styled.tr<{}>`
    width: auto;
    height: 52px;
    background-color: ${props => props.theme.colors["gray-10"]};
    padding-left: 16px;
`;

export const TableHeaderCell = styled.td<{}>`
    padding-left: 16px;
    border-bottom: 1px solid ${props => props.theme.colors["gray-8"]};
`;

export const TableBodyContainer = styled.tbody<{}>`
`;

export const TableBodyRow = styled.tr<{}>`
    width: auto;
    height: 48px;
    background-color: ${props => props.theme.colors["white"]};
    :not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.colors["gray-8"]};
    }
    padding-left: 16px;
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors["violet10"]};
        td {
            .iconAction {
                visibility: visible;
            }
        }
    }
`;

export const TableBodyCell = styled.td<{}>`
    padding-left: 16px;
    max-width: 150px;
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