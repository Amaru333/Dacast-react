import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { UsersPage } from '../../pages/Account/Users/Users';
import { ApplicationState } from '../../redux-flow/store';
import { getBillingPageInfosAction } from '../../redux-flow/store/Account/Plan/actions';
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan/types';
import { UpgradeAction } from '../../redux-flow/store/Account/Upgrade/actions';
import { Plan } from '../../redux-flow/store/Account/Upgrade/types';
import { User } from '../../redux-flow/store/Account/Users/types';

export interface UsersContainerProps {
    billingInfos: BillingPageInfos;
    getBillingPageInfos: () => Promise<void>
}

export const Users = (props: UsersContainerProps) => {

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
        
            props.billingInfos ?
                <UsersPage users={mockUsers} plan={mockPlan} billingInfo={props.billingInfos} />
            :
                <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
        
        
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        billingInfos: state.account.plan
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, UpgradeAction>) {
    return {
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Users);