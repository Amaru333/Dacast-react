import * as React from 'react';
import { Toast } from './Toast';
import { ToastType } from './ToastTypes';
import { ToastContainer } from './ToastStyle'

type ToastsProps = StateProps & DispatchProps;

export interface StateProps {
    toasts: ToastType[];
}

export interface DispatchProps {
    hideToast: (toast: ToastType) => void;
}

export const ToastsComponent = ({ toasts, hideToast }: ToastsProps) => {
    return (
        <ToastContainer>
            { toasts.map((toast: ToastType, index) =>
                <Toast key={ index } toast={ toast } hideToast={ () => hideToast(toast) } />
            ) }
        </ToastContainer>
    );
}