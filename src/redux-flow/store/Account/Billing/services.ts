import axios from 'axios'
import { CreditCardPayment, PaypalPayment, PlaybackProtection, Extras } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';


const getBillingPagePaymentMethodService = () => {
    return axios.get(urlBase + 'billing-infos');
}

const saveBillingPagePaymentMethodService = (data: CreditCardPayment | PaypalPayment) => {
    return axios.post(urlBase + 'billing-payment-method', {...data})
}

const addBillingPagePaymenPlaybackProtectionService = (data: PlaybackProtection) => {
    return axios.post(urlBase + 'billing-playback-protection', {...data})
}

const editBillingPagePaymenPlaybackProtectionService = (data: PlaybackProtection) => {
    return axios.put(urlBase + 'billing-playback-protection', {...data})
}

const deleteBillingPagePaymenPlaybackProtectionService = (data: PlaybackProtection) => {
    return axios.delete(urlBase + 'billing-playback-protection', {data:{...data}})
}

const addBillingPageExtrasService = (data: Extras) => {
    return axios.post(urlBase + 'billing-extras', {...data})
}


export const BillingServices = {
    getBillingPagePaymentMethodService,
    saveBillingPagePaymentMethodService,
    addBillingPagePaymenPlaybackProtectionService,
    editBillingPagePaymenPlaybackProtectionService,
    deleteBillingPagePaymenPlaybackProtectionService,
    addBillingPageExtrasService
} 