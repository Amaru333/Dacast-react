import { ThunkDispatch } from "redux-thunk"
import { AdminState } from "../redux-flow/store"
import { showToastNotification } from "../redux-flow/store/Toasts/actions"
import { Action as ReduxAction } from 'redux';

export interface Routes {
    path: string;
    name: string;
    iconName?: string;
    arrowIcon?: string;
    component?: any;
    slug?: Routes[];
    exactPath?: boolean;
    isPublic?: boolean;
    displayedInHeadertab?: boolean;
}


export const makeRoute = (name: string, path?: string, component?: any): Routes => {
    return {
        path: path,
        name: name,
        component: component
    }
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
