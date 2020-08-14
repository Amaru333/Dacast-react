export enum ActionTypes {
    GET_WITHDRAWALS = "@@admin_withdrawals/GET_WITHDRAWALS"
}
export type Status = 'completed' | 'pending' | 'cancelled'

export interface Withdrawal {
    id: string;
    accountId: string;
    amount: number;
    totalBalance: number;
    requestedDate: number;
    previous: number;
    completedDate: number;
    method: string;
    recurlyId: string;
    status: Status;
}

export const withdrawalsListInitialState: Withdrawal[] | false = false
