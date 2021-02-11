import React from 'react';
import { UsersPage } from '../../pages/Account/Users/Users';
import { User } from '../../redux-flow/store/Account/Users/types';

export const Users = () => {

    const mockUsers: User[] = [{userID: "8043a658-da1d-8922-0ece-4f3b5994bc08", firstName: "Jake", lastName: "Napper", email: "jake.napper@dacast.com", role: "Owner"}]

    return (
        <UsersPage users={mockUsers} />
    )
}