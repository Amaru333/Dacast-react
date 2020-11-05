import React, { Component } from 'react';
import { Line, LinearComponentProps, Scatter } from 'react-chartjs-2';
import { hexToRgbA, lightenDarkenColor } from '../../utils/utils';
import { BaseItemAnalytics, LineChartProps } from './AnalyticsType';
import 'chartjs-plugin-crosshair'

export const LineChart = (props: LineChartProps) => {

    const createDataset = (item: BaseItemAnalytics) => {

        var returnLine = {
            data: item.data.map((element, index) => element),
            label: item.label,
            borderColor: item.color,
            pointBackgroundColor: item.color,
            pointHighlightStroke: item.color,
            fill: props.options.fill,
            yAxisId: item.yAxisPosition && item.yAxisPosition === "right" ? 'right-y-axis' : 'left-y-axis',
            backgroundColor: props.options.fill && hexToRgbA(lightenDarkenColor(item.color, 50), 0.6),
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
                        }, {
                            id: 'right-y-axis',
                            type: 'linear',
                            position: 'right',
                        }]
                    }
                )
            },
            responsiveAnimationDuration: 0
        },
        data: {
            datasets: props.lines.map(element => createDataset(element))
        }
    }

    console.log(lineProps)
    return (
        <Line
            {...lineProps}
        />

    );
}

LineChart.defaultProps = { options: { stacked: false, fill: false, curve: true, isTime: false, rightYAxes: false } }