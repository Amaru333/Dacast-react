import React from 'react';
import { VodEngagementPage } from '../../pages/Videos/Engagement/Engagement';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { VodEngagementSettings } from "../../redux-flow/store/VOD/Engagement/types"
import { getVodEngagementSettingsAction, Action } from '../../redux-flow/store/VOD/Engagement/actions';

export interface VodEngagementComponentProps {
    vodEngagementSettings: VodEngagementSettings;
    getVodEngagementSettings: Function;
    // saveVodEngagementSettings: Function;
    // saveVodAd: Function;
    // createVodAd: Function;
    // deleteVodAd: Function;
    // saveVodMailCatcher: Function;
}

export const VodEngagement = (props: VodEngagementComponentProps) => {

    React.useEffect(() => {
        if(!props.vodEngagementSettings) {
            props.getVodEngagementSettings();
        }
    }, []);

    return (
        props.vodEngagementSettings ?
        <VodEngagementPage {...props} />
        : <LoadingSpinner size='medium' color='overlay70' />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        vodEngagementSettings: state.vod.engagement
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodEngagementSettings: () => {
            dispatch(getVodEngagementSettingsAction());
        }
        // saveVodEngagementSettings: (data: VodEngagementSettings) => {
        //     dispatch(saveVodEngagementSettingsAction(data))
        // },
        // saveVodAd: (data: Ad) => {
        //     dispatch(saveVodAdAction(data))
        // },
        // createVodAd: (data: Ad) => {
        //     dispatch(createVodAdAction(data))
        // },
        // deleteVodAd: (data: Ad) => {
        //     dispatch(deleteVodAdAction(data))
        // },
        // saveVodMailCatcher: (data: MailCatcher) => {
        //     dispatch(saveVodMailCatcherAction(data))
        // }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VodEngagement)