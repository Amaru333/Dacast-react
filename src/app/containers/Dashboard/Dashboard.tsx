import * as React from 'react';
import { VodDashboard } from './VodDashboard';
import { PaywallDashboard } from './PaywallDashboard';
import { LiveDashboard } from './LiveDashboard';
import { GeneralDashboard } from './GeneralDashboard';
import { TrialAdditionalDashboard } from './TrialAdditionalDashboard';
import { DashboardInfos, Action, getDashboardDetailsAction } from '../../redux-flow/store/Dashboard';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from "react-redux";
import styled from 'styled-components';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface DashboardProps {
    infos: DashboardInfos;
    getDashboardDetails: Function;
}

const Dashboard = (props: DashboardProps) => {

    const [profile, setProfile] = React.useState<number>(4);
    React.useEffect(() => {
        if(!props.infos) {
            props.getDashboardDetails();
        }
    }, [profile])

    const renderDashboard = () => {
        if(props.infos.isTrial) {
            return (
                <>
                    <GeneralDashboard plan={props.infos.isTrial} profile={props.infos.generalInfos} />
                    <TrialAdditionalDashboard />
                </>
            )
        }else if(props.infos.isPayingPlan) {
            if(props.infos.isLive && props.infos.isVod && props.infos.isPaywall) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <LiveDashboard profile={props.infos.isLive} />
                        <VodDashboard profile={props.infos.isVod} rightSide={true} fullWidth={false} />
                        <PaywallDashboard profile={props.infos.isPaywall} rightSide={false} />
                        <TrialAdditionalDashboard />
                    </>
                )
            } else if(props.infos.isLive && props.infos.isPaywall) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <LiveDashboard profile={props.infos.isLive} />
                        <PaywallDashboard profile={props.infos.isPaywall} rightSide={true} />
                    </>
                )
            }else if(props.infos.isVod && props.infos.isPaywall) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <VodDashboard profile={props.infos.isVod} fullWidth={true} />
                        <PaywallDashboard profile={props.infos.isPaywall} rightSide={false} />
                    </>
                )
            }else if(props.infos.isVod && props.infos.isLive) {
                return (
                    <>
                        <GeneralDashboard plan={props.infos.isPayingPlan} profile={props.infos.generalInfos} />
                        <LiveDashboard profile={props.infos.isLive} />
                        <VodDashboard profile={props.infos.isVod} fullWidth={false} />
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

