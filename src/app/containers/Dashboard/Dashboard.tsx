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
import { getBillingPageInfosAction, BillingPageInfos, PlaybackProtection, editBillingPagePaymenPlaybackProtectionAction, addBillingPagePaymenPlaybackProtectionAction } from '../../redux-flow/store/Account/Plan';
import { ProtectionModal } from '../../pages/Account/Plan/ProtectionModal';
import { Modal } from '../../../components/Modal/Modal';

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
    editBillingPagePaymenPlaybackProtection: Function;
    addBillingPagePaymenPlaybackProtection: Function;
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

    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.infos && props.billingInfos) {
           
        }
    }, [props.infos, props.billingInfos])

    const renderDashboard = () => {
        if (props.billingInfos.currentPlan.displayName !== "Free" && props.billingInfos.currentPlan.displayName !== "30 Day Trial") {
            return (
                <>
                    <GeneralDashboard openOverage={setProtectionModalOpened} overage={props.billingInfos.playbackProtection} plan={props.billingInfos.currentPlan} profile={props.infos.generalInfos} />
                    <LiveDashboard profile={props.infos.live} />
                    <VodDashboard profile={props.infos.vod} rightSide={true} fullWidth={false} />
                    {
                        protectionModalOpened &&
                        <Modal hasClose={false} modalTitle='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                            <ProtectionModal actionButton={props.billingInfos.playbackProtection.enabled ? props.editBillingPagePaymenPlaybackProtection : props.addBillingPagePaymenPlaybackProtection} toggle={setProtectionModalOpened} setPlaybackProtectionEnabled={()=>{}} playbackProtection={props.billingInfos.playbackProtection} billingInfos={props.billingInfos}/>
                        </Modal>
                    } 
                    <PaywallDashboard profile={props.infos.paywall} rightSide={false} />
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
        editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => {
            dispatch(editBillingPagePaymenPlaybackProtectionAction(data));
        },
        addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => {
            dispatch(addBillingPagePaymenPlaybackProtectionAction(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

