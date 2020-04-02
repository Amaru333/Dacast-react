export enum ActionTypes {
    FORGOT_PASSWORD = "@@regiser_forgot-password/FORGOT_PASSWORD",
}

export interface ForgotPasswordInfo {
    email: string;
}

export const defaultStateResetPassword: ForgotPasswordInfo = null