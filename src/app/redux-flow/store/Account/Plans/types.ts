export enum ActionTypes {
    GET_PLAN_DETAILS = "@@account_plans/GET_PLAN_DETAILS",
    CHANGE_ACTIVE_PLAN = "@@account_plans/CHANGE_ACTIVE_PLAN"
}

export interface CustomAllowance {
    amount: number;
    price: number;
    currentAmount: boolean;
}

// export interface Plan {
//     name: 'developer' | 'event' | 'scale';
//     firstStep: {
//         included: {
//             defaultBanwidth: number;
//             defaultStorage: number;
//             defaultTranscoding: number;
//             price: number;
//         };
//         custom?: {
//             [key: string]: CustomAllowance[];
//         };
//         total: number;
//     };
//     secondStep: {
//         included: string[];
//         custom: {
//             [key: string]: {checked: boolean; price: number};
//         };
//         total: number;
//     };
//     paymentFrequency: 'Annually' | 'Monthly';
//     termsAndConditions: boolean;
//     action: 'custom' | 'purchase';
// }

export interface Plan {
    name: 'Developer' | 'Event' | 'Annual Scale' | 'Monthly Scale';
    code: string;
    isActive: boolean;
    discount_percent: number;
    default_price: Price;
    allowances: Allowances[]
    default_privileges: Privilege[]
    privilegesTotal: number; // front end only
    termsAndConditions: boolean; // frontend only
    default_allowance_code: string;
    interval_unit: string;
    interval_length: number;
    is_customizable: boolean;
    default_commitment: number;
    is_available_per_default: boolean;
    selectedScalePlan?: Allowances;
}

export interface Allowances {
    code: string;
    defaultBandwidth: number;
    defaultStorage: number;
}

export interface Privilege {
    code: string;
    price: Price;
    checked: boolean;
    editable_quantity: boolean
}

export interface Price {
    usd: number;
    gbp: number;
    eur: number;
    aud: number;
}

export interface Plans {
    developer: {
        developerAnnual: Plan
    };
    event: {
        eventAnnual: Plan
    };
    scale: {
        scaleAnnual: Plan;
        scaleMonthly: Plan;
    };
    
}

export const plansInitialState: Plans = {
    developer: null,
    event: null,
    scale: null
}