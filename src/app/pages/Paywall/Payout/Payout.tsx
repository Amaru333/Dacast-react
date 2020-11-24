import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { PaywallPaymentMethod } from './PaywallPaymentMethod';
import { Modal } from '../../../../components/Modal/Modal';
import { WithdrawalModal } from './WithdrawalModal';
import { PayoutComponentProps } from '../../../containers/Paywall/Payout';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { IconStyle, ActionIcon, IconContainer } from '../../../../shared/Common/Icon';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { PaymentMethod } from '../../../redux-flow/store/Paywall/Payout';
import { tsToLocaleDate } from '../../../../utils/formatUtils';
import { Divider } from '../../../shared/Common/MiscStyle';

export const PayoutPage = (props: PayoutComponentProps) => {

    const [displayPaymentMethodRequest, setDisplayPaymentMethodRequest] = React.useState<boolean>(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentMethod>(null)
    const [deletePaymentMethodWarningModalOpened, setDeletePaymentMethodWarningModalOpened] = React.useState<boolean>(false)
    

    const paymentMethodTableHeader = () => {
        return {
            data: [
                { cell: <Text key='paymentMethodTableHeaderPayoutType' size={14} weight='med'>Name</Text> },
                { cell: <Text key='paymentMethodTableHeaderlastUpdated' size={14} weight='med'>Payout Type</Text> },
                { cell: <Button key='paymentMethodTableHeaderActionButton' className='right mr2 sm-show' onClick={() => {setSelectedPaymentMethod(null); setDisplayPaymentMethodRequest(true) }} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Method</Button> }
            ]
        }
    }

    const paymentMethodTableBody = () => {
        if (props.payoutInfos.paymentMethods) {
            return props.payoutInfos.paymentMethods.map((item, i) => {
                return {
                    data: [
                        <Text key={'paymentMethodTableBodyPaymentType' + i} size={14} weight='reg' color='gray-3'>{item.paymentMethodName}</Text>,
                        <Text key={'paymentMethodTableBodyDateCreated' + i} size={14} weight='reg' color='gray-3'>{item.paymentMethodType}</Text>,
                        <IconContainer className="iconAction" key={'paymentMethodTableBodyActionButtons' + i}>
                            <ActionIcon>
                                <IconStyle id={"deleteTooltip" + i} onClick={() => { props.payoutInfos.withdrawalRequests.some(r => r.paymentMethodId === item.id) ? setDeletePaymentMethodWarningModalOpened(true) : props.deletePaymentMethod(item) }}>delete</IconStyle>
                                <Tooltip target={"deleteTooltip" + i}>Delete</Tooltip>
                            </ActionIcon>
                            <ActionIcon>
                                <IconStyle id={"editTooltip" + i} onClick={() => {setSelectedPaymentMethod(item);setDisplayPaymentMethodRequest(true) }}>edit</IconStyle>
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
                { cell: <Button key='paymentMethodTableHeaderActionButton' className='right sm-show mr2' onClick={() => { setSelectedPaymentMethod(null);setDisplayPaymentMethodRequest(true) }} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Method</Button> }
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
        if (props.payoutInfos.paymentMethods && props.payoutInfos.paymentMethods.length !== 0) {
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
        if (props.payoutInfos.withdrawalRequests && props.payoutInfos.paymentMethods) {
            return props.payoutInfos.withdrawalRequests.map((item, i) => {
                const color = item.status === 'Completed' ? 'green' : item.status === 'Cancelled' ? 'red' : 'yellow';
                const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
                return {
                    data: [
                        <Text key={'withdrawalRequestTableBodyRequestType' + i} size={14} weight='reg' color='gray-3'>{props.payoutInfos.paymentMethods.find(p => p.id ===item.paymentMethodId) ? props.payoutInfos.paymentMethods.find(p => p.id ===item.paymentMethodId).paymentMethodName : ''}</Text>,
                        <Text key={'withdrawalRequestTableBodyCurrency' + i} size={14} weight='reg' color='gray-3'>{item.currency}</Text>,
                        <Text key={'withdrawalRequestTableBodyAmount' + i} size={14} weight='reg' color='gray-3'>{item.amount}</Text>,
                        <Text key={'withdrawalRequestTableBodyRequestDate' + i} size={14} weight='reg' color='gray-3'>{tsToLocaleDate(item.requestDate)}</Text>,
                        <Text key={'withdrawalRequestTableBodyTransferDate' + i} size={14} weight='reg' color='gray-3'>{isNaN(item.transferDate) || item.transferDate === 0 ? '' : tsToLocaleDate(item.transferDate)}</Text>,
                        <Label color={color} backgroundColor={BackgroundColor} label={item.status} />,
                        <IconContainer className="iconAction" key={'withdrawalRequestTableBodyDeleteButton' + i}>
                            <ActionIcon>
                                <IconStyle id={"deleteTooltip" + i} onClick={() => props.cancelWithdrawalRequest({...item, status: 'Cancelled'})}>delete</IconStyle>
                                <Tooltip target={"deleteTooltip" + i}></Tooltip>
                            </ActionIcon>
                        </IconContainer>
                    ]
                }
            })
        }
    }

    const emptyWithdrawalTableHeder = () => {
        return props.payoutInfos.paymentMethods ? {
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
        return props.payoutInfos.paymentMethods ? [{data: [
            <div key={'emptyWithdrawalsTableBody'} className='right'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>,
            <div key={'emptyWithdrawalsTableBody'} className='center'></div>
        ]}] :
            [{data: [
                <div key={'emptyWithdrawalsTableBody'} className='center'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
            ]

            }]}

    return displayPaymentMethodRequest ?
        <PaywallPaymentMethod addPaymentMethodRequest={selectedPaymentMethod ? props.updatePaymentMethod : props.addPaymentMethod} displayPage={setDisplayPaymentMethodRequest} selectedPaymentMethod={selectedPaymentMethod} />
        :
        <div>
            <Card>
                <Text size={20} weight='reg'>Withdrawal Method</Text>
                <Text className='pt2 pb1' size={14} weight='reg'>Add ways to receive withdrawals from your paywall balance.</Text>
                <Button key='paymentMethodTableHeaderActionButton' className='col col-12 xs-show' onClick={() => { setDisplayPaymentMethodRequest(true) }} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Method</Button>
                {
                    props.payoutInfos.paymentMethods && props.payoutInfos.paymentMethods.length > 0 ?
                        <Table id='paywallPaymentMethodTable' headerBackgroundColor="gray-10" header={paymentMethodTableHeader()} body={paymentMethodTableBody()} />
                        : <Table id='paymentMethodEmptyTable' headerBackgroundColor="gray-10" header={emptyPaymentMethodTableHeader()} body={emptyPaymentMethodTableBody('Add a Withdrawal Method so you can withdraw money from your Paywall balance')} />
                }
                <Divider className='mt2 mb1' />
                <Text className='pt2' size={20} weight='reg'>Withdrawal Requests</Text>
                <Text className='pt2 py1' size={14} weight='reg'>Request a withdrawal from your paywall balance.</Text>
                {props.payoutInfos.paymentMethods &&
                    <Button key='withdrawalTableHeaderActionButton' className='xs-show' onClick={() => handleNewWithdrawlRequest()} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Withdrawal Request</Button>
                }
                {
                    props.payoutInfos.withdrawalRequests && props.payoutInfos.withdrawalRequests.length > 0 ?
                        <Table id='payoutWithdrawalTable' headerBackgroundColor="gray-10" header={withdrawalTableHeader()} body={withdrawalTableBody()} />
                        : <Table id='payoutWithdrawalsTable' headerBackgroundColor="gray-10" header={emptyWithdrawalTableHeder()} body={emptyWithdrawalTableBody('You must add a Payment Request Method before you can Request a Withdrawal')} />
                }
            </Card>
            <Modal hasClose={false} modalTitle='New Withdrawal Request' opened={withdrawalModalOpened} toggle={() => setWithdrawalModalOpened(!withdrawalModalOpened)}>
                {
                    withdrawalModalOpened &&
                    <WithdrawalModal paymentList={props.payoutInfos.paymentMethods} action={props.addWithdrawalRequest} toggle={setWithdrawalModalOpened} />

                }
            </Modal>
            {
                deletePaymentMethodWarningModalOpened && 
                <Modal size='small' icon={{name:'info_outlined', color: 'yellow'}} hasClose={false} modalTitle='You have pending requests' opened={deletePaymentMethodWarningModalOpened} toggle={() => setDeletePaymentMethodWarningModalOpened(!deletePaymentMethodWarningModalOpened)}>
                <div className='flex flex-column'>
                    <Text size={14} weight='reg'>You cannot delete a Withdrawal Method that’s being used by an incomplete Withdrawal Request.</Text>
                    <Text size={14} weight='reg'>Either delete the request or wait until it is completed before trying again.</Text>
                    <div className='mt2'>
                        <Button buttonColor='blue' typeButton='primary' sizeButton='large' onClick={() => setDeletePaymentMethodWarningModalOpened(false)}>OK</Button>
                    </div>
                </div>
            </Modal>
            }

        </div>
}