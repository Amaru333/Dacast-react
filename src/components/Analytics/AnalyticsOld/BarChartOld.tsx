import React from 'react';
import { Bar } from 'react-chartjs-2';
import { displayBytesForHumans, displayTimeForHumans } from '../../../utils/formatUtils';

export const BarChartOld = (props: any) => {

    if(props.hidden) {
        return<></>;
    }
    const {
        title,
        labels,
        datasetName,
        data,
        beginAtZero,
        displayBytes,
        displayTime,
        displayBytesFromGB,
        displayFromMb,
        yAxesName,
        truncateName,
        ...other
    } = props;

    let displayLabels = labels
    if (truncateName) {
        displayLabels = labels.map(d => d.length > 10 ? d.slice(0, 10) + '...' : d)
    }
    let options = {
        responsive: true,
        title: {
            fontFamily: 'Arial',
            fontColor: '#000',
            fontSize: 17,
            display: true,
            position: title ? 'top' : 'none',
            text: title
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero
                    },
                    scaleLabel: {
                        display: !!yAxesName,
                        labelString: yAxesName
                    }
                }
            ]
        }
    }
    if (displayBytes) {
        options.tooltips = {
            callbacks: {
                label: (tooltipItem, data) => { 
                    var data = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return displayBytesForHumans(data);
                },
            }
        }
    } else if (displayBytesFromGB) {
        options.tooltips = {
            callbacks: {
                label: (tooltipItem, data) => {
                    var label = data.labels[tooltipItem.index];
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return label + ': ' + displayBytesForHumans(value, true);
                },
            }
        }
    } else if (displayFromMb) {
        options.tooltips = {
            callbacks: {
                label: (tooltipItem, data) => {
                    var label = data.labels[tooltipItem.index];
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return label + ': ' + displayBytesForHumans(value, 2, true);
                },
            }
        }
    }else if (displayTime) {
        options.tooltips = {
            callbacks: {
                label: (tooltipItem, data) => {
                    var data = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return displayTimeForHumans(data);
                },
            }
        }
    }
    let line = {
        labels: displayLabels,
        datasets: [
            {
                label: datasetName,
                backgroundColor: '#3366CC',
                data,
            },
        ],
    };

    if(displayFromMb) {
        if(line.datasets[0] && line.datasets[0].data){
            var  newDatasets = line.datasets[0].data.map(element => element / 1000)
            line.datasets[0].data = newDatasets;
        }
    }

    return (
        <Bar hidden={props.hidden} {...other} data = { line } options = { options } />
    )

}