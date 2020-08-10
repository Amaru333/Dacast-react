import * as React from 'react';
import { ProfilePageInfos, ProfileAction, getProfilePageDetailsAction, saveProfilePageDetailsAction, saveProfilePasswordAction } from '../../redux-flow/store/Account/Profile';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { ProfilePage } from '../../pages/Account/Profile/Profile';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts';

export interface ProfileComponentProps {
    ProfilePageDetails: ProfilePageInfos;
    getProfilePageDetails: () => Promise<void>;
    saveProfilePageDetails: (data: ProfilePageInfos) => Promise<void>;
    saveProfilePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const Profile = (props: ProfileComponentProps) => {

    React.useEffect(() => {
        if(!props.ProfilePageDetails) {
            props.getProfilePageDetails()
        }
    }, [])

    return (
        props.ProfilePageDetails ? 
            <ProfilePage {...props} />
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}


export function mapStateToProps( state: ApplicationState) {
    return {
        ProfilePageDetails: state.account.profile
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, ProfileAction>) {
    return {
        getProfilePageDetails: async () => {
            await dispatch(getProfilePageDetailsAction());
        },
        saveProfilePageDetails: async (data: ProfilePageInfos) => {
            await dispatch(saveProfilePageDetailsAction(data))
        },
        saveProfilePassword: async (currentPassword: string, newPassword: string) => {
            await dispatch(saveProfilePasswordAction(currentPassword, newPassword))
        },
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 