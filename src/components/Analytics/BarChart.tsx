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
                display: false,
                text: props.title
            },
            legend: {
                display: false
            },
            plugins: {
                crosshair: false
            },
            tooltips: {
                mode: "nearest",
                callbacks: {
                    label: (tooltipItems, data) => {
                        return (props.unit ? " " + props.unit : "") + tooltipItems.yLabel.toLocaleString() + (props.unitRight ? " " + props.unitRight : "");
                    }
                }
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
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        callback: (value: number) => {
                            return (props.unit ? " " + props.unit : "") + value.toLocaleString() + (props.unitRight ? " " + props.unitRight : "");
                        },
                        ...(props.step && {
                            stepSize: props.step,
                        }),
                        min: 0,
                        beginAtZero: true
                    }
                }]
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