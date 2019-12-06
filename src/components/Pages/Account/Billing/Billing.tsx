import React from 'react';
import { Table } from '../../../Table/Table';
import { Modal } from '../../../Modal/Modal';
import { Text } from '../../../Typography/Text';
import { Button } from '../../../FormsComponents/Button/Button';
import { Card } from '../../../Card/Card';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { useMedia } from '../../../../utils/utils';
import { PaymentMethodModal } from './PaymentMethodModal';
import { ProtectionModal } from './ProtectionModal';
import { ExtrasStepperFirstStep ,ExtrasStepperSecondStep } from './ExtrasModal';
import { CustomStepper } from '../../../Stepper/Stepper';


const Paypal = ['email@a.com'];

const Protection = [{
    type: 'Playback Protection',
    enabled: true,
    amount: '5GB',
    price: '$0.25 per GB'
}]

const Extras = [{
    type: 'Encoding',
    amount: '5GB',
    datePurchased: 'Nov, 03 2020',
    price: '$0.25 per GB'
}]

export const BillingPage = () => {

    const [selectedPaypalAccount, setSelectedPaypalAccount] = React.useState<string>(null);
    const [paypalModalOpened, setPaypaylModalOpened] = React.useState<boolean>(false);
    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [extrasModalOpened, setExtrasModalOpened] = React.useState<boolean>(false);
    const stepList = [ExtrasStepperFirstStep, ExtrasStepperSecondStep];

    React.useEffect(() => {
        recurly.configure('ewr1-hgy8aq1eSuf8LEKIOzQk6T');
    }, [])

    let smScreen = useMedia('(max-width: 780px)');

    const deletePaypalOption = (value: string) => {
        return 
    }
    const paypalTableHeaderElement = () => {
        return [
            <Text  key={"paypalTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>,
            <Text  key={"paypalTableEmailAddress"} size={14}  weight="med" color="gray-1">Email Address</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"paypalTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setSelectedPaypalAccount(null);setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>
        ]
    }

    const paypalBodyElement= () => {
        if(Paypal) {
            return Paypal.map((value, key) => {
                return [
                    <Text key={key.toString() +value} size={14}  weight="reg" color="gray-1">{value}</Text>,
                    <IconCheck><Icon key={key.toString() +value}>checked</Icon></IconCheck>,
                    <span></span>
                ]
            })
        }
    }

    const protectionTableHeaderElement = () => {
        return [
            <Text  key={"protectionTableType"} size={14}  weight="med" color="gray-1">Type</Text>,
            <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Enabled</Text>,
            <Text  key={"protectionTableAmount"} size={14}  weight="med" color="gray-1">Amount</Text>,
            <Text  key={"protectionTablePrice"} size={14}  weight="med" color="gray-1">Price</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"protectionTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable Protection</Button>
        ]
    }

    const protectionBodyElement= () => {
        if(Protection) {
            return Protection.map((value, key) => {
                return [
                    <Text key={key.toString() +value.type} size={14}  weight="reg" color="gray-1">{value.type}</Text>,
                    <IconCheck><Icon key={key.toString() +'enabled'}>{value.enabled ? 'checked' : ''}</Icon></IconCheck>,
                    <Text key={key.toString() +value.amount} size={14}  weight="reg" color="gray-1">{value.amount}</Text>,
                    <Text key={key.toString() +value.price} size={14}  weight="reg" color="gray-1">{value.price}</Text>,
                    <span></span>
                ]
            })
        }
    }


    const extrasTableHeaderElement = () => {
        return [
            <Text  key={"extrasTableType"} size={14}  weight="med" color="gray-1">Type</Text>,
            <Text  key={"extrasTableEnabled"} size={14}  weight="med" color="gray-1">Enabled</Text>,
            <Text  key={"extrasTableAmount"} size={14}  weight="med" color="gray-1">Amount</Text>,
            <Text  key={"extrasTablePrice"} size={14}  weight="med" color="gray-1">Date purchased</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"extrasTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setExtrasModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Purchase Extras</Button>
        ]
    }

    const extrasBodyElement= () => {
        if(Extras) {
            return Extras.map((value, key) => {
                return [
                    <Text key={key.toString() +value.type} size={14}  weight="reg" color="gray-1">{value.type}</Text>,
                    <Text key={key.toString() +value.amount} size={14}  weight="reg" color="gray-1">{value.amount}</Text>,
                    <Text key={key.toString() +value.price} size={14}  weight="reg" color="gray-1">{value.price}</Text>,
                    <Text key={key.toString() +value.datePurchased} size={14}  weight="reg" color="gray-1">{value.datePurchased}</Text>,
                    <span></span>
                ]
            })
        }
    }

    return (
        <div>   
            <Card>
                <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Payment Method</Text></TextStyle>
                <TextStyle className="px1 pb2" ><Text size={14} weight='reg' color='gray-1'>Add your payment type here so we can take all your money. Choose from PayPal or Card. You can only have one payment method at a time.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setSelectedPaypalAccount(null);}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Payment Method</Button>
                <Table className="col-12" id="paypalTable" header={paypalTableHeaderElement()} body={paypalBodyElement()} />
                
                <BorderStyle className="p1 mx1" />
                <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Protection</Text></TextStyle>
                <TextStyle className="px1 pb2" ><Text size={14} weight='reg' color='gray-3'>This is what we used to call overage protection. It will get triggered when the user runs out of storage or encoding.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable protection</Button>
                <Table className="col-12 mb1" id="protectionTable" header={protectionTableHeaderElement()} body={protectionBodyElement()} />
                
                <BorderStyle className="p1 mx1" />
                <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Extras</Text></TextStyle>
                <TextStyle className="px1 pb2" ><Text size={14} weight='reg' color='gray-3'>This is what you can purchase one off.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setExtrasModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Purchase extras</Button>
                <Table className="col-12 mb1" id="extrasTable" header={extrasTableHeaderElement()} body={extrasBodyElement()} />
            
            </Card>
            <Modal hasClose={false} title={(selectedPaypalAccount ? 'Edit' : 'Add')  + ' Payment Method'} toggle={() => setPaypaylModalOpened(!paypalModalOpened)} size='large' opened={paypalModalOpened}>
                <PaymentMethodModal toggle={setPaypaylModalOpened} />
            </Modal>
            <Modal hasClose={false} title='Enable protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                <ProtectionModal toggle={setProtectionModalOpened} />
            </Modal>
            <CustomStepper 
                opened={extrasModalOpened}
                stepperHeader='Purchase Extras'
                stepList={stepList}
                nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                stepTitles={['Cart', 'Payment']}
                lastStepButton="Purchase"
                functionCancel={setExtrasModalOpened}
                finalFunction={() => {console.log('yes')}}
            />

        </div>

    )
}

export const ToggleTextInfo = styled.p<{}>`
    margin-top: 0px;
    margin-block-end: 8px;
    display: inline-flex;
`

export const TextStyle = styled.span<{}>`
    display: block;
`

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

export const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`

export const IconCheck = styled.span`
    color:  ${props => props.theme.colors["green"]};
`