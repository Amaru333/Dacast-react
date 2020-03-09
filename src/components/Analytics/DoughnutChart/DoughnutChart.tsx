import React from 'react'
import { Text } from "../../Typography/Text"

export const DoughnutChart = () => {
    return (
        <React.Fragment>
            <DoughnutBody>
                <EmptySlice></EmptySlice>
                <FilledSlice></FilledSlice>
                <DoughnutCentre>
                    <Text size={48} weight="reg"></Text>
                </DoughnutCentre>
            </DoughnutBody>
        </React.Fragment>
    )
}