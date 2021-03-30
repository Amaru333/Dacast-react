import { DeleteUserInput, GetUsersDetailsOutput, PostUserInput, PostUserRoleInput, UserId, UserRoleWhitoutOwner } from "../../../../../DacastSdk/account";
import { capitalizeFirstLetter } from "../../../../../utils/utils";
import { MultiUserDetails, User, UserRole, UserStatus } from "./types";

export const formatGetUsersDetailsOutput = (data: GetUsersDetailsOutput): MultiUserDetails => {
    let formattedData: MultiUserDetails = {
        users: data.users.map(user => {
            return {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: capitalizeFirstLetter(user.role) as UserRole,
                invitationId: user.invitationId,
                status: capitalizeFirstLetter(user.status) as UserStatus
            }
        }),
        maxSeats: data.maxSeats || data.occupiedSeats,
        occupiedSeats: data.occupiedSeats
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

export const formatPostUserOutput = (endpointResponse: null, dataReact: {email: string; isAdmin: boolean}): User => {
    let formattedData: User = {
        email: dataReact.email,
        role: dataReact.isAdmin ? 'Admin' : 'Creator',
        status: 'Invited',
        firstName: null,
        lastName: null,
        invitationId: null,
        userId: null
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
export const formatPostCancelUserInviteOutput = formatPostUserRoleOutput
export const formatPostResendUserInviteOutput = formatPostUserRoleOutput

export const formatPostCancelUserInviteInput = (user: User): string => user.invitationId
export const formatPostResendUserInviteInput = formatPostCancelUserInviteInput

export const formatDeleteUserInput = (data: {userToDelete: string; transferContentsToUserId: string}): DeleteUserInput => {
    let formattedData: DeleteUserInput = {
        id: data.userToDelete,
        payload: {
            transferContentsToUserId: data.transferContentsToUserId
        }
    }

    return formattedData
}