import React from 'react';
import { VodSecurityPage } from '../../../components/Pages/VOD/Security/Security';
import { ApplicationState } from '../../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodSecuritySettingsAction } from '../../../redux-flow/store/VOD/Security/actions';
import { connect } from 'react-redux';
import { VodSecuritySettings } from '../../../redux-flow/store/VOD/Security';

interface VodSecurityContainerProps {
    vodSecuritySettings: VodSecuritySettings;
    getVodSecuritySettings: Function
}

export const VodSecurity = (props: VodSecurityContainerProps) => {
    return (
        <VodSecurityPage />
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        vodSecuritySettings: state.vod.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodSecuritySettings: () => {
            dispatch(getVodSecuritySettingsAction());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodSecurity);