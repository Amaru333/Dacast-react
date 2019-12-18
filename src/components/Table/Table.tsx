import * as React from 'react';
import {TableProps} from './TableTypes'
import { TableContainer, TableHeaderContainer, TableHeaderRow, TableHeaderCell, TableBodyContainer, TableBodyRow, TableBodyCell, WrapperResponsiveContainer, TableFooterContainer, TableFooterRow, TableFooterCell } from './TableStyle';
import { isMobile } from 'react-device-detect';

export const Table = (props: TableProps) => {

    const renderTableHeader = () => {
        return props.header ? 
            props.header.map((headerCell, i) => {
                return (
                    <TableHeaderCell className="" key={props.id+"tableHeaderCell"+i.toString()}>
                        {headerCell}
                    </TableHeaderCell>
                )
            }) : null
    }

    const renderTableBody = () => {
        return props.body ?
            props.body.map((bodyRow, i) => {
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
            }) : null
    }
    const renderTableFooter = () => {
        return props.footer ? 
            props.footer.map((footerCell, i) => {
                return (
                    <TableFooterCell className="" key={props.id+"tableFooterCell"+i.toString()}>
                        {footerCell}
                    </TableFooterCell>
                )
            }) : null
    }


    return (
        <WrapperResponsiveContainer isMobile={isMobile}  {...props}>
            <TableContainer>
                {props.header ? 
                    <TableHeaderContainer>
                        <TableHeaderRow>
                            {renderTableHeader()}
                        </TableHeaderRow>
                    </TableHeaderContainer> : null
                }
                {
                    props.body ?
                        <TableBodyContainer>
                            {renderTableBody()}
                        </TableBodyContainer>
                        : null
                }

                {props.footer ? 
                    <TableFooterContainer>
                        <TableFooterRow>
                            {renderTableFooter()}
                        </TableFooterRow>
                    </TableFooterContainer> : null
                }
            </TableContainer>
        </WrapperResponsiveContainer>
    );
}
