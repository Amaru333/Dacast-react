import * as React from 'react';
import { VodDashboard } from './VodDashboard';
import { PaywallDashboard } from './PaywallDashboard';
import { LiveDashboard } from './LiveDashboard';
import { GeneralDashboard } from './GeneralDashboard';
import { TrialAdditionalDashboard } from './TrialAdditionalDashboard';
import { DashboardInfos, Action, getDashboardDetailsAction, getDashboardVodPlayRateAction, getDashboardVodPlayAction, getDashboardLiveViewers, getDashboardLiveTopChannels, getDashboardVodTopVideosAction, getDashboardVodImpressionsAction } from '../../redux-flow/store/Dashboard';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from "react-redux";
import styled from 'styled-components';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getBillingPageInfosAction, BillingPageInfos } from '../../redux-flow/store/Account/Plan';

export interface DashboardProps {
    infos: DashboardInfos;
    billingInfos: BillingPageInfos;
    getDashboardDetails: Function;
    getDashboardVodPlayRate: Function;
    getDashboardVodPlay: Function;
    getDashboardLiveViewers: Function;
    getDashboardLiveTopChannels: Function;
    getDashboardVodTopVideos: Function;
    getDashboardVodImpressions: Function;
    getBillingPageInfos: Function;
}

const Dashboard = (props: DashboardProps) => {

    React.useEffect(() => {
        if (!props.infos) {
            props.getDashboardDetails();
        }
        if(!props.billingInfos) {
            props.getBillingPageInfos();
        }
    }, [])

    React.useEffect(() => {
        if (props.infos && props.billingInfos) {
            if(props.infos.live.liveViewers.jobID && !props.infos.live.liveViewers.data && !props.infos.live.liveViewers.loading  && !props.infos.live.liveViewers.failed) {
                props.getDashboardLiveViewers(props.infos.live.liveViewers.jobID);
            }
            if(props.infos.live.topChannels.jobID && !props.infos.live.topChannels.data && !props.infos.live.topChannels.loading  && !props.infos.live.topChannels.failed) {
                props.getDashboardLiveTopChannels(props.infos.live.topChannels.jobID);
            }
            if(props.infos.vod.videoPlays.jobID && !props.infos.vod.videoPlays.data && !props.infos.vod.videoPlays.loading  && !props.infos.vod.videoPlays.failed) {
                console.log(props.infos.vod.videoPlays)
                props.getDashboardVodPlay(props.infos.vod.videoPlays.jobID);
            }
            if(props.infos.vod.playRate.jobID && !props.infos.vod.playRate.data && !props.infos.vod.playRate.loading  && !props.infos.vod.playRate.failed) {
                props.getDashboardVodPlayRate(props.infos.vod.playRate.jobID);
            }
            if(props.infos.vod.impressions.jobID && !props.infos.vod.impressions.data && !props.infos.vod.impressions.loading  && !props.infos.vod.impressions.failed) {
                // Useless and doesnt work, we got the answer in playrate vs impressions
                //props.getDashboardVodImpressions(props.infos.vod.impressions.jobID);
            }
            if(props.infos.vod.topVideos.jobID && !props.infos.vod.topVideos.data && !props.infos.vod.topVideos.loading  && !props.infos.vod.topVideos.failed) {
                props.getDashboardVodTopVideos(props.infos.vod.topVideos.jobID);
            }
        }
    }, [props.infos, props.billingInfos])

    const renderDashboard = () => {
        if (props.billingInfos.currentPlan.displayName !== "Free") {
            return (
                <>
                    <GeneralDashboard overage={props.billingInfos.playbackProtection} plan={props.billingInfos.currentPlan} profile={props.infos.generalInfos} />
                    <LiveDashboard profile={props.infos.live} />
                    <VodDashboard profile={props.infos.vod} rightSide={true} fullWidth={false} />
                    {/* <PaywallDashboard profile={props.infos.isPaywall} rightSide={false} /> */}
                </>
            )

        } else {
            return (
                <>
                    <GeneralDashboard plan={props.billingInfos.currentPlan} profile={props.infos.generalInfos} />
                    <TrialAdditionalDashboard />
                </>
            )
        }
    }

    return (
        <>
            {
                props.infos && props.billingInfos?
                    <>
                        {renderDashboard()}
                        <div className="clearfix"></div>
                    </> :
                    <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>

            }
        </>
    )
};

export function mapStateToProps(state: ApplicationState) {
    return {
        billingInfos: state.account.plan,
        infos: state.dashboard.data
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getBillingPageInfos: () => {
            dispatch(getBillingPageInfosAction());
        },
        getDashboardDetails: () => {
            dispatch(getDashboardDetailsAction());
        },
        getDashboardVodPlayRate: (jobID: string) => {
            dispatch(getDashboardVodPlayRateAction(jobID));
        },
        getDashboardVodPlay: (jobID: string) => {
            dispatch(getDashboardVodPlayAction(jobID));
        },
        getDashboardVodTopVideos: (jobID: string) => {
            dispatch(getDashboardVodTopVideosAction(jobID));
        },
        getDashboardVodImpressions: (jobID: string) => {
            dispatch(getDashboardVodImpressionsAction(jobID));
        },
        getDashboardLiveViewers: (jobID: string) => {
            dispatch(getDashboardLiveViewers(jobID))
        },
        getDashboardLiveTopChannels: (jobID: string) => {
            dispatch(getDashboardLiveTopChannels(jobID))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

