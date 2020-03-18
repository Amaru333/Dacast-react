import { showToastNotification } from '../redux-flow/store/Toasts'
import { updateTitle } from '../redux-flow/store/Title/logic'
import { store } from '..';

export function updateClipboard(newClip: string): void {
    navigator.clipboard.writeText(newClip).then(function () {
        store.dispatch(showToastNotification("Copy in clipboard", 'fixed', "success"));
    }, function () {
        store.dispatch(showToastNotification("Failed to copy in clipboard", 'fixed', "error"));
    });
}

export function updateTitleApp(title: string): void {
    store.dispatch(updateTitle(title))
}