export enum ActionTypes {
    GET_USERS_DETAILS = "@@account_users/GET_USERS_DETAILS",
    ADD_USER = "@@account_users/ADD_USER",
    EDIT_USER_ROLE = "@@account_users/EDIT_USER_ROLE",
    CANCEL_USER_INVITE = "@@account_users/CANCEL_USER_INVITE",
    RESEND_USER_INVITE = "@@account_users/RESEND_USER_INVITE",
    DELETE_USER = "@@account_users/DELETE_USER"
}
export type UserStatus = 'Active' | 'Invited' | 'Expired' | 'Disabled';

export type UserRole = 'Owner' | 'Admin' | 'Creator'

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    invitationId: string;
    status: UserStatus;
    name: string;
}

export interface MultiUserDetails {
    users: User[]
    maxSeats: number
    occupiedSeats: number
}

export const defaultUser: User = {
    userId: "-1",
    firstName: "",
    lastName: "",
    email: "",
    role: "Creator",
    invitationId: '',
    status: 'Expired',
    name: ''
}

export const usersInitialState: MultiUserDetails = {
    users: [],
    occupiedSeats: 0,
    maxSeats: 0
}