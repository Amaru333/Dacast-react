import React from 'react';
import styled from "styled-components"

export const InputCounter = (props: {counterValue: number, setCounterValue: React.Dispatch<React.SetStateAction<number>>, minValue?: number, maxValue?: number}) => {

    const increaseCount = () => {
        props.setCounterValue(props.counterValue + 1)
    }

    const decreaseCount = () => {
        props.setCounterValue(props.counterValue - 1)
    }

    return (
        <div style={{alignItems: "center"}} className="flex flex-row">
            <InputCounterButton disabled={props.counterValue === props.minValue} onClick={() => decreaseCount()}>-</InputCounterButton>
            <InputCounterDisplay min={props.minValue} max={props.maxValue} value={props.counterValue} disabled></InputCounterDisplay>
            <InputCounterButton disabled={props.counterValue === props.maxValue} onClick={() => increaseCount()}>+</InputCounterButton>
        </div>
    )
}

const InputCounterButton = styled.button`
    height: 16px;
    width: 16px;
    border-radius: 2px;
    background: ${props => props.disabled ? props.theme.colors['gray-6'] : props.theme.colors['violet']};
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding-bottom: 2px;
`

const InputCounterDisplay = styled.input`
    height: 24px;
    width: 43px;
    border: 1px solid #4967EE;
    margin: 0px 6px;
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    background: ${props => props.theme.colors["gray-10"]};
`