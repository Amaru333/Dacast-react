import axios from 'axios'
import { CreditCardPayment, PaypalPayment } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';


const getBillingPagePaymentMethodService = () => {
    return axios.get(urlBase + 'billing-infos');
}

const saveBillingPagePaymentMethodService = (data: CreditCardPayment | PaypalPayment) => {
    return axios.put(urlBase + 'billing-payment-method', {...data})
}

export const BillingServices = {
    getBillingPagePaymentMethodService,
    saveBillingPagePaymentMethodService,
} 