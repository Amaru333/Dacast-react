import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SecurityPage } from '../../pages/Settings/Security/Security';
import { SettingsSecurityDetails, DomainControl, GeoRestriction } from '../../redux-flow/store/Settings/Security/types';
import { getSettingsSecurityOptionsAction, saveSettingsSecurityOptionsAction, saveGeoRestrictionGroupAction, saveDomainControlGroupAction, deleteDomainControlGroupAction, deleteGeoRestrictionGroupAction, Action, createGeoRestrictionGroupAction, createDomainControlGroupAction } from '../../redux-flow/store/Settings/Security';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface SecurityComponentProps {
    securityDetails: SettingsSecurityDetails;
    getSettingsSecurityOptions: Function;
    saveSettingsSecurityOptions: Function;
    createGeoRestrictionGroup: Function;
    saveGeoRestrictionGroup: Function;
    deleteGeoRestrictionGroup: Function;
    createDomainControlGroup: Function;
    saveDomainControlGroup: Function;
    deleteDomainControlGroup: Function;
}

const Security = (props: SecurityComponentProps) => {

    React.useEffect(() => {
        if(!props.securityDetails) {
            props.getSettingsSecurityOptions();
        }
    }, [])
    return (
        props.securityDetails ?
            <SecurityPage {...props} />
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
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
        saveSettingsSecurityOptions: (data: SettingsSecurityDetails, callback?: Function) => {
            dispatch(saveSettingsSecurityOptionsAction(data)).then(callback);
        },
        createGeoRestrictionGroup: (data: GeoRestriction) => {
            dispatch(createGeoRestrictionGroupAction(data));
        },
        saveGeoRestrictionGroup: (data: GeoRestriction) => {
            dispatch(saveGeoRestrictionGroupAction(data));
        },
        deleteGeoRestrictionGroup: (data: GeoRestriction) => {
            dispatch(deleteGeoRestrictionGroupAction(data));
        },
        createDomainControlGroup: (data: DomainControl) => {
            dispatch(createDomainControlGroupAction(data));
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