import axios from 'axios';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getTransactions = () => {
    return axios.get(urlBase + 'paywall-transactions');
}

export const TransactionsServices = {
    getTransactions
}