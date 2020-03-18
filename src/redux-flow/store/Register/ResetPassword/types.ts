export enum ActionTypes {
    RESET_PASSWORD = "@@regiser_reset-password/RESET_PASSWORD",
}

export interface ResetPasswordInfo {
    email: string
}

export const defaultStateResetPassword: ResetPasswordInfo = null