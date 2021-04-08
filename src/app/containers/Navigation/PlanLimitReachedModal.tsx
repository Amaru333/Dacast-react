import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { useHistory } from 'react-router';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';

export type PlanLimitReachedModalType = 'end_of_trial' | 'limit_reached' | 'more_data_needed' | 'more_storage_needed' | 'upgrade_now' | 'livestream_limit_reached_trial';

export interface PlanLimitReachedModalProps {
    type: PlanLimitReachedModalType;
    opened: boolean;
    infos: DashboardInfos;
    type: PlanLimitReachedModalType;
    toggle: () => void;
}

export const PlanLimitReachedModal  = (props: PlanLimitReachedModalProps) => {

    let history = useHistory()

    const navigateToUpgrade = () => {
        props.toggle()
        history.push('/account/upgrade')
    }

    const navigateToContactUs = () => {
        props.toggle()
        history.push('/help')
    }

    const navigateToPurchaseData = () => {
        props.toggle()
        history.push('/account/plan/#purchase-data')
    }

    const canOpen = () => {
        if(props.type === 'end_of_trial') {
            return props.infos && props.infos.currentPlan && props.infos.currentPlan.trialExpiresIn != null && props.infos.currentPlan.trialExpiresIn <= 0
        }
        return true;
    }

    const getTitle = () => {
        switch(props.type) {
            case 'end_of_trial': return 'End of Trial'
            case 'limit_reached': return 'Limit Reached'
            case 'more_data_needed': return 'Need More Data'
            case 'more_storage_needed': return 'Need More Storage'
            case 'more_data_needed_trial': return 'Need More Data'
            case 'more_storage_needed_trial': return 'Need More Storage'
            case 'upgrade_now': return 'Upgrade Now'
            case 'livestream_limit_reached_trial': return 'Limit Reached'
        }
    }

    const renderContent = () => {
        switch(props.type) {
            case 'end_of_trial':
                return (
                    <>
                        <Text size={14}>You now have very limited access. Please upgrade your account.</Text>
                        <Text size={14} weight="med">
                            Need help or have more questions? <a href='/help' className='a-blue-2'>Contact Us</a>.
                        </Text>
                    </>
                )
            case 'limit_reached':
                return (
                    <Text size={14}>You have reached your plan limit for this feature. To continue to use this feature, upgrade your plan.</Text>
                )
            case 'more_data_needed':
                return (
                    <Text size={14}>You have reached your data limit for this plan. Upgrade your plan or purchase more data to continue.</Text>
                )
            case 'more_storage_needed':
                return (
                    <Text size={14}>You have reached your storage limit for this plan. Upgrade your plan or Contact Us to purchase.</Text>
                )
            case 'more_data_needed_trial':
                return (
                    <Text size={14}>You have reached your data limit for this plan. Upgrade your plan or contact us in order to extend trial.</Text>
                )
            case 'more_storage_needed_trial':
                return (
                    <Text size={14}>You have reached your storage limit for this plan.  Upgrade your plan or contact us in order to extend trial.</Text>
                )
            case 'upgrade_now':
                return (
                    <Text size={14}>You have reached the end of your 30-day trial. To continue, please upgrade your plan.</Text>
                )
            case 'livestream_limit_reached_trial':
                return (
                    <>
                        <Text size={14}>You reached your one livestream limit for the trial plan.</Text>
                        <Text size={14} weight="med">Upgrade your plan to get more livestreams.</Text>
                    </>
                )
        }
    }

    return (
        <Modal size="medium" modalTitle={getTitle()} toggle={props.toggle} className={isMobile && 'x-visible'} opened={props.opened && canOpen()} hasClose={true} icon={ {name: "error_outline", color: "blue-2"} }>
            <ModalContent className="mt2">{ renderContent() }</ModalContent>
            <ModalFooter>
                <Button onClick={() => { navigateToUpgrade() }} typeButton="primary" buttonColor="lightBlue">Upgrade Now</Button>
                {
                    ['upgrade_now', 'limit_reached', 'more_storage_needed'].includes(props.type) &&
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                }
                {
                    ['more_data_needed_trial', 'more_storage_needed_trial', 'livestream_limit_reached_trial'].includes(props.type) &&
                    <Button sizeButton="large" onClick={()=> navigateToContactUs()} type="button" typeButton="secondary" buttonColor="blue" >Contact us</Button>
                }
                {
                    ['more_data_needed'].includes(props.type) &&
                    <Button sizeButton="large" onClick={()=> navigateToPurchaseData()} type="button" typeButton="secondary" buttonColor="blue" >Purchase Data</Button>
                }
            </ModalFooter>
        </Modal>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        infos: state.dashboard.info
    };
}

export default connect(mapStateToProps, null)(PlanLimitReachedModal);
