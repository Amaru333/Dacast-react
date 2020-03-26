export enum ActionTypes {
    GET_ACCOUNT_LOGS = "@@admin_accounts/GET_ACCOUNT_LOGS"
}

export interface Logs {
    date: number;
    email: string;
    source: string;
    event: string;
}

export const accountLogsDefaultState: Logs[] | false = false