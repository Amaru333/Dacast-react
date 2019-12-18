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
    lastChangedPassword: string;
    timezone: string;
    marketing: boolean;
    lowData: boolean;
    upload: boolean;
    weeklyAnalytics: boolean;
    apiPingbackNotifications: boolean;
}

export const profileInitialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    lastChangedPassword: "",
    timezone: "",
    marketing: false,
    lowData: false,
    upload: false,
    weeklyAnalytics: false,
    apiPingbackNotifications: false,
}