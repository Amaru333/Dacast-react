import { ActionTypes, ProfilePageInfos } from './types';
import { ProfileServices } from './services';
import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';

export interface GetProfilePageDetails {
    type: ActionTypes.GET_PROFILE_PAGE_DETAILS;
    payload: ProfilePageInfos;
}

export interface SaveProfilePageDetails {
    type: ActionTypes.SAVE_PROFILE_PAGE_DETAILS;
    payload: ProfilePageInfos;
}

export interface SaveProfilePassword {
    type: ActionTypes.SAVE_PROFILE_PASSWORD;
    payload: string;
}


export const getProfilePageDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetProfilePageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetProfilePageDetails> ) => {
        await ProfileServices.getProfilePageDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PROFILE_PAGE_DETAILS, payload: response.data.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveProfilePageDetailsAction = (data: ProfilePageInfos): ThunkDispatch<Promise<void>, {}, SaveProfilePageDetails> => {
    console.log('reaching the action')
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveProfilePageDetails> ) => {
        await ProfileServices.saveProfilePageDetailsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PROFILE_PAGE_DETAILS, payload: response.data} );
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'flexible', "error"));
            })
    };
}

export const saveProfilePasswordAction = (data: string): ThunkDispatch<Promise<void>, {}, SaveProfilePassword> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveProfilePassword> ) => {
        await ProfileServices.saveProfilePasswordService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PROFILE_PASSWORD, payload: response.data} );
                dispatch(showToastNotification("Password has been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type ProfileAction = 
GetProfilePageDetails
| SaveProfilePageDetails
| SaveProfilePassword