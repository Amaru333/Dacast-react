import styled from 'styled-components';
import { DoughnutChartProps } from './DoughnutChartTypes';

export const DoughnutContainer = styled.div`
    width: 180px;
    height: 180px;
`

export const DoughnutBody = styled.div<{value: number}>`
    width: 180px;
    height: 180px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    background: ${props => props.value < 50 ? props.theme.colors["violet"] : props.theme.colors["gray-9"] };
`
export const DoughnutCentre = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: 8px;
    left: 8px;
    width: 164px;
    height: 164px;
    background: white;
`
export const Slice = styled.div<DoughnutChartProps & {degreesCalculation: any}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transform: rotate(${props => props.degreesCalculation}deg);
    transform: rotate(${props => props.degreesCalculation}deg);
    background: ${props => props.value < 50 ? props.theme.colors["gray-9"] : props.theme.colors["violet"]};

    &.firstSlice {
        clip: rect(0 180px 90px 0);
    }

    &.secondSlice {
        clip: rect(0 90px 180px 0);
    }
`