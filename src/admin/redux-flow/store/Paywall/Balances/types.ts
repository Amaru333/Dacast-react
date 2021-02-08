export enum ActionTypes {
    GET_BALANCES = "@@admin_paywall/GET_BALANCES"
}

export interface Line {
    lineType: "arbitrary" | "inplayer",
    amount: number,
    date: string,
    note: string,
    salesforceId: string
    conversionRateToAccountCurency?: number,
    currency?: string,
    fee?: number,
    title?: string,
    transactionType?: string
}

export interface AccountBalanceInfo {
    lines: Line[];
    balance: number | null;
    total: number;
}

export const balancesInitialState: AccountBalanceInfo | false = false
