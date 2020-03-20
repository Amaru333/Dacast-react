export enum ActionTypes {
    GET_ACCOUNT_ALLOWANCES = "@@admin_accounts/GET_ACCOUNT_ALLOWANCES",
    SAVE_ACCOUNT_ALLOWANCES = "@@admin_account/SAVE_ACCOUNT_ALLOWANCES"
}

export interface Allowances {
    data: number;
    encoding: number;
    storage: number;
}

export const accountAllowancesDefaultState: Allowances | false = false