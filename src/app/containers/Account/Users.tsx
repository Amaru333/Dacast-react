import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { UsersPage } from '../../pages/Account/Users/Users';
import { ApplicationState } from '../../redux-flow/store';
import { getBillingPageInfosAction } from '../../redux-flow/store/Account/Plan/actions';
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan/types';
import { UpgradeAction } from '../../redux-flow/store/Account/Upgrade/actions';
import { Plan } from '../../redux-flow/store/Account/Upgrade/types';
import { addUserAction, cancelUserInviteAction, deleteUserAction, editUserRoleAction, getMultiUsersDetailsAction, resendUserInviteAction, UsersAction } from '../../redux-flow/store/Account/Users/actions';
import { MultiUserDetails, User } from '../../redux-flow/store/Account/Users/types';

export interface UsersComponentProps {
    billingInfo: BillingPageInfos;
    getBillingPageInfos: () => Promise<void>
    getMultiUsersDetails: () => Promise<void> 
    addUser: (email: string, isAdmin: boolean) => Promise<void>
    editUserRole: (user: User) => Promise<void>
    deleteUser: (userId: string, transferContentsToUserId: string) => Promise<void>
    cancelUserInvite: (user: User) => Promise<void>
    resendUserInvite: (user: User) => Promise<void>
    multiUserDetails: MultiUserDetails
    plan?: Plan
}

export const Users = (props: UsersComponentProps) => {

    const [noDataFetched, setNoDataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getMultiUsersDetails()
        .catch(() => setNoDataFetched(true))

        if(!props.billingInfo) {
            props.getBillingPageInfos()
            .catch(() => noDataFetched)
        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }
    return (
        (props.multiUserDetails && props.billingInfo) ?
            <UsersPage {...props} plan={props.billingInfo} />
        :
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        billingInfo: state.account.plan,
        multiUserDetails: state.account.multiUsers
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, UsersAction | UpgradeAction>) {
    return {
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        },
        getMultiUsersDetails: async () => {
            await dispatch(getMultiUsersDetailsAction(undefined));
        },
        addUser: async (email: string, isAdmin: boolean) => {
            await dispatch(addUserAction({email: email, isAdmin: isAdmin}));
        },
        editUserRole: async (user: User) => {
            await dispatch(editUserRoleAction(user));
        },
        deleteUser: async (userId: string, transferContentsToUserId: string) => {
            await dispatch(deleteUserAction({userToDelete: userId, transferContentsToUserId: transferContentsToUserId}));
        },
        cancelUserInvite: async (user: User) => {
            await dispatch(cancelUserInviteAction(user));
        },
        resendUserInvite: async (user: User) => {
            await dispatch(resendUserInviteAction(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Users);