import { ThunkDispatch } from "redux-thunk"
import { AdminState } from "../redux-flow/store"
import { showToastNotification } from "../redux-flow/store/Toasts/actions"
import { Action as ReduxAction } from 'redux';
import { Routes } from "../shared/Navigation/NavigationTypes";
import { PostImpersonateAccountInput, PostImpersonateAccountOutput } from "../../DacastSdk/admin";
import { store } from "..";
import { isMultiUserToken } from "../../DacastSdk/session";


export const makeRoute = (name: string, path?: string, component?: any): Routes => {
    return {
        path: path,
        name: name,
        component: component
    }
}

export function updateClipboard(copiedValue: string, toastMessage: string): void {
    navigator.clipboard.writeText(copiedValue).then(function () {
        store.dispatch(showToastNotification(toastMessage, 'fixed', "success"));
    }, function () {
        store.dispatch(showToastNotification("Failed to copy to clipboard", 'fixed', "error"));
    });
}

export const formatPostImpersonateInput = (data: string): PostImpersonateAccountInput => {
    let formattedData: PostImpersonateAccountInput = {
        userIdentifier: data.replace(/,/g, '').trim()
    }
    return formattedData
}

export const formatPostImpersonateOutput = (data: PostImpersonateAccountOutput, userIdentifier: string) => {
    let str = '?' + Object.keys(data).reduce(function(a, k){
        a.push(k + '=' + encodeURIComponent(data[k]));
        return a;
    }, []).join('&');
    let appPage = '/impersonate'
    if(isMultiUserToken(data)) {
        appPage = '/selectAccount'
    }
    Object.assign(document.createElement('a'), { target: '_blank', href: `${process.env.APP_DOMAIN}${appPage}${str}&identifier=${userIdentifier}`}).click();
}

export function applyAdminViewModel<ActionPayload, ReactOut, SdkIn, SdkOut>(
    sdkFunction: (data: SdkIn, id?: string) => Promise<SdkOut>,
    inputFormatter: undefined | ((data: ReactOut) => SdkIn), 
    outputFormatter: undefined | ((responseSdk: SdkOut, dataReact?: ReactOut) => ActionPayload), 
    action: string, 
    successMsg: string, 
    errorMsg: string): (data: ReactOut, id?: string) => (dispatch: ThunkDispatch<AdminState, void, ReduxAction<string> & {payload: ActionPayload | ReactOut}>) => Promise<void> {
    return (data, id) => async (dispatch) => {
        try {
            let response = await sdkFunction((inputFormatter ? inputFormatter(data) : null), id)
            dispatch({ type: action, payload: outputFormatter ? outputFormatter(response, data) : data })
            if (successMsg) {
                dispatch(showToastNotification(successMsg, 'fixed', "success"));
            }
        } catch(e) {
            dispatch(showToastNotification(errorMsg, "fixed", "error"));
            return Promise.reject(e)
        }
    }
}
