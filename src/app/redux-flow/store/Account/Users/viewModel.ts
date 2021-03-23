import { GetUsersDetailsOutput, UserId } from "../../../../../DacastSdk/account";
import { capitalizeFirstLetter } from "../../../../../utils/utils";
import { MultiUserDetails, User, UserStatus } from "./types";

export const formatGetUsersDetailsOutput = (data: GetUsersDetailsOutput): MultiUserDetails => {
    let formattedData: MultiUserDetails = {
        users: data.users.map(user => {
            return {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                invitationId: user.invitationId,
                status: capitalizeFirstLetter(user.status) as UserStatus
            }
        }),
        maxSeats: data.maxSeats,
        occupiedSeats: data.occupiedSeats
    }

    return formattedData
}

export const formatPostUserOutput = (endpointResponse: UserId, dataReact: User): User => {
    let formattedData: User = {
        ...dataReact,
        userId: endpointResponse.id
    }

    return formattedData
}