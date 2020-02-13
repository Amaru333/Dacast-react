import axios from 'axios';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPendingOrders = () => {
    return axios.get(urlBase + 'account-pendingorders');
}

export const PendingOrdersServices = {
    getPendingOrders
}