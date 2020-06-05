import * as React from 'react';
import { VodDashboard } from './VodDashboard';
import { PaywallDashboard } from './PaywallDashboard';
import { LiveDashboard } from './LiveDashboard';
import { GeneralDashboard } from './GeneralDashboard';
import { TrialAdditionalDashboard } from './TrialAdditionalDashboard';
import { DashboardInfos, Action, getDashboardDetailsAction, getDashboardVodPlayRateAction, getDashboardVodPlayAction } from '../../redux-flow/store/Dashboard';
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
}

const Dashboard = (props: DashboardProps) => {

    const [profile, setProfile] = React.useState<number>(4);
    React.useEffect(() => {
        if(!props.infos) {
            props.getDashboardDetails();
        }
    }, [profile])

    // React.useEffect(() => {
    //     if(props.infos.vod && props.infos.vod["play-rate"] && props.infos.vod["play-rate"].jobID) {
    //         setTimeout(props.getDashboardVodPlayRate(props.infos.vod["play-rate"].jobID), 10000000)
    //     }
    //     if(props.infos.vod && props.infos.vod.videoPlays && props.infos.vod.videoPlays.jobID) {
    //        setTimeout(props.getDashboardVodPlay(props.infos.vod.videoPlays.jobID), 10000000)
    //     }
    //     console.log(props.infos)
    // }, [props.infos])

    const renderDashboard = () => {
        if(props.infos.isTrial) {
            return (
                <>
                    <GeneralDashboard plan={props.infos.isTrial} profile={props.infos.generalInfos} />
                    <TrialAdditionalDashboard />
                </>
            )
        }else if(props.infos.isPayingPlan) {
            if(props.infos.live && props.infos.vod && props.infos.isPaywall) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <LiveDashboard profile={props.infos.live} />
                        <VodDashboard profile={props.infos.vod} rightSide={true} fullWidth={false} />
                        <PaywallDashboard profile={props.infos.isPaywall} rightSide={false} />
                        <TrialAdditionalDashboard />
                    </>
                )
            } else if(props.infos.live && props.infos.isPaywall) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <LiveDashboard profile={props.infos.live} />
                        <PaywallDashboard profile={props.infos.isPaywall} rightSide={true} />
                    </>
                )
            }else if(props.infos.vod && props.infos.isPaywall) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <VodDashboard profile={props.infos.vod} fullWidth={true} />
                        <PaywallDashboard profile={props.infos.isPaywall} rightSide={false} />
                    </>
                )
            }else if(props.infos.vod && props.infos.live) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <LiveDashboard profile={props.infos.live} />
                        <VodDashboard profile={props.infos.vod} fullWidth={false} />
                    </>
                )
            }
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

export function mapStateToProps( state: ApplicationState) {
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

