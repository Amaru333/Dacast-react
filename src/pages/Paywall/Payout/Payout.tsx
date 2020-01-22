import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Table } from '../../../components/Table/Table';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { BorderStyle } from './PayoutStyle';
import { PaywallPaymentMethod } from './PaywallPaymentMethod';
import { Modal } from '../../../components/Modal/Modal';
import { WithdrawalModal } from './WithdrawalModal';

export const PayoutPage = () => {

    const paymentMethodTableHeader = () => {
        return [
            <Text key='paymentMethodTableHeaderPaymentMethod' size={14} weight='med'>Payment Type</Text>,
            <Text key='paymentMethodTableHeaderBillindID' size={14} weight='med'>Billing ID</Text>,
            <Text key='paymentMethodTableHeaderEmail' size={14} weight='med'>Email</Text>,
            <Text key='paymentMethodTableHeaderActive' size={14} weight='med'>Active</Text>,
            <Button key='paymentMethodTableHeaderActionButton' className='right mr2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Payment Method</Button>
        ]
    }

    const [withdrawalModalOpened, setWithdrawalModalOpened] = React.useState<boolean>(false);

    const withdrawalTableHeader = () => {
        return [
            <Text key='withdrawalTableHeaderRequestType' size={14} weight='med'>Request Type</Text>,
            <Text key='withdrawalTableHeaderCurrency' size={14} weight='med'>Currency</Text>,
            <Text key='withdrawalTableHeaderAmount' size={14} weight='med'>Amount</Text>,
            <Text key='withdrawalTableHeaderRequestDate' size={14} weight='med'>Request Date (UTC)</Text>,
            <Text key='withdrawalTableHeaderTransferDate' size={14} weight='med'>Transfer Date (UTC)</Text>,
            <Text key='withdrawalTableHeaderStatus' size={14} weight='med'>Status</Text>,
            <Button key='withdrawalTableHeaderActionButton' className='right mr2' onClick={() => setWithdrawalModalOpened(true)} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Request</Button>
        ]
    }

    return (
        <div>
            <Card>
                <Text  size={20} weight='reg'>Payment Request Method</Text>
                <Text className='py2' size={14} weight='reg'>You can add all the ways for us to pay you.</Text>
                <Table className='my2' id='paywallPaymentMethodTable' header={paymentMethodTableHeader()} />
                <BorderStyle className='py2' />
                <Text className='py2' size={20} weight='reg'>Withdrawal Requests</Text>
                <Text className='py2' size={14} weight='reg'>You can add all the ways for us to pay you.</Text>
                <Table className='my2' id='payoutWithdrawalTable' header={withdrawalTableHeader()} />
            </Card>
            <Modal hasClose={false} title='New Withdrawal Request' opened={withdrawalModalOpened} toggle={() => setWithdrawalModalOpened(!withdrawalModalOpened)}>
                <WithdrawalModal />
            </Modal>
        </div>

    )

    // return (
    //     <PaywallPaymentMethod />
    // )
}