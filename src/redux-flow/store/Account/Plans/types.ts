export enum ActionTypes {
    GET_PLAN_DETAILS = "@@account_plans/GET_PLAN_DETAILS"
}

export interface CustomAllowance {
    amount: number;
    price: number;
    currentAmount: boolean;
}

export interface Plan {
    name: 'developer' | 'event' | 'scale';
    isActive: boolean;
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
export interface Plans {
    developerPlan: Plan;
    eventPlan: Plan;
    scalePlan: Plan;
}

export const plansInitialState: Plans = {
    developerPlan: null,
    eventPlan: null,
    scalePlan: null
}