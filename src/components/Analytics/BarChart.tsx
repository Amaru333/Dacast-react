import React from 'react';
import { Bar, HorizontalBar, Line, LinearComponentProps } from 'react-chartjs-2';
import { BarChartProps, BaseItemAnalytics } from './AnalyticsType';

export const BarChart = (props: BarChartProps) => {

    const createDataset = (item: BaseItemAnalytics) => { 
        return { 
            data: item.data, 
            label: item.label, 
            backgroundColor: item.color,
            type: item.type ? item.type : 'bar',
            yAxisId: item.yAxisPosition && item.yAxisPosition === "right" ? 'right-y-axis' : 'left-axis-test',
            ...( item.type === 'bar' && props.options && props.options.isTime && {
                barThickness: 20,
            } ),
            ...( item.type === 'line' && {
                fill: false,
                borderColor: item.color, 
                pointBackgroundColor: item.color,
                pointHighlightStroke: item.color,
                lineTension: 0,
            } )
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
BarChart.defaultProps = {type: "vertical", options: {}}