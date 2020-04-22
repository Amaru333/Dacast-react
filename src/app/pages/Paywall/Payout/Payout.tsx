import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { BorderStyle } from './PayoutStyle';
import { PaywallPaymentMethod } from './PaywallPaymentMethod';
import { Modal } from '../../../../components/Modal/Modal';
import { WithdrawalModal } from './WithdrawalModal';
import { PayoutComponentProps } from '../../../containers/Paywall/Payout';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { IconStyle, ActionIcon } from '../../../../shared/Common/Icon';
import styled from 'styled-components';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export const PayoutPage = (props: PayoutComponentProps) => {

    const [displayPaymentMethodRequest, setDisplayPaymentMethodRequest] = React.useState<boolean>(false);

    

    const paymentMethodTableHeader = () => {
        return {
            data: [
                { cell: <Text key='paymentMethodTableHeaderPayoutType' size={14} weight='med'>Method</Text> },
                { cell: <Text key='paymentMethodTableHeaderlastUpdated' size={14} weight='med'>Last Updated</Text> },
                { cell: <Button key='paymentMethodTableHeaderActionButton' className='right mr2 sm-show' onClick={() => { setDisplayPaymentMethodRequest(true) }} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Method</Button> }
            ]
        }
    }

    const paymentMethodTableBody = () => {
        if (props.payoutInfos.paymentMethodRequests) {
            return Object.keys(props.payoutInfos.paymentMethodRequests).map((item, i) => {
                return {
                    data: [
                        <Text key={'paymentMethodTableBodyPaymentType' + i} size={14} weight='reg' color='gray-3'>{item}</Text>,
                        <Text key={'paymentMethodTableBodyDateCreated' + i} size={14} weight='reg' color='gray-3'>lol</Text>,
                        <IconContainer className="iconAction" key={'paymentMethodTableBodyActionButtons' + i}>
                            <ActionIcon>
                                <IconStyle id={"deleteTooltip" + i} onClick={() => { props.deletePaymentMethodRequest(item) }}>delete</IconStyle>
                                <Tooltip target={"deleteTooltip" + i}>Delete</Tooltip>
                            </ActionIcon>
                            <ActionIcon>
                                <IconStyle id={"editTooltip" + i} onClick={() => { }}>edit</IconStyle>
                                <Tooltip target={"editTooltip" + i}>Edit</Tooltip>
                            </ActionIcon>
                        </IconContainer>
                    ]
                }
            })
        }
    }

    const emptyPaymentMethodTableHeader = () => {
        return {
            data: [
                { cell: <Button key='paymentMethodTableHeaderActionButton' className='right sm-show mr2' onClick={() => { setDisplayPaymentMethodRequest(true) }} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Method</Button> }
            ]
        }
    }


    const emptyPaymentMethodTableBody = (text: string) => {
        return [{
            data: [
                <div className='center'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
            ]
        }]
    }

    const [withdrawalModalOpened, setWithdrawalModalOpened] = React.useState<boolean>(false);


    const handleNewWithdrawlRequest = () => {
        if (props.payoutInfos.paymentMethodRequests && Object.keys(props.payoutInfos.paymentMethodRequests).length !== 0) {
            setWithdrawalModalOpened(true)
        } else {
            props.showToast("You must add a Payment Request Method before you can Request a Withdrawal", 'fixed', "error")
        }
    }

    const withdrawalTableHeader = () => {
        return {
            data: [
                { cell: <Text key='withdrawalTableHeaderRequestType' size={14} weight='med'>Method</Text> },
                { cell: <Text key='withdrawalTableHeaderCurrency' size={14} weight='med'>Currency</Text> },
                { cell: <Text key='withdrawalTableHeaderAmount' size={14} weight='med'>Amount</Text> },
                { cell: <Text key='withdrawalTableHeaderRequestDate' size={14} weight='med'>Request Date (UTC)</Text> },
                { cell: <Text key='withdrawalTableHeaderTransferDate' size={14} weight='med'>Transfer Date (UTC)</Text> },
                { cell: <Text key='withdrawalTableHeaderStatus' size={14} weight='med'>Status</Text> },
                { cell: <Button key='withdrawalTableHeaderActionButton' className='right sm-show mr2' onClick={() => handleNewWithdrawlRequest()} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Request</Button> }
            ]
        }
    }

    const withdrawalTableBody = () => {
        if (props.payoutInfos.withdrawalRequests) {
            return props.payoutInfos.withdrawalRequests.map((item, i) => {
                const color = item.status === 'Completed' ? 'green' : item.status === 'Cancelled' ? 'red' : 'yellow';
                const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
                return {
                    data: [
                        <Text key={'withdrawalRequestTableBodyRequestType' + i} size={14} weight='reg' color='gray-3'>{item.requestType}</Text>,
                        <Text key={'withdrawalRequestTableBodyCurrency' + i} size={14} weight='reg' color='gray-3'>{item.currency}</Text>,
                        <Text key={'withdrawalRequestTableBodyAmount' + i} size={14} weight='reg' color='gray-3'>{item.amount}</Text>,
                        <Text key={'withdrawalRequestTableBodyRequestDate' + i} size={14} weight='reg' color='gray-3'>{item.requestDate}</Text>,
                        <Text key={'withdrawalRequestTableBodyTransferDate' + i} size={14} weight='reg' color='gray-3'>{item.transferDate}</Text>,
                        <Label color={color} backgroundColor={BackgroundColor} label={item.status} />,
                        <IconContainer className="iconAction" key={'withdrawalRequestTableBodyDeleteButton' + i}>
                            <ActionIcon>
                                <IconStyle id={"deleteTooltip" + i} onClick={() => { }}>delete</IconStyle>
                                <Tooltip target={"deleteTooltip" + i}></Tooltip>
                            </ActionIcon>
                        </IconContainer>
                    ]
                }
            })
        }
    }

    const emptyWithdrawalTableHeder = () => {
        return props.payoutInfos.paymentMethodRequests ? {
            data: [
                { cell: <span key={"emptywithdrawalsTableHeader"}></span> },
                { cell: <Button key='withdrawalTableHeaderActionButton' className='right mr2 sm-show' onClick={() => handleNewWithdrawlRequest()} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Request</Button> }
            ]
        } :
            {
                data: [
                    { cell: <span key={"emptywithdrawalsTableHeader"}></span> }]

            }
    }


    const emptyWithdrawalTableBody = (text: string) => {
        return props.payoutInfos.paymentMethodRequests ? [{data: [
            <div key={'emptyWithdrawalsTableBody'} className='right'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>,
            <div key={'emptyWithdrawalsTableBody'} className='center'></div>
        ]}] :
            [{data: [
                <div key={'emptyWithdrawalsTableBody'} className='center'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
            ]

            }]}

    return displayPaymentMethodRequest ?
        <PaywallPaymentMethod addPaymentMethodRequest={props.addPaymentMethodRequest} displayPage={setDisplayPaymentMethodRequest} />
        :
        <div>
            <Card>
                <Text size={20} weight='reg'>New Withdrawal Method</Text>
                <Text className='pt2 pb1' size={14} weight='reg'>Add ways to receive withdrawals from your paywall balance.</Text>
                <Button key='paymentMethodTableHeaderActionButton' className='col col-12 xs-show' onClick={() => { setDisplayPaymentMethodRequest(true) }} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Method</Button>
                {
                    props.payoutInfos.paymentMethodRequests ?
                        <Table id='paywallPaymentMethodTable' headerBackgroundColor="gray-10" header={paymentMethodTableHeader()} body={paymentMethodTableBody()} />
                        : <Table id='paymentMethodEmptyTable' headerBackgroundColor="gray-10" header={emptyPaymentMethodTableHeader()} body={emptyPaymentMethodTableBody('Add a Withdrawal Method so you can withdraw money from your Paywall balance')} />
                }
                <BorderStyle className='mt2 mb1' />
                <Text className='pt2' size={20} weight='reg'>Withdrawal Requests</Text>
                <Text className='pt2 py1' size={14} weight='reg'>Request a withdrawal from your paywall balance.</Text>
                {props.payoutInfos.paymentMethodRequests ?
                    <Button key='withdrawalTableHeaderActionButton' className='xs-show' onClick={() => handleNewWithdrawlRequest()} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Request</Button>
                    : null
                }
                {
                    props.payoutInfos.withdrawalRequests ?
                        <Table id='payoutWithdrawalTable' headerBackgroundColor="gray-10" header={withdrawalTableHeader()} body={withdrawalTableBody()} />
                        : <Table id='payoutWithdrawalsTable' headerBackgroundColor="gray-10" header={emptyWithdrawalTableHeder()} body={emptyWithdrawalTableBody('You must add a Payment Request Method before you can Request a Withdrawal')} />
                }
            </Card>
            <Modal hasClose={false} modalTitle='New Withdrawal Request' opened={withdrawalModalOpened} toggle={() => setWithdrawalModalOpened(!withdrawalModalOpened)}>
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