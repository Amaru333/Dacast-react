import * as React from 'react';
import { VodDashboard } from './VodDashboard';
import { PaywallDashboard } from './PaywallDashboard';
import { LiveDashboard } from './LiveDashboard';
import { GeneralDashboard } from './GeneralDashboard';
import { TrialAdditionalDashboard } from './TrialAdditionalDashboard';
import { DashboardInfos, Action, getDashboardDetailsAction, getDashboardVodPlayRateAction, getDashboardVodPlayAction, getDashboardLiveViewers, getDashboardLiveTopChannels } from '../../redux-flow/store/Dashboard';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from "react-redux";
import styled from 'styled-components';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface DashboardProps {
    infos: DashboardInfos;
    getDashboardDetails: Function;
    getDashboardVodPlayRate: Function;
    getDashboardVodPlay: Function;
    getDashboardLiveViewers: Function;
    getDashboardLiveTopChannels: Function;
}

const Dashboard = (props: DashboardProps) => {

    React.useEffect(() => {
        if (!props.infos) {
            props.getDashboardDetails();
        }
    }, [])

    React.useEffect(() => {
        if (props.infos) {
            console.log(props.infos)
            if(props.infos.live.liveViewers.jobID && !props.infos.live.liveViewers.data) {
                props.getDashboardLiveViewers(props.infos.live.liveViewers.jobID);
            }
            if(props.infos.live.topChannels.jobID && !props.infos.live.topChannels.data) {
                props.getDashboardLiveTopChannels(props.infos.live.topChannels.jobID);
            }
            if(props.infos.vod.videoPlays.jobID && !props.infos.vod.videoPlays.data) {
                props.getDashboardVodPlay(props.infos.vod.videoPlays.jobID);
            }
            if(props.infos.vod.playRate.jobID && !props.infos.vod.playRate.data) {
                props.getDashboardVodPlayRate(props.infos.vod.playRate.jobID);
            }
        }
    }, [props.infos])
    console.log(props);

    const renderDashboard = () => {

        if (props.infos.isPayingPlan) {
            return (
                <>
                    <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                    <LiveDashboard profile={props.infos.live} />
                    <VodDashboard profile={props.infos.vod} rightSide={true} fullWidth={false} />
                    {/* <PaywallDashboard profile={props.infos.isPaywall} rightSide={false} /> */}
                </>
            )

        } else {
            return (
                <>
                    <GeneralDashboard plan={props.infos.isTrial} profile={props.infos.generalInfos} />
                    <TrialAdditionalDashboard />
                </>
            )
        }
    }

    return (
        <>
            {
                props.infos ?
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
        infos: state.dashboard.data
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getDashboardDetails: () => {
            dispatch(getDashboardDetailsAction());
        },
        getDashboardVodPlayRate: (jobID: string) => {
            dispatch(getDashboardVodPlayRateAction(jobID));
        },
        getDashboardVodPlay: (jobID: string) => {
            dispatch(getDashboardVodPlayAction(jobID));
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

