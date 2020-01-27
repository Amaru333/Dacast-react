import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Table } from '../../../components/Table/Table';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { BorderStyle } from './PayoutStyle';
import { PaywallPaymentMethod } from './PaywallPaymentMethod';
import { Modal } from '../../../components/Modal/Modal';
import { WithdrawalModal } from './WithdrawalModal';
import { PayoutComponentProps } from '../../../containers/Paywall/Payout';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../styled/types';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';

export const PayoutPage = (props: PayoutComponentProps) => {

    const [displayPaymentMethodRequest, setDisplayPaymentMethodRequest] = React.useState<boolean>(false);

    const paymentMethodTableHeader = () => {
        return [
            <Text key='paymentMethodTableHeaderPayoutType' size={14} weight='med'>Payout Type</Text>,
            <Text key='paymentMethodTableHeaderlastUpdated' size={14} weight='med'>Last Updated</Text>,
            <Button key='paymentMethodTableHeaderActionButton' className='right mr2' onClick={() => {setDisplayPaymentMethodRequest(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Payment Method Request</Button>
        ]
    }

    const paymentMethodTableBody = () => {
        if(props.payoutInfos.paymentMethodRequests) {
            return Object.keys(props.payoutInfos.paymentMethodRequests).map((item, i) => {
                return [
                    <Text key={'paymentMethodTableBodyPaymentType' + i} size={14} weight='reg' color='gray-3'>{item}</Text>,
                    <Text key={'paymentMethodTableBodyDateCreated' + i} size={14} weight='reg' color='gray-3'>lol</Text>,
                    <IconContainer className="iconAction" key={'paymentMethodTableBodyActionButtons' + i}><Icon onClick={() =>  {props.deletePaymentMethodRequest(item)}}>delete</Icon><Icon onClick={() =>  {}}>edit</Icon></IconContainer>
                ]
            })
        }
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

    const withdrawalTableBody = () => {
        if(props.payoutInfos.withdrawalRequests) {
            return props.payoutInfos.withdrawalRequests.map((item, i) => {
                const color = item.status === 'Completed' ? 'green' : item.status === 'Cancelled' ? 'red' : 'yellow';
                const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
                return [
                    <Text key={'withdrawalRequestTableBodyRequestType' + i} size={14} weight='reg' color='gray-3'>{item.requestType}</Text>,
                    <Text key={'withdrawalRequestTableBodyCurrency' + i} size={14} weight='reg' color='gray-3'>{item.currency}</Text>,
                    <Text key={'withdrawalRequestTableBodyAmount' + i} size={14} weight='reg' color='gray-3'>{item.amount}</Text>,
                    <Text key={'withdrawalRequestTableBodyRequestDate' + i} size={14} weight='reg' color='gray-3'>{item.requestDate}</Text>,
                    <Text key={'withdrawalRequestTableBodyTransferDate' + i} size={14} weight='reg' color='gray-3'>{item.transferDate}</Text>,
                    <Label color={color} backgroundColor={BackgroundColor} label={item.status} />,
                    <IconContainer className="iconAction" key={'withdrawalRequestTableBodyDeleteButton' + i}><Icon onClick={() =>  {}}>delete</Icon></IconContainer>
                ]
            })
        }
    }

    return displayPaymentMethodRequest ?
        <PaywallPaymentMethod addPaymentMethodRequest={props.addPaymentMethodRequest} displayPage={setDisplayPaymentMethodRequest} />
        :
        <div>
            <Card>
                <Text  size={20} weight='reg'>Payment Request Method</Text>
                <Text className='py2' size={14} weight='reg'>You can add all the ways for us to pay you.</Text>
                <Table className='my2' id='paywallPaymentMethodTable' header={paymentMethodTableHeader()} body={paymentMethodTableBody()} />
                <BorderStyle className='py2' />
                <Text className='py2' size={20} weight='reg'>Withdrawal Requests</Text>
                <Text className='py2' size={14} weight='reg'>You can add all the ways for us to pay you.</Text>
                <Table className='my2' id='payoutWithdrawalTable' header={withdrawalTableHeader()} body={withdrawalTableBody()} />
            </Card>
            <Modal hasClose={false} title='New Withdrawal Request' opened={withdrawalModalOpened} toggle={() => setWithdrawalModalOpened(!withdrawalModalOpened)}>
                <WithdrawalModal action={props.addWithdrawalRequest} toggle={setWithdrawalModalOpened} />
            </Modal>
        </div>
}

const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`