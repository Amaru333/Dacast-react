import axios from 'axios'
import { CreditCardPayment, PaypalPayment, PlaybackProtection, Extras } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';


const getBillingPagePaymentMethodService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/billing', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveBillingPagePaymentMethodService = async (data: CreditCardPayment | PaypalPayment) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.post(process.env.API_BASE_URL + '/accounts/' + userId + '/billing/payment-method', 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const addBillingPagePaymenPlaybackProtectionService = (data: PlaybackProtection) => {
    return axios.post(urlBase + 'billing-playback-protection', {...data})
}

const editBillingPagePaymenPlaybackProtectionService = async (data: PlaybackProtection) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/accounts/' + userId + '/billing/playback-protection', 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteBillingPagePaymenPlaybackProtectionService = (data: PlaybackProtection) => {
    return axios.delete(urlBase + 'billing-playback-protection', {data:{...data}})
}

const addBillingPageExtrasService = (data: Extras) => {
    return axios.post(urlBase + 'billing-extras', {...data})
}

const getProductDetailsService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/products', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}


export const BillingServices = {
    getBillingPagePaymentMethodService,
    saveBillingPagePaymentMethodService,
    addBillingPagePaymenPlaybackProtectionService,
    editBillingPagePaymenPlaybackProtectionService,
    deleteBillingPagePaymenPlaybackProtectionService,
    addBillingPageExtrasService,
    getProductDetailsService
} 