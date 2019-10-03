import * as React from 'react';
import { LoadingSpinnerProps } from './LoadingSpinnerTypes'
import { LoadingSpinnerStyle } from './LoadingSpinnerStyle'

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = props => {
    return (
        <LoadingSpinnerStyle size={props.size} color={props.color} />
    );
}