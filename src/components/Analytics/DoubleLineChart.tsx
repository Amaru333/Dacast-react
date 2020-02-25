import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export const DoubleLineChart = (props: any) => {


    const {
        title,
        labels,
        data1,
        data2,
        datasetName1,
        datasetName2,
        beginAtZero,
        noDecimals,
        yAxesName,
        ...other
    } = props;

    let ticks = {
        beginAtZero,
    }
    if (noDecimals) {
        ticks.stepSize = 1,
            ticks.callback = (tickValue, index, ticks) => {
                if (!(index % parseInt(ticks.length / 5))) {
                    return tickValue;
                }
            }
    }
    let options = {
        // tooltips: {
        //     enabled: false,
        //     custom: CustomTooltips
        // },
        responsive: true,
        maintainAspectRatio: true,
        title: {
            fontFamily: 'Arial',
            fontColor: '#000',
            fontSize: 17,
            display: true,
            position: title ? 'top' : 'none',
            text: title
        },
        scales: {
            yAxes: [
                {
                    ticks,
                    scaleLabel: {
                        display: !!yAxesName,
                        labelString: yAxesName
                    }
                },
            ]
        }
    }
    let line = {
        labels,
        datasets: [
            {
                label: datasetName1,
                fill: false,
                lineTension: 0,
                backgroundColor: '#dc3912',
                borderColor: '#dc3912',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                // pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#dc3912',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                // pointHoverBackgroundColor: '#dc3912',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                stepped: true,
                data: data1,
            },
            {
                label: datasetName2,
                fill: false,
                lineTension: 0,
                backgroundColor: '#3366CC',
                borderColor: '#3366CC',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBackgroundColor: '#3366CC',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                stepped: true,
                data: data2,
            }
        ],
    };

    return (
        <Line
            {...other}
            data={line}
            options={options} />

    );

}

export default DoubleLineChart;