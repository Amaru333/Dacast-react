import * as React from 'react';
import {ProgressBarProps} from './ProgressBarTypes';
import { ProgressBarContainerStyle, ProgressBarStyle } from './ProgressBarStyle';

export const ProgressBar: React.FC<ProgressBarProps> = (props: ProgressBarProps) => {
    return (
        <ProgressBarContainerStyle {...props}>
            <ProgressBarStyle size={props.size} color={props.color} startingValue={props.startingValue} {...props}/>
        </ProgressBarContainerStyle>
    );
}