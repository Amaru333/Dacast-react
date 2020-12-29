export enum ActionTypes {
    GET_PLAN_DETAILS = "@@account_upgrade/GET_PLAN_DETAILS"
}

export interface CustomAllowance {
    amount: number;
    price: number;
    currentAmount: boolean;
}

export interface Plan {
    name: 'Starter' | 'Event' | 'Annual Scale' | 'Monthly Scale';
    code: string;
    allowanceCode: string;
    isActive: boolean;
    discount: number;
    price: Price;
    allowances: Allowances[]
    privileges: Privilege[]
    paymentFrequency: string;
    paymentTerm: number;
    commitment: number;
    selectedPrivileges: string[]
    privilegesTotal: number;
    termsAndConditions: boolean;
    selectedScalePlan?: Allowances;
}

export interface Allowances {
    code: string;
    bandwidth: number;
    storage: number;
}

export interface Privilege {
    code: string;
    price: Price;
    checked: boolean;
}

export interface Price {
    usd: number;
    gbp: number;
    eur: number;
    aud: number;
}

export interface Plans {
    starterPlan: Plan
    eventPlan: Plan
    scalePlanAnnual: Plan;
    scalePlanMonthly: Plan;
    threeDSecureToken?: string 
}

export interface PaidPrivilege {
    code: string;
    quantity: number;
}

export interface ChangePlanData {
    code: string;
    currency: 'USD';
    allowanceCode: string;
    privileges: Privilege[];
    selectedPrivileges: string[];
    token: string;
    token3Ds?: string;
}

export const upgradeInitialState: Plans = {
    starterPlan: null,
    eventPlan: null,
    scalePlanAnnual: null,
    scalePlanMonthly: null
}