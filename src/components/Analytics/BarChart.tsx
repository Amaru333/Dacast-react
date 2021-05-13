import React from 'react';
import { Bar, HorizontalBar, Line, LinearComponentProps } from 'react-chartjs-2';
import { BarChartProps, BaseItemAnalytics } from './AnalyticsType';
import { EmptyAnalytics } from './EmptyAnalytics';

export const BarChart = (props: BarChartProps) => {


    if(!props.labels.length) {
        return (
            <EmptyAnalytics />
        )
    }

    const createDataset = (item: BaseItemAnalytics) => {
        return {
            data: item.data,
            label: item.label,
            backgroundColor: item.color,
            type: item.type ? item.type : 'bar',
            yAxisID: item.yAxisPosition && item.yAxisPosition === "right" ? 'B' : 'A',
            ...(item.type === 'bar' && props.options && props.options.isTime && {
                barThickness: 20,
            }),
            order: 1,
            ...(item.type === 'line' && {
                order:0,
                fill: false,
                borderColor: item.color,
                pointBackgroundColor: item.color,
                pointHighlightStroke: item.color,
                lineTension: 0,
                startValue: 0
            })
        };
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
            },
            plugins: {
                crosshair: false
            },
            tooltips: {
                mode: "nearest",
                ...(props.unit && {
                    callbacks: {
                        label: (tooltipItems, data) => {
                            return tooltipItems.yLabel + " " + props.unit;
                        }
                    }
                })
            },
            scales: {
                ...(props.options.isTime && {
                    xAxes: [{
                        type: 'time',
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20,
                        }
                    }],
                }
                ),
                yAxes: [{
                    ...(props.unit && {
                        ticks: {
                            callback: (value: number) => {
                                return value.toLocaleString() + " " + props.unit;
                            },
                            min: 0,
                            beginAtZero: true
                        }
                    }),
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        ...(props.unit && {
                            callback: (value: number) => {
                                return value.toLocaleString() + " " + props.unit;
                            }
                        }),
                        ...(props.step && {
                            stepSize: props.step,
                        }),
                        min: 0,
                        beginAtZero: true
                    }
                },
                ...(props.options.rightYAxes ? [{
                    id: 'B',
                    ...(props.unitRight && {
                        ticks: {
                            callback:  (value: number) => {
                                if(value >= 0) {
                                    return value.toLocaleString() + " " + props.unitRight;
                                }
                            },
                            min: 0,
                            beginAtZero: true
                        },

                    }),
                    type: 'linear',
                    position: 'right',
                }] : [])
                ]
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
BarChart.defaultProps = { type: "vertical", options: {} }