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
            data: item.data.map((element, index) => element.toLocaleString()),
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
                display: true,
                text: props.title
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
                        d.datasets[i.datasetIndex].label + ": " + i.yLabel
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
                        ...(props.step && {
                            stepSize: props.step,
                            suggestedMin: 0,
                            beginAtZero: true,
                            min: 0
                        }),
                    }
                }],
                ...( props.options.isTime && {
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                autoSkip: true,
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
                                suggestedMin: 0,
                                beginAtZero: true,
                                min: 0
                            }
                        }, {
                            id: 'right-y-axis',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                suggestedMin: 0,
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