import { ActionTypes, ProfilePageInfos } from './types';
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetProfileDetailsOutput, formatPutProfileDetailsInput, formatPostUserPasswordInput } from './viewModel';

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

export type ProfileAction = GetProfilePageDetails | SaveProfilePageDetails | SaveProfilePassword

export const getProfilePageDetailsAction = applyViewModel(dacastSdk.getProfileDetails, undefined, formatGetProfileDetailsOutput, ActionTypes.GET_PROFILE_PAGE_DETAILS, null, 'Couldn\'t get profile details')
export const saveProfilePageDetailsAction = applyViewModel(dacastSdk.putProfileDetails, formatPutProfileDetailsInput, undefined, ActionTypes.GET_PROFILE_PAGE_DETAILS, 'Changes have been saved', 'Couldn\'t save changes')
export const saveProfilePasswordAction = applyViewModel(dacastSdk.postUserPassword, formatPostUserPasswordInput, undefined, ActionTypes.SAVE_PROFILE_PASSWORD, 'Password saved', null)
