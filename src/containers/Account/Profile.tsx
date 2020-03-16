import * as React from 'react';
import { ProfilePageInfos, ProfileAction, getProfilePageDetailsAction, saveProfilePageDetailsAction, saveProfilePasswordAction } from '../../redux-flow/store/Account/Profile';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { ProfilePage } from '../../pages/Account/Profile/Profile';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

interface ProfileComponentProps {
    ProfileInfos: ProfilePageInfos;
    getProfilePageDetails: Function;
    saveProfilePageDetails: Function;
    saveProfilePassword: Function;
}
const Profile = (props: ProfileComponentProps) => {

    React.useEffect(() => {
        if(!props.ProfileInfos) {
            props.getProfilePageDetails();
        }
    }, [])

    return (
        props.ProfileInfos ? 
            <ProfilePage ProfilePageDetails={props.ProfileInfos} {...props} />
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}


export function mapStateToProps( state: ApplicationState) {
    return {
        ProfileInfos: state.account.profile
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, ProfileAction>) {
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