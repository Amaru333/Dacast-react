import React, { Component } from 'react';
import { Line, LinearComponentProps } from 'react-chartjs-2';
import { hexToRgbA, lightenDarkenColor } from '../../utils/utils';
import { BaseItemAnalytics, LineChartProps } from './AnalyticsType';

export const LineChart = (props: LineChartProps) => {
    const createDataset = (line: BaseItemAnalytics) => {
        return { 
            data: line.data, 
            label: line.label, 
            borderColor: line.color, 
            pointBackgroundColor: line.color,
            pointHighlightStroke: line.color,
            fill: props.options.fill,
            backgroundColor: props.options.fill && hexToRgbA(lightenDarkenColor(line.color, 50), 0.6),
            lineTension: props.options.curve,
            type:line.type ? line.type : 'line'
        };
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
            },
            scales: {
                yAxes: [{
                    stacked: props.options.stack,
                }]
            },
            animation: {
                duration: 750,
            },
        }
    }

    return (
        <Line
            {...lineProps}
        />

    );

}

LineChart.defaultProps = { options: {stacked: false, fill: false, curve: true}  }