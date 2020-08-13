import { PendingOrder } from './types';
import { axiosClient } from '../../../../utils/axiosClient';

const getPendingOrders = () => {
    return axiosClient.get('pending-orders');
}

const updatePendingOrder = (data: PendingOrder) => {
    return axiosClient.put('pending-orders', {...data});
}

export const PendingOrdersServices = {
    getPendingOrders,
    updatePendingOrder
}