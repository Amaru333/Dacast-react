import React, { Component } from 'react';
import { Line, LinearComponentProps } from 'react-chartjs-2';
import { randDarkColor } from '../../utils/utils';


interface LineChartProps {
    lines: line[],
    labels: string[],
    title: string
}

interface line {
    data: number[],
    label: string
}

export const LineChart = (props: LineChartProps) => {

    const createDataset = (line: line) => {
        return { data: line.data, label: line.label, borderColor: randDarkColor(), fill: false };
    }

    const lineProps: LinearComponentProps = {
        data: {
            labels: props.labels,
            datasets: props.lines.map(element => createDataset(element))
        },
        options: {
            title: {
                display: true,
                text: props.title
            }
        }
    }

    return (
        <Line
            {...lineProps}
        />

    );

}