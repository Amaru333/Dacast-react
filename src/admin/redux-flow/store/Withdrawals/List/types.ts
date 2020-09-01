export enum ActionTypes {
    GET_WITHDRAWALS = "@@admin_withdrawals/GET_WITHDRAWALS"
}
export type Status = 'completed' | 'pending' | 'cancelled'

export interface Withdrawal {
    id: string;
    accountSalesforceId: string;
    accountId: string;
    amount: number;
    currency: string;
    totalBalance: number;
    requestedDate: number;
    completedDate: number;
    method: string;
    recurlyId: string;
    status: Status;
}

export interface WithdrawalsList {
    list: Withdrawal[];
    total: number
}

export const withdrawalsListInitialState: WithdrawalsList | false = false
