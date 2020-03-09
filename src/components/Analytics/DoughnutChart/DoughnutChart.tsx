import React from 'react'
import { Text } from "../../Typography/Text"
import { DoughnutBody, DoughnutContainer, DoughnutCentre, Slice } from './DoughnutChartStyle';
import { DoughnutChartProps } from './DoughnutChartTypes';

export const DoughnutChart = (props: DoughnutChartProps) => {

    const firstDegreesCalculation = () => {
        if (props.value >= 50) {
            return 90
        } else {
            return props.value/100*360+90
        }
    }

    const secondDegreesCalculation = () => {
        if (props.value >= 50) {
            return props.value/100*360
        } else {
            return 0
        }
    }

    return (
        <React.Fragment>
            <DoughnutContainer>
                <DoughnutBody value={props.value}>
                    <Slice className="firstSlice" {...props} degreesCalculation={() => firstDegreesCalculation()}></Slice>
                    <Slice className="secondSlice" {...props} degreesCalculation={() => secondDegreesCalculation()}></Slice>
                    <DoughnutCentre>
                        <Text size={48} weight="reg">{props.value}%</Text>
                    </DoughnutCentre>
                </DoughnutBody>
            </DoughnutContainer> 
        </React.Fragment>
    )
}