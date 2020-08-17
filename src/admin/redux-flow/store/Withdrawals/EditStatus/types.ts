
export enum ActionTypes {
    GET_WITHDRAWAL_INFO = "@@admin_accounts/GET_WITHDRAWAL_INFO",
    SAVE_WITHDRAWAL_STATUS = "@@admin_accounts/SAVE_WITHDRAWAL_STATUS"
}

export interface WithdrawalData {
    id: string;
    routingNumber: string;
    accountNumber: number;
    ownerLastName: string;
    ownerFirstName: string;
    bankName: string;
    bankAddress: string;
    bankAccountName: string;
    bankAccountAddress: string;
    accountType: number;
    comment: string;
}

export interface WithdrawalInfo {
    id: string;
    accountId: string;
    amount: number;
    requestedDate: number;
    completed: boolean;
    method: string;
    recurlyId: string;
    status: string;
    data: WithdrawalData;
}

export const editWithdrawalDefaultState: WithdrawalInfo = null;

