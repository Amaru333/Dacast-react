import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { CompanyPageInfos } from '../../redux-flow/store/Account/Company/types';
import { ThunkDispatch } from 'redux-thunk';
import { CompanyAction, getCompanyPageDetailsAction, saveCompanyPageDetailsAction, uploadCompanyLogo, getUploadLogoUrlAction, deleteCompanyLogo } from '../../redux-flow/store/Account/Company/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import {CompanyPage} from '../../pages/Account/Company/Company';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

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

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getCompanyPageDetails()
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    if(isFetching) {
        return <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    }
    return <CompanyPage {...props} />

}


export function mapStateToProps( state: ApplicationState) {
    return {
        CompanyPageDetails: state.account.company
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, CompanyAction>) {
    return {
        getCompanyPageDetails: async () => {
            await dispatch(getCompanyPageDetailsAction(undefined))
        },
        saveCompanyPageDetails: async (data: CompanyPageInfos) => {
            await dispatch(saveCompanyPageDetailsAction(data))
        },
        getLogoUrlForUploading: async () => {
            await dispatch(getUploadLogoUrlAction(undefined))
        },
        uploadCompanyLogo: async (data: File, uploadUrl: string) => {
            await dispatch(uploadCompanyLogo({data: data, uploadUrl: uploadUrl}))
        },
        deleteCompanyLogo: async () => {
            await dispatch(deleteCompanyLogo(undefined))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Company); 

