import React from 'react';
import { Card } from '../../../../components/Card/Card';
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
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { formatPostBillingPaymentMethod } from '../../../redux-flow/store/Account/Plan/viewModel';
import { useTranslation } from 'react-i18next';

export const BillingPage = (props: BillingContainerProps) => {

    const [paymentMethodModalOpened, setPaymentMethodModalOpened] = React.useState<boolean>(false);
    const [billingInfo, setBillingInfo] = React.useState<BillingPageInfos>(props.billingInfos)
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const { t } = useTranslation()

    React.useEffect(() => {
        setBillingInfo(props.billingInfos)
    }, [props.billingInfos])

    React.useEffect(() => {
        if (location.hash === '#update-payment-method') {
            setPaymentMethodModalOpened(true)
            history.replaceState(null, null, ' ');
        }
    }, [location.hash])

    let smScreen = useMedia('(max-width: 780px)');

    const savePaymentMethod = (token: string, threeDSecureActionToken: string, callback: React.Dispatch<React.SetStateAction<string>>) => {
        dacastSdk.postBillingPaymentMethod(formatPostBillingPaymentMethod({token: token}))
        .then(response => {
            if (response && response.tokenID) {
                callback(response.tokenID)
            }
            else {
                setPaymentMethodModalOpened(false)
                setContentLoading(true)
                props.getBillingPageInfos()
                .then(() => setContentLoading(false))
            }
        })
    }

    const savePaymentMethod3DS = (token: string, threeDSecureActionToken: string) => {
        dacastSdk.postBillingPaymentMethod(formatPostBillingPaymentMethod({token: token, threeDSToken: threeDSecureActionToken}))
        .then(response => {
            setPaymentMethodModalOpened(false)
            setContentLoading(true)
            props.getBillingPageInfos()
            .then(() => setContentLoading(false))
        })
    }

    const paypalTableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"paypalTablePaymentType"} size={14}  weight="med" color="gray-1">{t('account_billing_payment_type_title')}</Text>},
            {cell: <Text  key={"paypalTableBillingId"} size={14}  weight="med" color="gray-1">Billing ID</Text>},
            {cell: <Text  key={"paypalTableEmailAddress"} size={14}  weight="med" color="gray-1">{t('account_profile_email_title')}</Text>},
            {cell: <Text  key={"paypalTableActive"} size={14}  weight="med" color="gray-1">{t('account_billing_active_title')}</Text>},
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"paypalTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">{t('account_billing_update_payment_method_button')}</Button>}
        ]}
    }

    const paypalBodyElement= () => {
        if(props.billingInfos.paymentMethod.type === "paypal") {
            return [{data:[
                <Text key={'paypalTablePaypalType'} size={14}  weight="reg" color="gray-1">PayPal</Text>,
                <Text key={'paypalTable' + props.billingInfos.paymentMethod.billingID} size={14}  weight="reg" color="gray-1">{props.billingInfos.paymentMethod.billingID}</Text>,
                <Text key={'paypalTable' + props.billingInfos.paymentMethod.email} size={14}  weight="reg" color="gray-1">{props.billingInfos.paymentMethod.email}</Text>,
                <IconStyle key={'paypalTableActiveField'} coloricon='green' >checked</IconStyle>,
                <span key={'paypalTableBodyEmptyCell'}></span>
            ]}]
        }
    }

    const creditCardTableHeaderElement = () => {
        return props.billingInfos.paymentMethod.type === "card" ? {data: [
            {cell: <Text  key={"creditCardTablePaymentType"} size={14}  weight="med" color="gray-1">{t('account_billing_payment_type_title')}</Text>},
            {cell: <Text  key={"creditCardTableCardType"} size={14}  weight="med" color="gray-1">{t('account_billing_card_type_title')}</Text>},
            {cell: <Text  key={"creditCardTableCardHolder"} size={14}  weight="med" color="gray-1">{t('account_billing_card_holder_title')}</Text>},
            {cell: <Text  key={"creditCardTableCardNumber"} size={14}  weight="med" color="gray-1">{t('account_billing_card_number_title')}</Text>},
            {cell: <Text  key={"creditCardTableExpiry"} size={14}  weight="med" color="gray-1">{t('account_billing_expiry_title')}</Text>},
            {cell: <Text  key={"creditCardTableActive"} size={14}  weight="med" color="gray-1">{t('account_billing_active_title')}</Text>},
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"creditCardTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">{t('account_billing_update_payment_method_button')}</Button>}
        ]} 
            : {data: [
                {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"creditCardTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">{t('account_billing_update_payment_method_button')}</Button>}

            ]}
    }

    const creditCardBodyElement= () => {
        if(props.billingInfos.paymentMethod.type === "card") {
            return [{data:[
                <Text key={'creditCardTableCreditCard'} size={14}  weight="reg" color="gray-1">Credit Card</Text>,
                <Text key={'creditCardTableCreditCard' + props.billingInfos.paymentMethod.cardType} size={14}  weight="reg" color="gray-1">{props.billingInfos.paymentMethod.cardType}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.paymentMethod.firstName} size={14}  weight="reg" color="gray-1">{props.billingInfos.paymentMethod.firstName} {props.billingInfos.paymentMethod.lastName}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.paymentMethod.lastFour} size={14}  weight="reg" color="gray-1">xxxx-xxxx-xxxx-{props.billingInfos.paymentMethod.lastFour}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.paymentMethod.expiryMonth} size={14}  weight="reg" color="gray-1">{("0" + props.billingInfos.paymentMethod.expiryMonth).slice(-2) + '/' + props.billingInfos.paymentMethod.expiryYear}</Text>,
                <IconStyle key={'creditCardTableActive'} coloricon='green'>checked</IconStyle>,
                <span key={'creditCardTableBodyEmptyCell'}></span>
            ]}
            ]
        }
    }

    return (
        <React.Fragment>
            <Card>
                <div className="py2" >
                    <Text size={20} weight='med' color='gray-1'>{t('account_billing_payment_method_title')}</Text>
                </div>
                <div className="pb2" >
                    <Text size={14} weight='reg' color='gray-1'>{t('account_billing_payment_method_description')}</Text>
                </div>
                <Button className={"left "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setPaymentMethodModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Payment Method</Button>
                {
                    props.billingInfos.paymentMethod.type === "paypal" ? 
                        <Table contentLoading={contentLoading} className="col-12" headerBackgroundColor="gray-10" id="paypalTable" header={paypalTableHeaderElement()} body={paypalBodyElement()} />

                        : props.billingInfos.paymentMethod.type === "card" ?                
                            <Table contentLoading={contentLoading} className="col-12" headerBackgroundColor="gray-10" id="creditCardTable" header={creditCardTableHeaderElement()} body={creditCardBodyElement()} />
                            : 
                            <Table className="col-12" headerBackgroundColor="gray-10" id="paymentMethodTable" header={creditCardTableHeaderElement()} body={emptyContentListBody('Add a Payment Method so you can purchase Plans, Allowances and Enable Playback Protection')} />
                }
            </Card>
            <RecurlyProvider publicKey={process.env.RECURLY_TOKEN}>
                <Elements>
                    <Modal 
                        hasClose={false} 
                        modalTitle={(props.billingInfos.paymentMethod ? t('account_billing_edit_payment_method_button') : t('account_billing_edit_payment_method_button'))} 
                        toggle={() => setPaymentMethodModalOpened(!paymentMethodModalOpened)} size='large' 
                        opened={paymentMethodModalOpened}>
                        <PaymentMethodModal billingInfo={billingInfo} callback={() => {}} actionButton={() => {}} toggle={setPaymentMethodModalOpened} isUpdate purchase3DS={savePaymentMethod3DS} savePaymentMethod={savePaymentMethod} />
                    </Modal>
                </Elements>
            </RecurlyProvider>
        </React.Fragment>
    )
}