import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getVodEngagementSettingsAction, Action, saveVodEngagementSettingsAction, saveVodAdAction, createVodAdAction, deleteVodAdAction } from '../../redux-flow/store/VOD/Engagement/actions';
import { Ad, ContentEngagementSettings, ContentEngagementSettingsState } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';

export interface VodEngagementComponentProps {
    vodEngagementSettings: ContentEngagementSettings;
    vodEngagementSettingsState: ContentEngagementSettingsState;
    getVodEngagementSettings: Function;
    saveVodEngagementSettings: Function;
    saveVodAd: Function;
    createVodAd: Function;
    deleteVodAd: Function;
}

export const VodEngagement = (props: VodEngagementComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.vodEngagementSettingsState[vodId])
            props.getVodEngagementSettings(vodId);
    }, []);

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.vodEngagementSettingsState[vodId] ?
                    <div className='flex flex-column'>
                        <ContentEngagementPage
                            contentEngagementSettings={props.vodEngagementSettingsState[vodId]}
                            getContentEngagementSettings={props.getVodEngagementSettings}
                            saveContentEngagementSettings={props.saveVodEngagementSettings}
                            saveContentAd={props.saveVodAd}
                            createContentAd={props.createVodAd}
                            deleteContentAd={props.deleteVodAd}
                            contentType='vod'
                            contentId={vodId}
                        />
                    </div>
                    : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        vodEngagementSettingsState: state.vod.engagement
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodEngagementSettings: (vodId: string) => {
            dispatch(getVodEngagementSettingsAction(vodId));
        },
        saveVodEngagementSettings: (data: ContentEngagementSettings, callback?: Function) => {
            dispatch(saveVodEngagementSettingsAction(data)).then(callback)
        },
        saveVodAd: (data: Ad[], adsId: string, vodId: string, callback?: Function) => {
            dispatch(saveVodAdAction(data, adsId, vodId)).then(callback)
        },
        createVodAd: (data: Ad[], adsId: string, vodId: string, callback?: Function) => {
            dispatch(createVodAdAction(data, adsId, vodId)).then(callback)
        },
        deleteVodAd: (data: Ad[], adsId: string, vodId: string) => {
            dispatch(deleteVodAdAction(data, adsId, vodId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VodEngagement)