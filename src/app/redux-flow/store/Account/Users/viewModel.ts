import { GetUsersDetailsOutput, UserId } from "../../../../../DacastSdk/account";
import { User } from "./types";

export const formatGetUsersDetailsOutput = (data: GetUsersDetailsOutput): User[] => {
    let formattedData: User[] = data.users

    return formattedData
}

export const formatPostUserOutput = (endpointResponse: UserId, dataReact: User): User => {
    let formattedData: User = {
        ...dataReact,
        userID: endpointResponse.id
    }

    return formattedData
}