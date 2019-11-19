import styled, { css } from "styled-components";
import {TableProps} from './TableTypes';

export const TableContainer = styled.table<TableProps>`
    height: auto;
    margin: auto;
    border-color: ${props => props.theme.colors["gray-7"]};
    border-spacing: unset;
    border-collapse: collapse;
`;

export const TableHeaderContainer = styled.thead<{}>`
`;

export const TableHeaderRow = styled.tr<{}>`
    width: auto;
    height: 52px;
    background-color: ${props => props.theme.colors["gray-10"]};
    border: 1px solid ${props => props.theme.colors["gray-8"]};
    padding-left: 16px;
`;

export const TableHeaderCell = styled.td<{}>`
    padding-left: 16px;
`;

export const TableBodyContainer = styled.tbody<{}>`
`;

export const TableBodyRow = styled.tr<{}>`
    width: auto;
    height: 48px;
    background-color: ${props => props.theme.colors["white"]};
    border: 1px solid ${props => props.theme.colors["gray-8"]};
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