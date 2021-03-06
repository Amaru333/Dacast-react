import React from 'react';
import { Line, LinearComponentProps } from 'react-chartjs-2';
import { hexToRgbA } from '../../utils/utils';
import { BaseItemAnalytics, LineChartProps } from './AnalyticsType';
import 'chartjs-plugin-crosshair'
import { EmptyAnalytics } from './EmptyAnalytics';

export const LineChart = (props: LineChartProps) => {

    if(!props.labels.length) {
        return (
            <EmptyAnalytics />
        )
    }

    const createDataset = (item: BaseItemAnalytics) => {

        var returnLine = {
            data: item.data.map((element, index) => element),
            label: item.label,
            borderColor: item.color,
            pointBackgroundColor: item.color,
            pointHighlightStroke: item.color,
            fill: props.options.fill,
            yAxisId: item.yAxisPosition && item.yAxisPosition === "right" ? 'right-y-axis' : 'left-y-axis',
            backgroundColor: props.options.fill && hexToRgbA(item.color, 0.6),
            lineTension: props.options.curve,
            showLine: true,
            type: item.type ? item.type : 'line',
        };

        return returnLine
    }


    const lineProps: LinearComponentProps = {
        type: "scatter",
        labels: props.labels,
        options: {
            title: {
                display: false,
                text: props.title
            },
            legend: {
                display: false
            },
            plugins: {
                crosshair: {
                    sync: {
                        enabled: false
                    },
                    zoom: {
                        enabled: false
                    }
                }
            },
            tooltips: {
                mode: "interpolate",
                intersect: false,
                callbacks: {
                    title: (a, d) => {
                        return a[0].xLabel.toString()
                    },
                    label: (i, d) => {
                      return (
                        d.datasets[i.datasetIndex].label + ": " + i.yLabel.toLocaleString()
                      );
                    }
                }
            },
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    ticks: {
                        callback: (value: number) => {
                            return value.toLocaleString();
                        },
                        stepSize: props.step,
                        beginAtZero: true,
                        min: 0,
                        autoSkip: false
                    }
                }],
                ...( props.options.isTime && {
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                autoSkip: false,
                                maxTicksLimit: 20
                            }
                        }],
                    }
                ),
                ...( props.options.rightYAxes && {
                        yAxes: [{
                            id: 'left-y-axis',
                            type: 'linear',
                            position: 'left',
                            ticks:{
                                callback: (value: number) => {
                                    return value.toLocaleString();
                                },
                                autoSkip: false,
                                beginAtZero: true,
                                min: 0
                            }
                        }, {
                            id: 'right-y-axis',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                callback: (value: number) => {
                                    return value.toLocaleString();
                                },
                                autoSkip: false,
                                beginAtZero: true,
                                min: 0
                            }
                        }]
                    }
                )
            },
            responsiveAnimationDuration: 0
        },
        data: {
            datasets: props.lines.map(element => createDataset(element)),
            labels: props.labels
        }
    }

    return (
        <Line
            {...lineProps}
        />

    );
}

LineChart.defaultProps = { options: { stacked: false, fill: false, curve: true, isTime: false, rightYAxes: false } }