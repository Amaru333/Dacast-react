export enum ActionTypes {
    GET_USERS_DETAILS = "@@account_users/GET_USERS_DETAILS",
    ADD_USER = "@@account_users/ADD_USER",
    EDIT_USER = "@@account_users/EDIT_USER"
}

export interface User {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface Users {
    users: User[]
}

export const defaultUser = {
    userID: "-1",
    firstName: "",
    lastName: "",
    email: "",
    role: "Creator"
}

export const usersInitialState: Users = {
    users: []
}