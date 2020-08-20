export enum ActionTypes {
    GET_ACCOUNT_ALLOWANCES = "@@admin_accounts/GET_ACCOUNT_ALLOWANCES",
    SAVE_ACCOUNT_ALLOWANCES = "@@admin_account/SAVE_ACCOUNT_ALLOWANCES"
}

export interface Allowances {
    data: {
        allocated: number;
        consumed: number;
    };
    storage: {
        allocated: number;
        consumed: number;
    };
    encoding: {
        allocated: number;
        consumed: number;
    };
}

export interface PutAllowances {
    type: 'data' | 'storage' | 'encoding';
    amount: number;
}

export const accountAllowancesDefaultState: Allowances | false = false