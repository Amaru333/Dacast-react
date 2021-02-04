import * as React from 'react';
import { VodDashboard } from './VodDashboard';
import { PaywallDashboard } from './PaywallDashboard';
import { LiveDashboard } from './LiveDashboard';
import { GeneralDashboard } from './GeneralDashboard';
import { TrialAdditionalDashboard } from './TrialAdditionalDashboard';
import { DashboardInfos, Action, getDashboardGeneralDetailsAction, getDashboardLiveAction, getDashboardPaywallAction, getDashboardVodAction } from '../../redux-flow/store/Dashboard';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from "react-redux";
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { PlaybackProtection, editBillingPagePaymenPlaybackProtectionAction, addBillingPagePaymenPlaybackProtectionAction } from '../../redux-flow/store/Account/Plan';
import { ProtectionModal } from '../../pages/Account/Plan/ProtectionModal';
import { Modal } from '../../../components/Modal/Modal';
import { DisableProtectionModal } from '../../shared/Plan/DisableProtectionModal';

export interface DashboardProps {
    infos: DashboardInfos;
    getDashboardGeneralDetails: () => Promise<void>;
    getDashboardLive: () => Promise<void>;
    getDashboardVod: () => Promise<void>;
    getDashboardPaywall: () => Promise<void>;
    getDashboardVodPlayRate: (jobID: string) => Promise<void>;
    editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>;
    addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>;
}

const DashboardTest = (props: DashboardProps) => {

    React.useEffect(() => {
        props.getDashboardGeneralDetails()
        props.getDashboardLive()
        props.getDashboardVod()
        props.getDashboardPaywall()
    }, [])

    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [disableProtectionModalOpened, setDisableProtectionModalOpened] = React.useState<boolean>(false)

    const handlePlaybackProtectionValue = (value: string) => {

        let playbackProtectionData: PlaybackProtection = {enabled: true, amount: parseInt(value), price: props.infos.playbackProtection.price}

        if(value === "Disable Protection"){
            setProtectionModalOpened(false);
            setDisableProtectionModalOpened(true);
        } else {
            if(props.infos.playbackProtection.enabled){
                props.editBillingPagePaymenPlaybackProtection(playbackProtectionData);
            } else {
                props.addBillingPagePaymenPlaybackProtection(playbackProtectionData)
            }

        }
    }


    const renderDashboard = () => {

        if (props.infos.currentPlan && props.infos.currentPlan.displayName !== '30 Day Trial') {
            return (
                <React.Fragment>
                    <LiveDashboard profile={props.infos.live} />
                    <VodDashboard profile={props.infos.vod} rightSide={true} fullWidth={false} />
                    <PaywallDashboard profile={props.infos.paywall} rightSide={false} />
                    {
                        protectionModalOpened &&
                        <Modal hasClose={false} modalTitle='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                            <ProtectionModal actionButton={handlePlaybackProtectionValue} toggle={setProtectionModalOpened} setPlaybackProtectionEnabled={()=>{}} playbackProtection={props.infos.playbackProtection} />
                        </Modal>
                    }
                    {
                        props.infos.playbackProtection && 
                        <Modal icon={{ name: "error_outlined", color: "yellow" }} hasClose={false} modalTitle="Disable Protection" toggle={() => setDisableProtectionModalOpened(!disableProtectionModalOpened)} size="small" opened={disableProtectionModalOpened} >
                            <DisableProtectionModal
                                price={props.infos.playbackProtection.price}
                                editBillingPagePaymenPlaybackProtection={props.editBillingPagePaymenPlaybackProtection}
                                setDisableProtectionModalOpened={setDisableProtectionModalOpened} 
                            />
                        </Modal>
                    }
                </React.Fragment>
            )
        }

        if (props.infos.currentPlan && props.infos.currentPlan.displayName === '30 Day Trial') {
            return <TrialAdditionalDashboard />
        }

        return null
    }

    return (
        <React.Fragment>
            {
                props.infos && props.infos.currentPlan ?
                    <React.Fragment>
                        <GeneralDashboard openOverage={setProtectionModalOpened} overage={props.infos.playbackProtection} plan={props.infos.currentPlan} profile={props.infos.generalInfos} />
                        {renderDashboard()}
                    </React.Fragment> :
                    <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
            }
        </React.Fragment>
    )
};

export function mapStateToProps(state: ApplicationState) {
    return {
        infos: state.dashboard.info,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getDashboardGeneralDetails: async () => {
            await dispatch(getDashboardGeneralDetailsAction(undefined));
        },
        getDashboardLive: async () => {
            await dispatch(getDashboardLiveAction(undefined));
        },
        getDashboardVod: async () => {
            await dispatch(getDashboardVodAction(undefined));
        },
        getDashboardPaywall: async () => {
            await dispatch(getDashboardPaywallAction(undefined));
        },
        editBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
            await dispatch(editBillingPagePaymenPlaybackProtectionAction(data));
        },
        addBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
            await dispatch(addBillingPagePaymenPlaybackProtectionAction(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTest);

