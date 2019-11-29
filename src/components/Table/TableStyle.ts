import styled from "styled-components";
import {TableProps} from './TableTypes';

export const TableContainer = styled.table<{}>`
    height: auto;
    border-spacing: unset;
    border-collapse: collapse;
    min-width: 600px;
    width:100%;
    border-color: ${props => props.theme.colors["gray-7"]};
`;

export const TableHeaderContainer = styled.thead<{}>`
`;

export const WrapperResponsiveContainer = styled.div<TableProps>`
    overflow-x: auto;
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
                display: block;
            }
        }
    }
`;

export const TableBodyCell = styled.td<{}>`
    padding-left: 16px;
`;