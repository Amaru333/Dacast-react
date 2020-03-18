export enum ActionTypes {
    SEND_CONFIRM_EMAIL = "@@regiser_confirm-email/SEND_COMFIRM_EMAIL",
    RESEND_CONFIRM_EMAIL = "@@regiser_confirm-email/RESEND_COMFIRM_EMAIL",
}

export interface ConfirmEmailInfo {
    email: string
}

export const defaultStateConfirmEmail: ConfirmEmailInfo = null