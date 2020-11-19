import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SecurityPage } from '../../pages/Settings/Security/Security';
import { SecuritySettings, DomainControl, GeoRestriction } from '../../redux-flow/store/Settings/Security/types';
import { getSettingsSecurityOptionsAction, saveSettingsSecurityOptionsAction, saveGeoRestrictionGroupAction, saveDomainControlGroupAction, deleteDomainControlGroupAction, deleteGeoRestrictionGroupAction, Action, createGeoRestrictionGroupAction, createDomainControlGroupAction } from '../../redux-flow/store/Settings/Security';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface SecurityComponentProps {
    securityDetails: SecuritySettings;
    getSettingsSecurityOptions: () => Promise<void>;
    saveSettingsSecurityOptions: (data: SecuritySettings) => Promise<void>;
    createGeoRestrictionGroup: (data: GeoRestriction) => Promise<void>;
    saveGeoRestrictionGroup: (data: GeoRestriction) => Promise<void>;
    deleteGeoRestrictionGroup: (data: GeoRestriction) => Promise<void>;
    createDomainControlGroup: (data: DomainControl) => Promise<void>;
    saveDomainControlGroup: (data: DomainControl) => Promise<void>;
    deleteDomainControlGroup: (data: DomainControl) => Promise<void>;
}

const Security = (props: SecurityComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(!props.securityDetails) {
            props.getSettingsSecurityOptions()
            .catch(() => setNodataFetched(true))

        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

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
        getSettingsSecurityOptions: async () => {
            await dispatch(getSettingsSecurityOptionsAction(undefined));
        },
        saveSettingsSecurityOptions: async (data: SecuritySettings) => {
            await dispatch(saveSettingsSecurityOptionsAction(data));
        },
        createGeoRestrictionGroup: async (data: GeoRestriction) => {
           await  dispatch(createGeoRestrictionGroupAction(data));
        },
        saveGeoRestrictionGroup: async (data: GeoRestriction) => {
            await dispatch(saveGeoRestrictionGroupAction(data));
        },
        deleteGeoRestrictionGroup: async (data: GeoRestriction) => {
            await dispatch(deleteGeoRestrictionGroupAction(data));
        },
        createDomainControlGroup: async (data: DomainControl) => {
            await dispatch(createDomainControlGroupAction(data));
        },
        saveDomainControlGroup: async (data: DomainControl) => {
            await dispatch(saveDomainControlGroupAction(data));
        },
        deleteDomainControlGroup: async (data: DomainControl) => {
            await dispatch(deleteDomainControlGroupAction(data));
        },
    };
}

   
export default  connect(mapStateToProps, mapDispatchToProps)(Security);