import React from 'react';
import { Pie } from 'react-chartjs-2';
import { displayBytesForHumans, displayTimeForHumans, lerpColor } from '../../app/utils/utils';


const startColor = '#eff3ff';
const endColor = '#08519c';


export const CheeseChart = (props: any) => {

    const {
        title,
        datasetName,
        labels,
        data,
        displayBytes,
        displayTime,
        displayBytesFromGB,
        ...other
    } = props;

    let options = {
        responsive: true,
        maintainAspectRatio: true,
        title: {
            fontFamily: 'Arial',
            fontColor: '#000',
            fontSize: 17,
            display: true,
            position: title ? 'top' : 'none',
            text: title
        }
    }
    if (displayBytes) {
        options.tooltips = {
            callbacks: {
                label: (tooltipItem, data) => {
                    var label = data.labels[tooltipItem.index];
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return label + ': ' + displayBytesForHumans(value);
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
    } else if (displayTime) {
        options.tooltips = {
            callbacks: {
                label: (tooltipItem, data) => {
                    var label = data.labels[tooltipItem.index];
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return label + ': ' + displayTimeForHumans(value);
                },
            }
        }
    } else if (datasetName) {
        options.tooltips = {
            callbacks: {
                label: (tooltipItem, data) => {
                    var label = data.labels[tooltipItem.index];
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return label + ': ' + value + ' ' + datasetName;
                },
            }
        }
    }

    const pie = {
        labels,
        datasets: [
            {
                label: datasetName,
                borderColor: '#ffffff',//data.map((_, i, arr) => Utils.lerpColor(startColor, endColor, (i+1)/arr.length)),
                backgroundColor: data.map((_, i, arr) => lerpColor(startColor, endColor, i / arr.length)),
                hoverBackgroundColor: data.map((_, i, arr) => lerpColor(startColor, endColor, i / arr.length)),
                data
            }
        ]
    };

    if(!props.hidden){
        return (
            <Pie options={options} data={pie} />
        );
    } else{
        return <></>
    }
}