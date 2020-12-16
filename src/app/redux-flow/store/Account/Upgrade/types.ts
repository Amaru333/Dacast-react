export enum ActionTypes {
    GET_PLAN_DETAILS = "@@account_upgrade/GET_PLAN_DETAILS",
    CHANGE_ACTIVE_PLAN = "@@account_upgrade/CHANGE_ACTIVE_PLAN"
}

export interface CustomAllowance {
    amount: number;
    price: number;
    currentAmount: boolean;
}

export interface Plan {
    name: 'Annual Starter' | 'Event' | 'Annual Scale' | 'Monthly Scale';
    code: string;
    allownaceCode: string;
    isActive: boolean;
    discount: number;
    price: Price;
    allowances: Allowances[]
    privileges: Privilege[]
    selectedPrivileges: string[] // front end only
    privilegesTotal: number; // front end only
    termsAndConditions: boolean; // frontend only
    paymentFrequency: string;
    paymentTerm: number;
    is_customizable: boolean;
    commitment: number;
    is_available_per_default: boolean;
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
    checked: boolean; //frontend only
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
    activePlan: string  
}

export interface PaidPrivilege {
    code: string;
    quantity: number;
}

export interface ChangePlan {
    planCode: string;
    currency: string;
    couponCode: string;
    allowances: string;
    paidPrivileges: PaidPrivilege[];
}

export const upgradeInitialState: Plans = {
    starterPlan: null,
    eventPlan: null,
    scalePlanAnnual: null,
    scalePlanMonthly: null,
    activePlan: null
}