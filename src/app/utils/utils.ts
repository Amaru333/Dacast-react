import { showToastNotification } from '../redux-flow/store/Toasts'
import { updateTitle } from '../redux-flow/store/Title/logic'
import { store } from '..';

export function updateClipboard(copiedValue: string, toastMessage: string): void {
    navigator.clipboard.writeText(copiedValue).then(function () {
        store.dispatch(showToastNotification(toastMessage, 'fixed', "success"));
    }, function () {
        store.dispatch(showToastNotification("Failed to copy to clipboard", 'fixed', "error"));
    });
}

export function updateTitleApp(title: string): void {
    store.dispatch(updateTitle(title))
}

export const parseContentType = (contentType: string) => {
    return contentType === 'live' ? 'channels' : contentType === "expos" ? contentType : contentType + 's'
}