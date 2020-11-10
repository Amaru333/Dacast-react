import React from 'react';
import { Bar, HorizontalBar, Line, LinearComponentProps } from 'react-chartjs-2';
import { BarChartProps, BaseItemAnalytics } from './AnalyticsType';
import { EmptyAnalytics } from './EmptyAnalytics';

export const BarChart = (props: BarChartProps) => {


    if(!props.dataSets.length) {
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
                crosshair: {
                    zoom: {
                        enabled: false,
                    }
                }
            },
            tooltips: {
                mode: "interpolate",
                intersect: false,
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
                            maxTicksLimit: 20
                        }
                    }],
                }
                ),
                yAxes: [{
                    ...(props.unit && {
                        ticks: {
                            callback: (value) => {
                                return value + " " + props.unit;
                            }
                        }
                    }),
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                },
                ...(props.options.rightYAxes ? [{
                    id: 'B',
                    ...(props.unitRight && {
                        ticks: {
                            callback:  (value) => {
                                return value + " " + props.unitRight;
                            }
                        }
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