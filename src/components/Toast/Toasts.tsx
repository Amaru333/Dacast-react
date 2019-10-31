import * as React from 'react';
import { Toast } from './Toast';
import { ToastType, Size, NotificationType } from './ToastTypes';
import { ToastContainer } from './ToastStyle'

type ToastsProps = ToastStateProps & DispatchToastProps;

export interface ToastStateProps {
    toasts: ToastType[];
}

export interface DispatchToastProps {
    hideToast: (toast: ToastType) => void;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
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