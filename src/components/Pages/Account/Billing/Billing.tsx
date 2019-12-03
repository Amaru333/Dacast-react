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


const Paypal = ['email@a.com'];

export const BillingPage = () => {

    const [selectedPaypalAccount, setSelectedPaypalAccount] = React.useState<string>(null);
    const [paypalModalOpened, setPaypaylModalOpened] = React.useState<boolean>(false);

    React.useEffect(() => {
        recurly.configure('ewr1-hgy8aq1eSuf8LEKIOzQk6T');
    }, [])

    let smScreen = useMedia('(max-width: 780px)')

    const deletePaypalOption = (value: string) => {
        return 
    }
    const paypalTableHeaderElement = () => {
        return [
            <Text  key={"paypalTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>,
            <Text  key={"paypalTableEmailAddress"} size={14}  weight="med" color="gray-1">Email Address</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"paypalTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setSelectedPaypalAccount(null);setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Payment Method</Button>
        ]
    }

    const paypalBodyElement= () => {
        if(Paypal) {
            return Paypal.map((value, key) => {
                return [
                    <Text key={key.toString() +value} size={14}  weight="reg" color="gray-1">{value}</Text>,
                    <IconCheck><Icon key={key.toString() +value}>checked</Icon></IconCheck>,
                    <IconContainer className="iconAction" key={key.toString()+value}><Icon onClick={(event) => {event.preventDefault();deletePaypalOption(value)}} >delete</Icon><Icon onClick={(event) => {event.preventDefault();setSelectedPaypalAccount(value); }}>edit</Icon> </IconContainer>
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
            </Card>
            <Modal hasClose={false} title={(selectedPaypalAccount ? 'Edit' : 'Add')  + ' Payment Method'} toggle={() => setPaypaylModalOpened(!paypalModalOpened)} size='large' opened={paypalModalOpened}>
                <PaymentMethodModal toggle={setPaypaylModalOpened} />
            </Modal>

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