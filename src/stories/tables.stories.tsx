import React from 'react';
import { storiesOf } from '@storybook/react'
import { Table } from '../components/Table/Table';
const tableHeader = ["fieldHeader1", "fieldHeader2", "fieldHeader3", "fieldHeader4", "fieldHeader5"];
const tableBody = [
    [
        "bodyRow1Cell1",
        "bodyRow1Cell2",
        "bodyRow1Cell3",
        "bodyRow1Cell4",
        "bodyRow1Cell5",
    ],
    [
        "bodyRow2Cell1",
        "bodyRow2Cell2",
        "bodyRow2Cell3",
        "bodyRow2Cell4",
        "bodyRow2Cell5",
    ],
    [
        "bodyRow3Cell1",
        "bodyRow3Cell2",
        "bodyRow3Cell3",
        "bodyRow3Cell4",
        "bodyRow3Cell5",
    ],
    [
        "bodyRow4Cell1",
        "bodyRow4Cell2",
        "bodyRow4Cell3",
        "bodyRow4Cell4",
        "bodyRow4Cell5",
    ]
]

storiesOf('Tables', module)
    .add('Tables', () => ( 
        <React.Fragment>
            <Table header={tableHeader} body={tableBody} id="table1" />
        </React.Fragment>
    ))