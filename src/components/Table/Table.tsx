import * as React from 'react';
import {TableProps} from './TableTypes'
import { TableContainer, TableHeaderContainer, TableHeaderRow, TableHeaderCell, TableBodyContainer, TableBodyRow, TableBodyCell, WrapperResponsiveContainer, TableFooterContainer, TableFooterRow, TableFooterCell } from './TableStyle';
import { isMobile } from 'react-device-detect';
import Scrollbar from 'react-scrollbars-custom';
import { IconStyle } from '../../shared/Common/Icon';

export const Table = (props: TableProps) => {

    const [sortApplied, setSortApplied] = React.useState<{name: string; sortDesc: boolean}>(props.header ? {name:props.header.defaultSort, sortDesc: true} : null)

    React.useEffect(() => {
        if(!sortApplied && props.header) {
            setSortApplied({name: props.header.defaultSort, sortDesc: true})
        }
    }, [props.header])

    const handleHeaderCellClick = (sort: string) => {
        let newVal: boolean = sortApplied.sortDesc
        if(sort === sortApplied.name) {
            setSortApplied({...sortApplied, sortDesc: !sortApplied.sortDesc})
            newVal = !sortApplied.sortDesc
        } else {
            newVal = true
            setSortApplied({name: sort, sortDesc: true})
        }
        if(props.header && props.header.sortCallback) {
            props.header.sortCallback(sort + (newVal ? '-desc' : '-asc'))
        }
    }

    const renderTableHeader = () => {
        return props.header.data ? 
            props.header.data.map((headerCell, i) => {
                return (
                    <TableHeaderCell onClick={() => {if(headerCell.sort){handleHeaderCellClick(headerCell.sort)}}} sortApplied={ headerCell.sort ? sortApplied.name === headerCell.sort && typeof headerCell.sort !== 'undefined': false} className={headerCell.sort ? 'pointer' : ""} key={props.id+"tableHeaderCell"+i.toString()}>

                            
                        {
                            headerCell.sort ? 
                                <div style={{width: 'max-content'}} className='flex items-center col col-12'>
                                    {headerCell.cell}
                                    <IconStyle className='pl1' customsize={18}>{headerCell.sort === sortApplied.name ? sortApplied.sortDesc ? 'arrow_downward' : 'arrow_upward' : 'unfold_more'}</IconStyle>
                                </div>
                                : headerCell.cell
                        }


                    </TableHeaderCell>
                )
            }) : null
    }

    const renderTableBody = () => {
        return props.body ?
            props.body.map((bodyRow, i) => {
                return (
                    <TableBodyRow onClick={() => {}} key={props.id+"tableBodyRow"+i.toString()}>
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
        <WrapperResponsiveContainer tableHeight={props.tableHeight} hasContainer={props.hasContainer}>
            <Scrollbar className={'tableTest' + (props.customClassName ? props.customClassName : '')} style={{overflowY: 'visible'}} contentProps={{style: {position: 'relative', overflowY:'visible',  display: "inline-table"}}} scrollerProps={{style: {overflowY:'visible', position: 'relative'}}} wrapperProps={{style: {overflowY:'visible', position: 'relative'}}} removeTracksWhenNotUsed removeTrackYWhenNotUsed minimalThumbXSize={6} trackXProps={{style: {backgroundColor: 'inherit'}}} trackYProps={{style: {overflowY: 'visible'}}}>
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
