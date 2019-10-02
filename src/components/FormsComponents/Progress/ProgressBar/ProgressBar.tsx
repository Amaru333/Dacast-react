import * as React from 'react';
import {ProgressBarProps} from './ProgressBarType';
import { ProgressBarContainerStyle, ProgressBarStyle } from './ProgressBarStyle'

export const ProgressBar: React.FC<ProgressBarProps> = props => {
    return (
        <ProgressBarContainerStyle {...props}> 
            <ProgressBarStyle size={props.size} color={props.color} startingValue={props.startingValue} {...props}/>
        </ProgressBarContainerStyle>
    );
}