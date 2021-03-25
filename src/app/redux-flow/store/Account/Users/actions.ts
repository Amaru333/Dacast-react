import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { applyViewModel } from "../../../../utils/utils";
import { ActionTypes, MultiUserDetails, User } from "./types";
import { formatGetUsersDetailsOutput, formatPostCancelUserInviteInput, formatPostCancelUserInviteOutput, formatPostResendUserInviteInput, formatPostResendUserInviteOutput, formatPostUserInput, formatPostUserOutput, formatPostUserRoleInput, formatPostUserRoleOutput } from "./viewModel";

export interface GetUsersDetails {
    type: ActionTypes.GET_USERS_DETAILS;
    payload: MultiUserDetails
}

export interface AddUser {
    type: ActionTypes.ADD_USER;
    payload: User
}

export interface EditUserRole {
    type: ActionTypes.EDIT_USER_ROLE;
    payload: User
}

export interface CancelUserInvite {
    type: ActionTypes.CANCEL_USER_INVITE;
    payload: User
}

export interface ResendUserInvite {
    type: ActionTypes.RESEND_USER_INVITE;
    payload: User
}

export type UsersAction = GetUsersDetails | AddUser | EditUserRole | CancelUserInvite | ResendUserInvite

export const getMultiUsersDetailsAction = applyViewModel(dacastSdk.getUsersDetails, undefined, formatGetUsersDetailsOutput, ActionTypes.GET_USERS_DETAILS, null, 'Couldn\'t get users details')
export const addUserAction = applyViewModel(dacastSdk.postUser, formatPostUserInput, formatPostUserOutput, ActionTypes.ADD_USER, 'User has been invited', 'Couldn\'t invite user')
export const editUserRoleAction = applyViewModel(dacastSdk.postUserRole, formatPostUserRoleInput, formatPostUserRoleOutput, ActionTypes.EDIT_USER_ROLE, 'User role has been edited', 'Couldn\'t edit user role')
export const cancelUserInviteAction = applyViewModel(dacastSdk.postCancelUserInvite, formatPostCancelUserInviteInput, formatPostCancelUserInviteOutput, ActionTypes.CANCEL_USER_INVITE, 'User invitation has been cancelled', 'Couldn\'t cancel user invitation')
export const resendUserInviteAction = applyViewModel(dacastSdk.postResendUserInvite, formatPostResendUserInviteInput, formatPostResendUserInviteOutput, ActionTypes.RESEND_USER_INVITE, 'User invite has been resent', 'Couldn\'t rensend user invite')