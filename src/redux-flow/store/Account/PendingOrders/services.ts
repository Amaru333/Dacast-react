import axios from 'axios';
import { PendingOrder } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPendingOrders = () => {
    return axios.get(urlBase + 'pending-orders');
}

const updatePendingOrder = (data: PendingOrder) => {
    return axios.put(urlBase + 'account-pendingorders', {...data});
}

export const PendingOrdersServices = {
    getPendingOrders,
    updatePendingOrder
}