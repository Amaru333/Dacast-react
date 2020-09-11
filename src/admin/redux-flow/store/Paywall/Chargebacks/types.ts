export enum ActionTypes {
    SUBMIT_CHARGEBACK = "@@admin_paywall/SUBMIT_CHARGEBACK"
}

export interface Chargeback {
    amount: number;
    salesforceId: string;
    type: string;
}



export const chargebackInitialState: Chargeback | false = false
