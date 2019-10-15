import * as React from 'react';
import {TableProps} from './TableTypes'
import { TableContainer, TableHeaderContainer, TableHeaderRow, TableHeaderCell, TableBodyContainer, TableBodyRow, TableBodyCell } from './TableStyle';

export const Table = (props: TableProps) => {

    const renderTableHeader = () => {
        return props.header.map((headerCell) => {
            return (
                <TableHeaderCell className="" key={props.id+"tableHeader"+headerCell.toString()}>
                    {headerCell}
                </TableHeaderCell>
            )
        })
    }

    const renderTableBody = () => {
        return props.body.map((bodyRow, i) => {
            return (
                <TableBodyRow key={props.id+"tableBodyRow"+i.toString()}>
                    {
                        bodyRow.map((bodyCell: any) => {
                            return (
                                <TableBodyCell key={props.id + "TableBodyCell" + bodyCell.toString()} className="">
                                    {bodyCell}
                                </TableBodyCell>
                            )
                        })
                    }
                </TableBodyRow>
            )
        })
    }
    return (
        <TableContainer {...props}>
            <TableHeaderContainer>
                <TableHeaderRow>
                    {renderTableHeader()}
                </TableHeaderRow>
            </TableHeaderContainer>
            <TableBodyContainer>
                {renderTableBody()}
            </TableBodyContainer>
        </TableContainer>
    );
}
