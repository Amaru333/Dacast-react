import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";

import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SecurityPage } from '../../../components/Pages/Settings/Security/Security';
import { SettingsSecurityDetails, DomainControl, GeoRestriction } from '../../../redux-flow/store/Settings/Security/types';
import { getSettingsSecurityOptionsAction, saveSettingsSecurityOptionsAction, saveGeoRestrictionGroupAction, saveDomainControlGroupAction, deleteDomainControlGroupAction, deleteGeoRestrictionGroupAction, Action } from '../../../redux-flow/store/Settings/Security';

interface SecurityContainerProps {
    securityDetails: SettingsSecurityDetails;
    getSettingsSecurityOptions: Function;
    saveSettingsSecurityOptions: Function;
    saveGeoRestrictionGroup: Function;
    deleteGeoRestrictionGroup: Function;
    saveDomainControlGroup: Function;
    deleteDomainControlGroup: Function;
}

const Security = (props: SecurityContainerProps) => {

    React.useEffect(() => {
        if(!props.securityDetails) {
            props.getSettingsSecurityOptions();
        }
    }, [])
    return (
        props.securityDetails ?
            <SecurityPage {...props} />
            : <LoadingSpinner color='dark-violet' size='large' />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        securityDetails: state.settings.security
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getSettingsSecurityOptions: () => {
            dispatch(getSettingsSecurityOptionsAction());
        },
        saveSettingsSecurityOptions: (data: SettingsSecurityDetails) => {
            dispatch(saveSettingsSecurityOptionsAction(data));
        },
        saveGeoRestrictionGroup: (data: GeoRestriction) => {
            dispatch(saveGeoRestrictionGroupAction(data));
        },
        deleteGeoRestrictionGroup: (data: GeoRestriction) => {
            dispatch(deleteGeoRestrictionGroupAction(data));
        },
        saveDomainControlGroup: (data: DomainControl) => {
            dispatch(saveDomainControlGroupAction(data));
        },
        deleteDomainControlGroup: (data: DomainControl) => {
            dispatch(deleteDomainControlGroupAction(data));
        },
    };
}

   
export default  connect(mapStateToProps, mapDispatchToProps)(Security);