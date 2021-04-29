import * as React from 'react';
import { VodDashboard } from './VodDashboard';
import { PaywallDashboard } from './PaywallDashboard';
import { LiveDashboard } from './LiveDashboard';
import { GeneralDashboard } from './GeneralDashboard';
import { TrialAdditionalDashboard } from './TrialAdditionalDashboard';
import { DashboardInfos, Action, getDashboardDetailsAction } from '../../redux-flow/store/Dashboard';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from "react-redux";
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { PlaybackProtection, editBillingPagePaymenPlaybackProtectionAction, addBillingPagePaymenPlaybackProtectionAction, getBillingPageInfosAction, BillingPageInfos } from '../../redux-flow/store/Account/Plan';
import { ProtectionModal } from '../../pages/Account/Plan/ProtectionModal';
import { Modal } from '../../../components/Modal/Modal';
import { DisableProtectionModal } from '../../shared/Plan/DisableProtectionModal';
import { userToken } from '../../utils/services/token/tokenService';

export interface DashboardProps {
    infos: DashboardInfos;
    billingInfo: BillingPageInfos;
    getBillingPageInfos: () => Promise<void>
    getDashboardDetails: () => Promise<void>;
    editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>;
    addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>;
}

const Dashboard = (props: DashboardProps) => {

    React.useEffect(() => {
        props.getDashboardDetails()
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
        if (props.infos.currentPlan.displayName !== "Free" && props.infos.currentPlan.displayName !== "30 Day Trial") {
            return (
                <>
                    <GeneralDashboard openOverage={setProtectionModalOpened} overage={props.billingInfo.playbackProtection} plan={props.infos.currentPlan} profile={props.infos.generalInfos} />
                    <LiveDashboard profile={props.infos.live} />
                    <VodDashboard profile={props.infos.vod} rightSide={true} fullWidth={false} />
                    {
                        protectionModalOpened &&
                        <Modal hasClose={false} modalTitle='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                            <ProtectionModal actionButton={handlePlaybackProtectionValue} toggle={setProtectionModalOpened} setPlaybackProtectionEnabled={()=>{}} playbackProtection={props.infos.playbackProtection} />
                        </Modal>
                    }
                    <Modal icon={{ name: "error_outlined", color: "yellow" }} hasClose={false} modalTitle="Disable Protection" toggle={() => setDisableProtectionModalOpened(!disableProtectionModalOpened)} size="small" opened={disableProtectionModalOpened} >
                        <DisableProtectionModal
                            price={props.infos.playbackProtection.price}
                            editBillingPagePaymenPlaybackProtection={props.editBillingPagePaymenPlaybackProtection}
                            setDisableProtectionModalOpened={setDisableProtectionModalOpened}
                            />
                    </Modal>
                    {
                        userToken.getPrivilege('privilege-paywall') &&
                        <PaywallDashboard profile={props.infos.paywall} rightSide={false} />
                    }
                </>
            )
        }
        return (
            <>
                <GeneralDashboard plan={props.infos.currentPlan} profile={props.infos.generalInfos} />
                <TrialAdditionalDashboard />
            </>
        )
    }

    return (
        <>
            {
                (props.infos && props.billingInfo) ?
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
        infos: state.dashboard.info,
        billingInfo: state.account.plan
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getDashboardDetails: async () => {
            await dispatch(getDashboardDetailsAction(undefined));
        },
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
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

