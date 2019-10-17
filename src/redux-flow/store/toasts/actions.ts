import { ActionTypes} from "./types";
import { ToastType, Size, NotificationType } from '../../../components/Toast/ToastTypes'

export interface ToastHideAction {
    type: ActionTypes.SHOW_TOAST | ActionTypes.HIDE_TOAST;
    payload: {toast: ToastType};
}

export interface ToastShowAction {
    type: ActionTypes.SHOW_TOAST | ActionTypes.HIDE_TOAST;
    payload: {toast: ToastType};
}

const showToast = (text: string, size: Size, notificationType: NotificationType) => ({
    type: ActionTypes.SHOW_TOAST,
    payload: {
        toast: {
            timestamp: Date.now(),
            text,
            size,
            notificationType  
        }
    }
});
  
export const hideToast = (toast: ToastType): Action => ({
    type: ActionTypes.HIDE_TOAST,
    payload: {toast} 
});
  
export const showToastNotification = (text: string, size: Size, notificationType: NotificationType) => (dispatch: any): void => {
    const toastAction = showToast(text, size, notificationType);
    dispatch(showToast(text, size, notificationType));
    setTimeout(() => dispatch(hideToast(toastAction.payload.toast)), 3500);
};

export type Action = ToastHideAction | ToastShowAction

