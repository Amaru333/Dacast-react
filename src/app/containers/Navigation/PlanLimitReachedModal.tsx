import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { useHistory } from 'react-router';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { userToken } from '../../../app/utils/services/token/tokenService';
import { segmentService } from '../../utils/services/segment/segmentService';

export type PlanLimitReachedModalType = 'end_of_trial' | 'limit_reached' | 'more_data_needed' | 'more_storage_needed_trial' | 'upgrade_now_video' | 'upgrade_now_stream' | 'upgrade_now_expo' | 'livestream_limit_reached_trial' | 'feature_not_included' | 'feature_not_included_starter_paywall';

export interface PlanLimitReachedModalProps {
    type: PlanLimitReachedModalType;
    opened: boolean;
    infos: DashboardInfos;
    type: PlanLimitReachedModalType;
    allowNavigation: boolean;
    toggle: () => void;
}

export const PlanLimitReachedModal  = (props: PlanLimitReachedModalProps) => {

    let history = useHistory()

    const navigateToUpgrade = () => {
        if ([
            'end_of_trial',
            'feature_not_included_starter_paywall',
            'livestream_limit_reached_trial',
            'more_data_needed',
            'more_data_needed_trial',
            'more_storage_needed_trial'
        ].includes(props.type)) {
            const location = {
                'end_of_trial': 'expired trial landing pop up',
                'feature_not_included_starter_paywall': 'unavailable feature pop up',
                'livestream_limit_reached_trial': 'max live stream reached pop up',
                'more_data_needed': 'max data reached pop up',
                'more_data_needed_trial': 'max data reached pop up',
                'more_storage_needed_trial': 'max storage reached pop up'
            }[props.type]
            const customers = ['end_of_trial', 'upgrade_now'].includes(props.type) ? 'trial' : 'all';
            segmentService.track('Upgrade Form Completed', {
                action: 'Upgrade Source Clicked',
                userId: userToken.getUserInfoItem('user-id'),
                customers,
                type: 'button',
                location,
                step: -1
            })
        }
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

    const navigateToDashboard = () => {
        props.toggle()
        history.push('/')
    }

    const currentPathIsDashboard = () => {
        return location.pathname === '/'
    }

    const canOpen = () => {
        if(props.type === 'end_of_trial') {
            return currentPathIsDashboard() && props.infos && props.infos.currentPlan && props.infos.currentPlan.trialExpiresIn != null && props.infos.currentPlan.trialExpiresIn <= 0
        }
        return true;
    }

    const getTitle = () => {
        switch(props.type) {
            case 'end_of_trial':
                return 'End of Trial'
            case 'limit_reached':
            case 'livestream_limit_reached_trial':
                return 'Limit Reached'
            case 'more_data_needed':
            case 'more_data_needed_trial':
                return 'Need More Data'
            case 'more_storage_needed_trial':
                return 'Need More Storage'
            case 'upgrade_now_video':
            case 'upgrade_now_stream':
            case 'upgrade_now_expo':
                return 'Upgrade Now'
            case 'feature_not_included':
            case 'feature_not_included_starter_paywall':
                return 'Upgrade Plan'
        }
    }

    const getHasClose = () => {
        switch(props.type) {
            case 'end_of_trial':
            case 'more_data_needed':
            case 'more_data_needed_trial':
                return true
            case 'limit_reached':
            case 'more_storage_needed_trial':
            case 'upgrade_now_video':
            case 'upgrade_now_stream':
            case 'upgrade_now_expo':
            case 'livestream_limit_reached_trial':
            case 'feature_not_included':
            case 'feature_not_included_starter_paywall':
                return false
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
            case 'more_data_needed_trial':
                return (
                    <Text size={14}>You have reached your data limit for this plan. Upgrade your plan or contact us in order to extend trial.</Text>
                )
            case 'more_storage_needed_trial':
                return (
                    <Text size={14}>You have reached your storage limit for this plan.  Upgrade your plan or contact us in order to extend trial.</Text>
                )
            case 'upgrade_now_video':
            case 'upgrade_now_stream':
            case 'upgrade_now_expo':
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
            case 'feature_not_included':
                return (
                    <>
                        <Text size={14}>This feature is not included in your plan. Please upgrade to have access.</Text>
                        <Text size={14} weight="med">Want to learn more about this feature? <a href='/help' className='a-blue-2'>Read here</a></Text>
                    </>
                )
            case 'feature_not_included_starter_paywall':
                return (
                    <>
                        <Text size={14}>This feature is not included in your plan. Please upgrade to have access or <a href='/help' className='a-blue-2'>request this feature</a> as an add-on to your current plan.</Text>
                        <Text size={14} weight="med">Want to learn more about Paywall? <a href='https://www.dacast.com/support/knowledgebase/video-monetization-how-to-use-dacast-paywall/' className='a-blue-2'>Read here</a></Text>
                    </>
                )
        }
    }

    return (
        <Modal size="medium" modalTitle={getTitle()} toggle={props.toggle} className={isMobile && 'x-visible'} opened={props.opened && canOpen()} hasClose={getHasClose()} icon={ {name: "error_outline", color: "blue-2"}} allowNavigation={props.allowNavigation}>
            <ModalContent className="mt2">{ renderContent() }</ModalContent>
            <ModalFooter>
                <Button onClick={() => navigateToUpgrade()} typeButton="primary" buttonColor="lightBlue">Upgrade Now</Button>
                {
                    ['upgrade_now', 'limit_reached'].includes(props.type) &&
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" typeButton="tertiary" buttonColor="lightBlue" >Cancel</Button>
                }
                {
                    ['more_data_needed_trial', 'more_storage_needed_trial', 'livestream_limit_reached_trial'].includes(props.type) &&
                    <Button sizeButton="large" onClick={()=> navigateToContactUs()} type="button" typeButton="secondary" buttonColor="lightBlue" >Contact us</Button>
                }
                {
                    ['more_data_needed'].includes(props.type) &&
                    <Button sizeButton="large" onClick={()=> navigateToPurchaseData()} type="button" typeButton="secondary" buttonColor="lightBlue" >Purchase Data</Button>
                }
                {
                    ['feature_not_included', 'feature_not_included_starter_paywall'].includes(props.type) &&
                    <Button sizeButton="large" onClick={()=> navigateToDashboard()} type="button" typeButton="tertiary" buttonColor="lightBlue">Go Dashboard</Button>
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
