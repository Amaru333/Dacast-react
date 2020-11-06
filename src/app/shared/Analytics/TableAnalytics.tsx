import React from 'react';
import ReactTable from "react-table";

export interface TableAnalyticsProps {
    data: Object[];
    header: { Header: string; accessor: string; Cell?: (item: Object) => JSX.Element }[];
    className: string;
}

export const TableAnalytics = (props: TableAnalyticsProps) => {

    return (
        <ReactTable 
            {...props}
            data={props.data}
            columns={props.header}
        />
    )
}