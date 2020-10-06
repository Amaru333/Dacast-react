import React, { Component } from 'react';
import { Bar, HorizontalBar, Line, LinearComponentProps } from 'react-chartjs-2';
import { randDarkColor } from '../../utils/utils';


interface BarChartProps {
    dataSets: BarItem[],
    labels: string[],
    title: string,
    type?: 'horizontal' | 'vertical'
}

interface BarItem {
    data: number[],
    label?: string
}

export const BarChart = (props: BarChartProps) => {

    const createDataset = (bar: BarItem) => {
        return { data: bar.data, label: bar.label, backgroundColor: randDarkColor() };
    }

    const barProps: LinearComponentProps = {
        data: {
            labels: props.labels,
            datasets: props.dataSets.map(element => createDataset(element))
        },
        options: {
            title: {
                display: true,
                text: props.title
            }
        }
    }

    if(props.type == 'horizontal') {
        return (
            <HorizontalBar
                {...barProps}
            />
    
        );
    } else {
        return (
            <Bar
                {...barProps}
            />
    
        );
    }

}
BarChart.defaultProps = {type: "vertical"}