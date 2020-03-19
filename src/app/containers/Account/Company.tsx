import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { CompanyPageInfos } from '../../redux-flow/store/Account/Company/types';
import { ThunkDispatch } from 'redux-thunk';
import { CompanyAction, getCompanyPageDetailsAction, saveCompanyPageDetailsAction, uploadCompanyLogo, getUploadLogoUrlAction, getCompanyPageLogoUrlAction } from '../../redux-flow/store/Account/Company/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import {CompanyPage} from '../../pages/Account/Company/Company';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

interface CompanyContainerProps {
    CompanyInfos: CompanyPageInfos;
    getCompanyPageDetails: Function;
    saveCompanyPageDetails: Function;
    getLogoUrlForUploading: Function;
    uploadCompanyLogo: Function;
    getCompanyPageLogoUrl: Function;
}
const Company = (props: CompanyContainerProps) => {

    /** Fetching data using redux and services */
    React.useEffect( () => {
        if(!props.CompanyInfos) {
            props.getCompanyPageDetails();
            props.getCompanyPageLogoUrl()
        }

    }, [])

    return (
        props.CompanyInfos ? 
            <CompanyPage CompanyPageDetails={props.CompanyInfos} {...props} />
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )

}


export function mapStateToProps( state: ApplicationState) {
    return {
        CompanyInfos: state.account.company
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, CompanyAction>) {
    return {
        getCompanyPageDetails: () => {
            dispatch(getCompanyPageDetailsAction());
        },
        getCompanyPageLogoUrl: () => {
            dispatch(getCompanyPageLogoUrlAction());
        },
        saveCompanyPageDetails: (data: CompanyPageInfos) => {
            dispatch(saveCompanyPageDetailsAction(data));
        },
        getLogoUrlForUploading: () => {
            dispatch(getUploadLogoUrlAction());
        },
        uploadCompanyLogo: (data: File, uploadUrl: string) => {
            dispatch(uploadCompanyLogo(data, uploadUrl));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Company); 

