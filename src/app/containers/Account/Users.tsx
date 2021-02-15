import React from 'react';
import { UsersPage } from '../../pages/Account/Users/Users';
import { Plan } from '../../redux-flow/store/Account/Upgrade/types';
import { User } from '../../redux-flow/store/Account/Users/types';

export const Users = () => {

    const mockUsers: User[] = [
        {userID: "8043a658-da1d-8922-0ece-4f3b5994bc08", firstName: "Jake", lastName: "Napper", email: "jake.napper@dacast.com", role: "Owner"},
        {userID: "stevejobs123", firstName: "Steve", lastName: "Jobs", email: "steve.jobs@apple.com", role: "Admin"},
        {userID: "davidbowie123", firstName: "David", lastName: "Bowie", email: "david.bowie@starman.com", role: "Creator"}
    ]

    const mockPlan: Plan = {
        
            displayName: 'Annual Starter',
            planCode: 'starter-annual-uapp',
            planName: 'Annual Starter',
            state: 'active',
            playbackProtectionUnitPrice: '0.15',
            periodStartedAt: 1608039694,
            periodEndsAt: 1639575694,
            trialExpiresIn: null,
            price: 46800,
            currency: 'USD',
            paymentFrequency: 'months',
            paymentTerm: 12,
            baseSeats: 1,
            extraSeats: 4
    }

    return (
        <UsersPage users={mockUsers} plan={mockPlan} />
    )
}