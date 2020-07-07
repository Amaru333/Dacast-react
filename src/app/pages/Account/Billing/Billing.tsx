import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { TextStyle } from '../../../shared/Billing/BillingStyle';
import { Text } from '../../../../components/Typography/Text';
import { useMedia } from '../../../../utils/utils';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { Modal } from '../../../../components/Modal/Modal';
import { PaymentMethodModal } from '../Plan/PaymentMethodModal';
import { BillingContainerProps } from '../../../containers/Account/Billing';
import { IconStyle } from '../../../../shared/Common/Icon';
import { emptyContentListBody } from '../../../shared/List/emptyContentListState';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan/types';

export const BillingPage = (props: BillingContainerProps) => {

    const [paymentMethod, setpaymentMethod] = React.useState<string>(null);
    const [paymentMethodModalOpened, setPaymentMethodModalOpened] = React.useState<boolean>(false);
    const [billingInfo, setBillingInfo] = React.useState<BillingPageInfos>(props.billingInfos)

    let smScreen = useMedia('(max-width: 780px)');

    React.useEffect(()=> {checkPaymentMethod()}, [props.billingInfos.paypal, props.billingInfos.creditCard])

    const checkPaymentMethod = () => {
        if(props.billingInfos.paypal) {
            setpaymentMethod('paypal');
        }
        else if(props.billingInfos.creditCard) {
            setpaymentMethod('creditCard');
        }
        else {
            setpaymentMethod(null);
        }
    }

    const onSubmitFunctions = () => {
        props.saveBillingPagePaymentMethod(billingInfo.creditCard);
        setPaymentMethodModalOpened(false)
    }

    const paypalTableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"paypalTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>},
            {cell: <Text  key={"paypalTableBillingId"} size={14}  weight="med" color="gray-1">Billing ID</Text>},
            {cell: <Text  key={"paypalTableEmailAddress"} size={14}  weight="med" color="gray-1">Email Address</Text>},
            {cell: <Text  key={"paypalTableActive"} size={14}  weight="med" color="gray-1">Active</Text>},
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"paypalTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>}
        ]}
    }

    const paypalBodyElement= () => {
        if(props.billingInfos.paypal) {
            return [{data:[
                <Text key={'paypalTablePaypalType'} size={14}  weight="reg" color="gray-1">PayPal</Text>,
                <Text key={'paypalTable' + props.billingInfos.paypal.billingId} size={14}  weight="reg" color="gray-1">{props.billingInfos.paypal.billingId}</Text>,
                <Text key={'paypalTable' + props.billingInfos.paypal.emailAddress} size={14}  weight="reg" color="gray-1">{props.billingInfos.paypal.emailAddress}</Text>,
                <IconStyle key={'paypalTableActiveField'} coloricon='green' >checked</IconStyle>,
                <span key={'paypalTableBodyEmptyCell'}></span>
            ]}]
        }
    }

    const creditCardTableHeaderElement = () => {
        return props.billingInfos.paymentMethod.type === "card" ? {data: [
            {cell: <Text  key={"creditCardTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>},
            {cell: <Text  key={"creditCardTableCardHolder"} size={14}  weight="med" color="gray-1">Card Holder</Text>},
            {cell: <Text  key={"creditCardTableCardNumber"} size={14}  weight="med" color="gray-1">Card Number</Text>},
            {cell: <Text  key={"creditCardTableExpiry"} size={14}  weight="med" color="gray-1">Expiry</Text>},
            {cell: <Text  key={"creditCardTableActive"} size={14}  weight="med" color="gray-1">Active</Text>},
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"creditCardTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>}
        ]} 
            : {data: [
                {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"creditCardTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>}

            ]}
    }

    const creditCardBodyElement= () => {
        if(props.billingInfos.paymentMethod.type === "card") {
            return [{data:[
                <Text key={'creditCardTableCreditCard'} size={14}  weight="reg" color="gray-1">Credit Card</Text>,
                <Text key={'creditCardTable' + props.billingInfos.paymentMethod.firstName} size={14}  weight="reg" color="gray-1">{props.billingInfos.paymentMethod.firstName} {props.billingInfos.paymentMethod.lastName}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.paymentMethod.lastFour} size={14}  weight="reg" color="gray-1">{props.billingInfos.paymentMethod.lastFour}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.paymentMethod.expiryMonth} size={14}  weight="reg" color="gray-1">{props.billingInfos.paymentMethod.expiryMonth + '/' + props.billingInfos.paymentMethod.expiryYear}</Text>,
                <IconStyle key={'creditCardTableActive'} coloricon='green'>checked</IconStyle>,
                <span key={'creditCardTableBodyEmptyCell'}></span>
            ]}
            ]
        }
    }


    
    return (
        <React.Fragment>
            <Card>
                <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Payment Method</Text></TextStyle>
                    <TextStyle className="pb2" ><Text size={14} weight='reg' color='gray-1'>Your chosen Payment Method will be charged for your Plan, optional Playback Protection, Extras and Overages. Choose from PayPal or Card. If you wish to pay using Check, Wire or Transfer, then please Contact Us.</Text></TextStyle>
                    <Button className={"left "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Payment Method</Button>
                    {
                        props.billingInfos.paypal? 
                            <Table className="col-12" headerBackgroundColor="gray-10" id="paypalTable" header={paypalTableHeaderElement()} body={paypalBodyElement()} />

                            : props.billingInfos.paymentMethod.type === "card" ?                
                                <Table className="col-12" headerBackgroundColor="gray-10" id="creditCardTable" header={creditCardTableHeaderElement()} body={creditCardBodyElement()} />
                                : 
                                <Table className="col-12" headerBackgroundColor="gray-10" id="paymentMethodTable" header={creditCardTableHeaderElement()} body={emptyContentListBody('Add a Payment Method so you can purchase Plans, Allowences and Enable Playback Protection')} />


                    }

                    
            </Card>
            <RecurlyProvider publicKey="ewr1-hgy8aq1eSuf8LEKIOzQk6T">
                <Elements>
                    <Modal 
                        hasClose={false} 
                        modalTitle={(paymentMethod ? 'Edit' : 'Add')  + ' Payment Method'} 
                        toggle={() => setPaymentMethodModalOpened(!paymentMethodModalOpened)} size='large' 
                        opened={paymentMethodModalOpened}>
                        <PaymentMethodModal billingInfo={billingInfo} callback={setBillingInfo} actionButton={() => onSubmitFunctions()} toggle={setPaymentMethodModalOpened} />
                    </Modal>
                </Elements>
            </RecurlyProvider>
        </React.Fragment>
    )
}