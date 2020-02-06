import axios from 'axios';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getInvoices = () => {
    return axios.get(urlBase + 'account-invoices');
}

export const InvoicesServices = {
    getInvoices
}