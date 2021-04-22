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
import { addUserAction, cancelUserInviteAction, deleteUserAction, editUserRoleAction, filterUsersListAction, getMultiUsersDetailsAction, resendUserInviteAction, UsersAction } from '../../redux-flow/store/Account/Users/actions';
import { MultiUserDetails, User } from '../../redux-flow/store/Account/Users/types';
import { userToken } from '../../utils/services/token/tokenService';

export interface UsersComponentProps {
    billingInfo: BillingPageInfos;
    multiUserDetails: MultiUserDetails
    getBillingPageInfos: () => Promise<void>
    getMultiUsersDetails: () => Promise<void> 
    addUser: (email: string, isAdmin: boolean) => Promise<void>
    editUserRole: (user: User) => Promise<void>
    deleteUser: (userId: string, transferContentsToUserId: string, invitationId: string) => Promise<void>
    resendUserInvite: (invitationId: string) => Promise<void>
    filterUsersList: (list: User[]) => void
}

export const Users = (props: UsersComponentProps) => {

    const [noDataFetched, setNoDataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getMultiUsersDetails()
        .catch(() => setNoDataFetched(true))

        if(!props.billingInfo && userToken.getPrivilege('privilege-billing')) {
            props.getBillingPageInfos()
            .catch(() => setNoDataFetched(true))
        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }
    return (
        props.multiUserDetails ?
            <UsersPage {...props} />
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
        deleteUser: async (userId: string, transferContentsToUserId: string, invitationId: string) => {
            await dispatch(deleteUserAction({userToDelete: userId, transferContentsToUserId: transferContentsToUserId, invitationId: invitationId}));
        },
        resendUserInvite: async (invitationId: string) => {
            await dispatch(resendUserInviteAction(invitationId));
        },
        filterUsersList: async (list: User[]) => {
            await dispatch(filterUsersListAction(list));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Users);