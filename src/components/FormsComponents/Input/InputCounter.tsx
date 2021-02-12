import React from 'react';
import styled from "styled-components"
import { Input } from './Input';

export const InputCounter = () => {
    return (
        <div>
            <InputCounterButton>-</InputCounterButton>
            <InputCounterDisplay disabled></InputCounterDisplay>
        </div>
    )
}

const InputCounterButton = styled.button`
    height: 16px;
    width: 16px;
    border-radius: 2px;
    background: ${props => props.theme.colors['violet']};
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
`