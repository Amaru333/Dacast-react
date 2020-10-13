import { ActionTypes, ContentSetupState, ContentSetupObject} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ContentSetupServices } from './services';
import { parseContentType } from '../../../../utils/utils';

export interface GetContentSetup {
    type: ActionTypes.GET_CONTENT_SETUP;
    payload: {contentId: string; contentType: string; data: ContentSetupObject};
}

export interface PostContentSetup {
    type: ActionTypes.POST_CONTENT_SETUP;
    payload:  {contentId: string; contentType: string; data: ContentSetupObject};
}

export const getContentSetupAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentSetup> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentSetup>) => {
        await ContentSetupServices.getContentSetupAction(contentId, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.GET_CONTENT_SETUP, payload: {contentId: contentId, contentType: contentType, data: contentType == "expo" ? response.data :  response.data.data} });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const postContentSetupAction = (data: ContentSetupObject, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, PostContentSetup> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, PostContentSetup>) => {
        await ContentSetupServices.postContentSetupAction(data, contentId, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.POST_CONTENT_SETUP, payload: {contentId: contentId, contentType: contentType, data: data} });
                dispatch(showToastNotification("Content saved", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type Action = GetContentSetup | PostContentSetup