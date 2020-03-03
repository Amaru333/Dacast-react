import * as React from 'react';
import {TableProps} from './TableTypes'
import { TableContainer, TableHeaderContainer, TableHeaderRow, TableHeaderCell, TableBodyContainer, TableBodyRow, TableBodyCell, WrapperResponsiveContainer, TableFooterContainer, TableFooterRow, TableFooterCell } from './TableStyle';
import { isMobile } from 'react-device-detect';
import Scrollbar from 'react-scrollbars-custom';
import { Icon } from '@material-ui/core';

export const Table = (props: TableProps) => {

    const [sortApplied, setSortApplied] = React.useState<{name: string; sortDesc: boolean}>(props.header ? {name:props.header.defaultSort, sortDesc: true} : null)

    React.useEffect(() => {
        if(!sortApplied && props.header) {
            setSortApplied({name: props.header.defaultSort, sortDesc: true})
        }
    }, [props.header])

    const handleHeaderCellClick = (sort: string) => {
        if(sort === sortApplied.name) {
            setSortApplied({...sortApplied, sortDesc: !sortApplied.sortDesc})
        } else {
            setSortApplied({name: sort, sortDesc: true})
        }
    }

    const renderTableHeader = () => {
        return props.header.data ? 
            props.header.data.map((headerCell, i) => {
                return (
                    <TableHeaderCell onClick={() => {if(headerCell.sort){handleHeaderCellClick(headerCell.sort)}}} sortApplied={sortApplied.name === headerCell.sort && typeof headerCell.sort !== 'undefined'} className={headerCell.sort ? 'pointer' : ""} key={props.id+"tableHeaderCell"+i.toString()}>
                        <div className='flex items-center'>
                            {headerCell.cell}
                            {
                                headerCell.sort ? 
                                    <Icon>{headerCell.sort === sortApplied.name ? sortApplied.sortDesc ? 'arrow_downward' : 'arrow_upward' : 'unfold_more'}</Icon>
                                    : null
                            }
                        </div>

                    </TableHeaderCell>
                )
            }) : null
    }

    const renderTableBody = () => {
        return props.body ?
            props.body.map((bodyRow, i) => {
                return (
                    <TableBodyRow onClick={() => {bodyRow.callback(bodyRow.callbackData)}} key={props.id+"tableBodyRow"+i.toString()}>
                        {
                            bodyRow.data.map((bodyCell: any, item) => {
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
        <WrapperResponsiveContainer hasContainer={props.hasContainer}>
            <Scrollbar className='tableTest' contentProps={{style: {position: 'relative',  display: "inline-table"}}} scrollerProps={{style: {position: 'relative'}}} wrapperProps={{style: {position: 'relative'}}} removeTracksWhenNotUsed removeTrackYWhenNotUsed minimalThumbXSize={6} trackXProps={{style: {backgroundColor: 'inherit'}}}>
                <TableContainer  {...props}>
            
                    {props.header ? 
                        <TableHeaderContainer>
                            <TableHeaderRow backgroundColor={props.headerBackgroundColor}>
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
            </Scrollbar> 
        </WrapperResponsiveContainer>
    );
}
