import { DeleteUserInput, GetUsersDetailsOutput, PostUserInput, PostUserRoleInput, UserEndpoint, UserRoleWhitoutOwner } from "../../../../../DacastSdk/account";
import { capitalizeFirstLetter } from "../../../../../utils/utils";
import { MultiUserDetails, User, UserRole, UserStatus } from "./types";

export const formatGetUsersDetailsOutput = (data: GetUsersDetailsOutput): MultiUserDetails => {

    let users: User[] = data.users.filter(user => user.status !== 'disabled').map(user => {
        let fullName = ''
        if(user.firstName) {
            fullName = user.firstName
        }

        if(user.lastName) {
            fullName += ' ' + user.lastName
        }
        return {
            userId: user.userId,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            role: capitalizeFirstLetter(user.role) as UserRole,
            invitationId: user.invitationId,
            status: capitalizeFirstLetter(user.status) as UserStatus,
            name: fullName
        }
    })
    let formattedData: MultiUserDetails = {
        users: users,
        filteredUsers: users,
        maxSeats: data.maxSeats || 0,
        occupiedSeats: data.occupiedSeats || 0
    }

    return formattedData
}

export const formatPostUserInput = (data: {email: string; isAdmin: boolean}): PostUserInput => {
    let formattedData: PostUserInput = {
        email: data.email,
        isAdmin: data.isAdmin
    }

    return formattedData
}

export const formatPostUserOutput = (endpointResponse: UserEndpoint, dataReact: {email: string; isAdmin: boolean}): User => {
    let formattedData: User = {
        userId: endpointResponse.userId,
        email: dataReact.email,
        role: dataReact.isAdmin ? 'Admin' : 'Creator',
        status: 'Invited',
        firstName: '',
        lastName: '',
        invitationId: endpointResponse.invitationId,
        name: ''
    }
    
    return formattedData
}

export const formatPostUserRoleInput = (data: User): PostUserRoleInput => {
    let formattedData: PostUserRoleInput = {
        id: data.userId,
        payload: {
            role: data.role.toLowerCase() as UserRoleWhitoutOwner
        }
    }

    return formattedData
}

export const formatPostUserRoleOutput = (endpointResponse: null, dataReact: User): User => dataReact
export const formatPostCancelUserInviteOutput = (endpointResponse: null, dataReact: string): string => dataReact
export const formatPostResendUserInviteOutput = formatPostCancelUserInviteOutput

export const formatPostCancelUserInviteInput = (invitationId: string): string => invitationId
export const formatPostResendUserInviteInput = formatPostCancelUserInviteInput

export const formatDeleteUserInput = (data: {userToDelete: string; transferContentsToUserId: string, invitationId: string}): DeleteUserInput => {
    let formattedData: DeleteUserInput = {
        id: data.userToDelete,
        payload: {
            transferContentsToUserId: data.transferContentsToUserId,
            invitationId: data.invitationId
        }
    }

    return formattedData
}

export const formatDeleteUserOutput = (endpointResponse: null, dataReact: {userToDelete: string; transferContentsToUserId: string}): string => dataReact.userToDelete

export const formatPostUserRequestError = (error: any) => {
    if(error.detail.indexOf("user with this email is already registered") !== -1) {
        return "User with this email is already registered"
    }

    if(error.detail.indexOf("user with this email was already invited") !== -1) {
        return "User with this email was already invited"
    }

    return "Couldn\'t invite user"
}