import React from 'react';
import { UsersPage } from '../../pages/Account/Users/Users';
import { User } from '../../redux-flow/store/Account/Users/types';

export const Users = () => {

    const mockUsers: User[] = [
        {userID: "8043a658-da1d-8922-0ece-4f3b5994bc08", firstName: "Jake", lastName: "Napper", email: "jake.napper@dacast.com", role: "Owner"},
        {userID: "stevejobs123", firstName: "Steve", lastName: "Jobs", email: "steve.jobs@apple.com", role: "Admin"},
        {userID: "davidbowie123", firstName: "David", lastName: "Bowie", email: "david.bowie@starman.com", role: "Creator"}
    ]

    return (
        <UsersPage users={mockUsers} />
    )
}