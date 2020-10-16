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
import { PlaybackProtection, editBillingPagePaymenPlaybackProtectionAction, addBillingPagePaymenPlaybackProtectionAction } from '../../redux-flow/store/Account/Plan';
import { ProtectionModal } from '../../pages/Account/Plan/ProtectionModal';
import { Modal } from '../../../components/Modal/Modal';

export interface DashboardProps {
    infos: DashboardInfos;
    getDashboardDetails: () => Promise<void>;
    getDashboardVodPlayRate: (jobID: string) => Promise<void>;
    editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>;
    addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>;
}

const Dashboard = (props: DashboardProps) => {

    React.useEffect(() => {
        if (!props.infos) {
            props.getDashboardDetails();
        }
    }, [])

    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);


    const renderDashboard = () => {
        if (props.infos.currentPlan.displayName !== "Free" && props.infos.currentPlan.displayName !== "30 Day Trial") {
            return (
                <>
                    <GeneralDashboard openOverage={setProtectionModalOpened} overage={props.infos.playbackProtection} plan={props.infos.currentPlan} profile={props.infos.generalInfos} />
                    <LiveDashboard profile={props.infos.live} />
                    <VodDashboard profile={props.infos.vod} rightSide={true} fullWidth={false} />
                    {
                        protectionModalOpened &&
                        <Modal hasClose={false} modalTitle='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                            <ProtectionModal actionButton={props.infos.playbackProtection.enabled ? props.editBillingPagePaymenPlaybackProtection : props.addBillingPagePaymenPlaybackProtection} toggle={setProtectionModalOpened} setPlaybackProtectionEnabled={()=>{}} playbackProtection={props.infos.playbackProtection} />
                        </Modal>
                    } 
                    <PaywallDashboard profile={props.infos.paywall} rightSide={false} />
                </>
            )

        } else {
            return (
                <>
                    <GeneralDashboard plan={props.infos.currentPlan} profile={props.infos.generalInfos} />
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
        getDashboardDetails: async () => {
            await dispatch(getDashboardDetailsAction());
        },
        getDashboardVodPlayRate: async (jobID: string) => {
            await dispatch(getDashboardVodPlayRateAction(jobID));
        },
        editBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
            await dispatch(editBillingPagePaymenPlaybackProtectionAction(data));
        },
        addBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
            await dispatch(addBillingPagePaymenPlaybackProtectionAction(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

