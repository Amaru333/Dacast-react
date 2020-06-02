export enum ActionTypes {
    GET_PLAN_DETAILS = "@@account_plans/GET_PLAN_DETAILS",
    CHANGE_ACTIVE_PLAN = "@@account_plans/CHANGE_ACTIVE_PLAN"
}

export interface CustomAllowance {
    amount: number;
    price: number;
    currentAmount: boolean;
}

export interface Plan {
    name: 'developer' | 'event' | 'scale';
    firstStep: {
        included: {
            defaultBanwidth: number;
            defaultStorage: number;
            defaultTranscoding: number;
            price: number;
        };
        custom?: {
            [key: string]: CustomAllowance[];
        };
        total: number;
    };
    secondStep: {
        included: string[];
        custom: {
            [key: string]: {checked: boolean; price: number};
        };
        total: number;
    };
    paymentFrequency: 'Annually' | 'Monthly';
    termsAndConditions: boolean;
    action: 'custom' | 'purchase';
}

// export interface Plan {
//     name: 'developer' | 'event' | 'scale' | 'scaleMonthly';
//     code: string;
//     isActive: boolean;
//     discount: number;
//     price: number;
//     allowances: Allowances[]
//     privileges: Privilege[]
//     privilegesTotal: number; // front end only
//     paymentFrequency: string
//     termsAndConditions: boolean; // frontend only
// }

export interface Allowances {
    code: string;
    defaultBandwidth: number;
    defaultStorage: number;
}

export interface Privilege {
    code: string;
    price: number;
    checked: boolean;
}

export interface Plans {
    developerPlan: Plan;
    eventPlan: Plan;
    scalePlan: Plan;
    scaleMonthlyPlan: Plan;
}

export const plansInitialState: Plans = {
    developerPlan: null,
    eventPlan: null,
    scalePlan: null,
    scaleMonthlyPlan: null
}