import * as React from 'react';
import { ProfilePageInfos, AccountAction, getProfilePageDetailsAction, saveProfilePageDetailsAction, saveProfilePasswordAction, AccountInfos } from '../../redux-flow/store/Account';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { ProfilePage } from '../../components/Pages/Account/Profile';

interface ProfileComponentProps {
    AccountDetails: AccountInfos;
    getProfilePageDetails: Function;
    saveProfilePageDetails: Function;
    saveProfilePassword: Function;
}
const Profile = (props: ProfileComponentProps) => {

    React.useEffect( () => {
        if(typeof props.AccountDetails.profilePage === 'undefined') {
            props.getProfilePageDetails();
        }
    }, [])

    return (
        typeof props.AccountDetails.profilePage !== 'undefined' ? 
            <ProfilePage ProfilePageDetails={props.AccountDetails.profilePage} {...props} />
            : 
            <LoadingSpinner size='large' color='dark-violet' />
    )
}




export function mapStateToProps( state: ApplicationState) {
    return {
        AccountDetails: state.account.data
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AccountAction>) {
    return {
        getProfilePageDetails: () => {
            dispatch(getProfilePageDetailsAction());
        },
        saveProfilePageDetails: (data: ProfilePageInfos) => {
            dispatch(saveProfilePageDetailsAction(data));
        },
        saveProfilePassword: (data: string) => {
            dispatch(saveProfilePasswordAction(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 