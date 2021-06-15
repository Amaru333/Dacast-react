import { ActionTypes} from "./types";
import { ToastType, Size, NotificationType, NotificationPosition } from '../../../../components/Toast/ToastTypes'

export interface ToastHideAction {
    type: ActionTypes.SHOW_TOAST | ActionTypes.HIDE_TOAST;
    payload: {toast: ToastType};
}

export interface ToastShowAction {
    type: ActionTypes.SHOW_TOAST | ActionTypes.HIDE_TOAST;
    payload: {toast: ToastType};
}

const showToast = (text: string, size: Size, notificationType: NotificationType, permanent?: boolean, position?: NotificationPosition): ToastAction => ({
    type: ActionTypes.SHOW_TOAST,
    payload: {
        toast: {
            timestamp: Date.now(),
            text,
            size,
            notificationType,
            permanent,
            position
        }
    }
});

export const hideToast = (toast: ToastType): ToastAction => ({
    type: ActionTypes.HIDE_TOAST,
    payload: {toast}
});

export const showToastNotification = (text: string, size: Size, notificationType: NotificationType, permanent?: boolean, position?: NotificationPosition) => (dispatch: React.Dispatch<ToastAction>): ToastType => {
    const toastAction = showToast(text, size, notificationType, permanent, position);
    dispatch(showToast(text, size, notificationType, permanent, position));
    if (!permanent) {
        setTimeout(() => dispatch(hideToast(toastAction.payload.toast)), 3500);
    }
    return toastAction.payload.toast
};

export type ToastAction = ToastHideAction | ToastShowAction

