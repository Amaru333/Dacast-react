import React from 'react';
import ReactTable from "react-table";

export interface TableAnalyticsProps {
    data: Object[];
    header: { Header: string; accessor: string; Cell?: (item: Object) => JSX.Element }[];
    className?: string;
}

export const TableAnalytics = (props: TableAnalyticsProps) => {

    return (
        <ReactTable 
            {...props}
            data={props.data.map(d => {
                return Object.keys(d).reduce((acc, next) => {
                    if(next !== 'label') {
                        return {...acc, [next]: d[next].toLocaleString()}
                    }
                    return {...acc, [next]: d[next]}
                }, {})
            })}
            columns={props.header}
        />
    )
}