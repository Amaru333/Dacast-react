import React from 'react';
import { ChartComponentProps, Doughnut, Pie } from 'react-chartjs-2';
import { randDarkColor } from '../../utils/utils';


interface PieChartProps {
    type?: 'pie' | 'doughnut',
    data: number[],
    labels: string[],
    title: string,
    dataLabel: string
}

export const PieChart = (props: PieChartProps) => {

    const pieProps: ChartComponentProps = {
        data: {
            labels: props.labels,
            datasets: [{ 
                label: props.dataLabel,
                data: props.data,
                //Change that at one point but for now this component is useless
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]
            }]
        },
        options: {
            title: {
                display: true,
                text: props.title
            }
        }
    }

    if(props.type === "doughnut") {
        return (
            <Doughnut
                {...pieProps}
            />
    
        );
    
    } else {
        return (
            <Pie
                {...pieProps}
            />
    
        );
    }
}

PieChart.defaultProps = { type: 'pie' }