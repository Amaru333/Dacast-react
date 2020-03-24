import * as React from 'react';
import { LoadingSpinnerProps } from './LoadingSpinnerTypes'
import { LoadingSpinnerStyle } from './LoadingSpinnerStyle'

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props: LoadingSpinnerProps) => {
    return (
        <LoadingSpinnerStyle center={props.center} size={props.size} color={props.color} />
    );
}