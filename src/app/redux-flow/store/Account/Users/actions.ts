import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { applyViewModel } from "../../../../utils/utils";
import { ActionTypes, User, Users } from "./types";
import { formatGetUsersDetailsOutput, formatPostUserOutput } from "./viewModel";

export interface GetUsersDetails {
    type: ActionTypes.GET_USERS_DETAILS;
    payload: User[]
}

export interface AddUser {
    type: ActionTypes.ADD_USER;
    payload: User
}

export interface EditUser {
    type: ActionTypes.EDIT_USER;
    payload: User
}

export type UsersAction = GetUsersDetails | AddUser | EditUser

export const getUsersDetailsAction = applyViewModel(dacastSdk.getUsersDetails, undefined, formatGetUsersDetailsOutput, ActionTypes.GET_USERS_DETAILS, null, 'Couldn\'t get users details')

export const addUserAction = applyViewModel(dacastSdk.postUser, undefined, formatPostUserOutput, ActionTypes.ADD_USER, 'User has been added', 'Couldn\'t add user')

export const editUserAction = applyViewModel(dacastSdk.putUser, undefined, undefined, ActionTypes.EDIT_USER, 'User has been edited', 'Couldn\'t edit user')