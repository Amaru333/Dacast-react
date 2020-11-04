import React from 'react';
import ReactTable from "react-table";

interface TableAnalyticsProps {
    data: Object[];
    header: { Header: string; accessor: string; Cell?: (item: Object) => JSX.Element }[];
}

export const TableAnalytics = (props: TableAnalyticsProps) => {

    console.log(props)
    return (
        <ReactTable 
            data={props.data}
            columns={props.header}
        />
    )
}