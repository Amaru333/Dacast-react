import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { useHistory } from 'react-router';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';

export const EndOfTrialModal  = (props: { toggle: () => void; opened: boolean; billingInfo: BillingPageInfos }) => {

    let history = useHistory()

    const handleSubmit = () => {
        props.toggle();
        history.push('/account/upgrade')
    }

    const canOpen = props.billingInfo && props.billingInfo.currentPlan && props.billingInfo.currentPlan.trialExpiresIn <= 0

    return (
        <Modal size="medium" modalTitle="End of Trial" toggle={props.toggle} className={isMobile && 'x-visible'} opened={props.opened && canOpen} hasClose={true} icon={ {name: "error_outline", color: "blue-2"} }>
            <ModalContent className="mt2">
                <Text size={14}>
                    You now have very limited access. Please upgrade your account.
                </Text>
                <Text size={14} weight="med">
                    Need help or have more questions? <a href='/help' className='a-blue-2'>Contact Us</a>.
                </Text>
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => { handleSubmit() }} typeButton="primary" buttonColor="lightBlue">Upgrade Now</Button>
            </ModalFooter>
        </Modal>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        billingInfo: state.account.plan
    };
}

export default connect(mapStateToProps, null)(EndOfTrialModal);
