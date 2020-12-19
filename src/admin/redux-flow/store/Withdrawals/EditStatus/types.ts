export enum ActionTypes {
    GET_WITHDRAWAL_INFO = "@@admin_accounts/GET_WITHDRAWAL_INFO",
    SAVE_WITHDRAWAL_STATUS = "@@admin_accounts/SAVE_WITHDRAWAL_STATUS"
}

type PaymentMethodKeys = 'id' | 'paymentMethodName' | 'accountNumber' | 'payee' | 'companyName' | 'recipientType' | 'swift' | 'iban' | 'routingNumber' | 'firstName' | 'lastName' | 'accountName' | 'address' | 'address2' | 'state' | 'town' | 'zipCode' | 'country' | 'emailAddress' | 'comments'

type PaymentMethodFields = {
  [key in PaymentMethodKeys]: {
    value: string;
    label: string;
  };
};

type BankInfoKeys = 'bankName' | 'bankAddress' | 'bankAddress2' | 'bankState' | 'bankTown' | 'bankZipCode' | 'bankCountry'

type BankInfoFields = {
  [key in BankInfoKeys]: {
    value: string;
    label: string;
  };
};

export type WithdrawalStatusAdmin = 'Pending' | 'Cancelled' | 'Completed'

 export interface WithdrawalInfo {
    amount: number;
    currency: string;
    id: string;
    method: string;
    paymentMethod: PaymentMethodFields;
    bankInfo: BankInfoFields | null;
    requestedDate: number;
    status: WithdrawalStatusAdmin;
    transferDate: number;
  }

export const editWithdrawalDefaultState: WithdrawalInfo = null;

