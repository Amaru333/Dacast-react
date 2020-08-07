import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { CompanyPageInfos } from '../../redux-flow/store/Account/Company/types';
import { ThunkDispatch } from 'redux-thunk';
import { CompanyAction, getCompanyPageDetailsAction, saveCompanyPageDetailsAction, uploadCompanyLogo, getUploadLogoUrlAction, getCompanyPageLogoUrlAction, deleteCompanyLogo } from '../../redux-flow/store/Account/Company/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import {CompanyPage} from '../../pages/Account/Company/Company';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';

export interface CompanyComponentProps {
    CompanyPageDetails: CompanyPageInfos;
    getCompanyPageDetails: () => Promise<void>;
    saveCompanyPageDetails: (data: CompanyPageInfos) => Promise<void>;
    getLogoUrlForUploading: () => Promise<void>;
    uploadCompanyLogo: (data: File, uploadUrl: string) => Promise<void>;
    deleteCompanyLogo: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}
const Company = (props: CompanyComponentProps) => {

    /** Fetching data using redux and services */
    React.useEffect( () => {
        if(!props.CompanyPageDetails) {
            props.getCompanyPageDetails()
        }

    }, [])

    return (
        props.CompanyPageDetails ? 
            <CompanyPage {...props} />
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )

}


export function mapStateToProps( state: ApplicationState) {
    return {
        CompanyPageDetails: state.account.company
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, CompanyAction>) {
    return {
        getCompanyPageDetails: async () => {
            await dispatch(getCompanyPageDetailsAction())
        },
        saveCompanyPageDetails: async (data: CompanyPageInfos) => {
            await dispatch(saveCompanyPageDetailsAction(data))
        },
        getLogoUrlForUploading: async () => {
            await dispatch(getUploadLogoUrlAction())
        },
        uploadCompanyLogo: async (data: File, uploadUrl: string) => {
            await dispatch(uploadCompanyLogo(data, uploadUrl))
        },
        deleteCompanyLogo: async () => {
            await dispatch(deleteCompanyLogo())
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Company); 

