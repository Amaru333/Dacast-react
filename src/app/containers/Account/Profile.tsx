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
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface ProfileComponentProps {
    ProfilePageDetails: ProfilePageInfos;
    getProfilePageDetails: () => Promise<void>;
    saveProfilePageDetails: (data: ProfilePageInfos) => Promise<void>;
    saveProfilePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const Profile = (props: ProfileComponentProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getProfilePageDetails()
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    if(isFetching) {
        return <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    }
    return <ProfilePage {...props} />
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