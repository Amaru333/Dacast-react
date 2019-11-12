import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { CompanyPageInfos, AccountInfos } from '../../redux-flow/store/Account/types';
import { ThunkDispatch } from 'redux-thunk';
import { AccountAction, getCompanyPageDetailsAction, saveCompanyPageDetailsAction, uploadCompanyLogo, getUploadLogoUrl } from '../../redux-flow/store/Account/actions';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import {CompanyPage} from '../../components/Pages/Account/Company';

interface AccountComponentProps {
    AccountDetails: AccountInfos;
    getCompanyPageDetails: Function;
    saveCompanyPageDetails: Function;
    getUploadLogoUrl: Function;
    uploadCompanyLogo: Function;
}
const Company = (props: AccountComponentProps) => {

    /** Fetching data using redux and services */
    React.useEffect( () => {
        props.getCompanyPageDetails();
    }, [])

    return (
        props.AccountDetails ? 
            <CompanyPage {...props} />
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
        getCompanyPageDetails: () => {
            dispatch(getCompanyPageDetailsAction());
        },
        saveCompanyPageDetails: (data: CompanyPageInfos) => {
            dispatch(saveCompanyPageDetailsAction(data));
        },
        getLogoUrlForUploading: () => {
            dispatch(getUploadLogoUrl());
        },
        uploadCompanyLogo: (data: File, uploadUrl: string) => {
            dispatch(uploadCompanyLogo(data, uploadUrl));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Company); 

