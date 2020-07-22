export enum ActionTypes {
    GET_PROFILE_PAGE_DETAILS = "@@account_profile/GET_PROFILE_PAGE_DETAILS",
    SAVE_PROFILE_PAGE_DETAILS ="@@account_profile/SAVE_PROFILE_PAGE_DETAILS",
    SAVE_PROFILE_PASSWORD ="@@account_profile/SAVE_PROFILE_PASSWORD"
}

export interface ProfilePageInfos {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    newEmail?: string;
    passwordLastChanged: number;
    timezone: string;
    marketing: boolean;
    lowData: boolean;
    videoUpload: boolean;
}

export const profileInitialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    passwordLastChanged: 0,
    timezone: "",
    marketing: false,
    lowData: false,
    videoUpload: false
}