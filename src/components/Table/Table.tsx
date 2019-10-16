import * as React from 'react';
import {TableProps} from './TableTypes'
import { TableContainer, TableHeaderContainer, TableHeaderRow, TableHeaderCell, TableBodyContainer, TableBodyRow, TableBodyCell } from './TableStyle';

export const Table = (props: TableProps) => {

    const renderTableHeader = () => {
        return props.header.map((headerCell, i) => {
            return (
                <TableHeaderCell className="" key={props.id+"tableHeaderCell"+i.toString()}>
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
                        bodyRow.map((bodyCell: any, item) => {
                            return (
                                <TableBodyCell key={props.id+"tableBodyRow"+i.toString()+"TableBodyCell"+item.toString()} className="">
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
