import { PaymentMethodType, PaymentMethod, WithdrawalRequest, PaymentMethodPut, AccountType } from './types';
import { capitalizeFirstLetter } from '../../../../../utils/utils';
import { GetPaymentMethodOutput, isBankAccountMethod, PaymentMethodDetails, BankAccountUSDetails, BankAccountInternationalDetails, CheckDetails, PaypalDetails, PaymentMethodEndpoints, BankAccountUS, BankAccountInternational, Check, Paypal, GetPaymentRequestOutput, PostPaymentRequestInput, PaymentRequestEndpoints, PaymentMethodId, PaymentRequestId, GetPaywallBalanceOutput } from '../../../../../DacastSdk/paywall';

export const formatGetWithdrawalMethodsOutput = (input: GetPaymentMethodOutput): PaymentMethod[] => {
    return input.paymentMethods.map((p) => {
        return {
            ...p,
            paymentMethodType: p.paymentMethodType === 'us-transfer' ? PaymentMethodType.BankAccountUS : p.paymentMethodType === 'international-transfer' ? PaymentMethodType.BankAccountInternational : p.paymentMethodType === 'check' ? PaymentMethodType.Check : PaymentMethodType.PayPal,
            recipientType: isBankAccountMethod(p) ? capitalizeFirstLetter(p.recipientType) as 'Business' | 'Personal' : 'Business',
            accountType: isBankAccountMethod(p) ? capitalizeFirstLetter(p.accountType) as AccountType : 'Checking'
        }
    })
} 

export const formatPostWithdrawalMethodInput = (data: PaymentMethodPut): PaymentMethodDetails => {

    switch(data.paymentMethodType) {
        case PaymentMethodType.BankAccountUS:
            let us: BankAccountUSDetails = {
                paymentMethodType: 'us-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                accountNumber: data.accountNumberUS,
                routingNumber: data.routingNumberUS,
                firstName: data.firstNameUS,
                lastName: data.lastNameUS,
                accountName: data.accountNameUS,
                address: data.addressUS,
                address2: data.address2US,
                state: data.stateUS,
                town: data.townUS,
                zipCode: data.zipCodeUS,
                bankName: data.bankNameUS,
                bankAddress: data.bankAddressUS,
                bankAddress2: data.bankAddress2US,
                bankState: data.bankStateUS,
                bankTown: data.bankTownUS,
                bankZipCode: data.bankZipCodeUS,
                accountType: data.accountType.toLowerCase() as 'checking' | 'savings'
             }
            return us
        case PaymentMethodType.BankAccountInternational:
            let inter: BankAccountInternationalDetails = {
                paymentMethodType: 'international-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                swift: data.swiftInternational,
                iban: data.ibanInternational,
                firstName: data.firstNameInternational,
                lastName: data.lastNameInternational,
                accountName: data.accountNameInternational,
                address: data.addressInternational,
                address2: data.address2International,
                state: data.stateInternational,
                town: data.townInternational,
                zipCode: data.zipCodeInternational,
                country: data.countryInternational,
                bankName: data.bankNameInternational,
                bankAddress: data.bankAddressInternational,
                bankAddress2: data.bankAddress2International,
                bankState: data.bankStateInternational,
                bankTown: data.bankTownInternational,
                bankZipCode: data.bankZipCodeInternational,
                bankCountry: data.bankCountryInternational,
                accountType: data.accountType.toLowerCase() as 'checking' | 'savings'
             }            
             return inter
        case PaymentMethodType.Check: 
            let check: CheckDetails = {
                paymentMethodType: 'check',
                paymentMethodName: data.paymentMethodName,
                payee: data.payee,
                companyName: data.companyName,
                address: data.checkAddress,
                address2: data.checkAddressLine2,
                state: data.checkState,
                town: data.checkTown,
                zipCode: data.checkZipCode,
                country: data.checkCountry
            }
            return check
        case PaymentMethodType.PayPal:
            let paypal: PaypalDetails = {
                paymentMethodType: 'paypal',
                paymentMethodName: data.paymentMethodName,
                emailAddress: data.emailAddress,
                comments: data.comments
            }
            return paypal
        default: 
            return null
    }
}

export const formatPostWithdrawalMethodOuput = (endpointResponse: PaymentMethodId, data: PaymentMethodPut ): PaymentMethod => {
    switch(data.paymentMethodType) {
        case PaymentMethodType.BankAccountUS:
            let us: PaymentMethod= {
                id: endpointResponse.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType,
                accountNumber: data.accountNumberUS,
                routingNumber: data.routingNumberUS,
                firstName: data.firstNameUS,
                lastName: data.lastNameUS,
                accountName: data.accountNameUS,
                address: data.addressUS,
                address2: data.address2US,
                state: data.stateUS,
                town: data.townUS,
                zipCode: data.zipCodeUS,
                bankName: data.bankNameUS,
                bankAddress: data.bankAddressUS,
                bankAddress2: data.bankAddress2US,
                bankState: data.bankStateUS,
                bankTown: data.bankTownUS,
                bankZipCode: data.bankZipCodeUS,
                accountType: data.accountType
             }
            return us
        case PaymentMethodType.BankAccountInternational:
            let inter: PaymentMethod = {
                id: endpointResponse.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType,
                swift: data.swiftInternational,
                iban: data.ibanInternational,
                firstName: data.firstNameInternational,
                lastName: data.lastNameInternational,
                accountName: data.accountNameInternational,
                address: data.addressInternational,
                address2: data.address2International,
                state: data.stateInternational,
                town: data.townInternational,
                zipCode: data.zipCodeInternational,
                country: data.countryInternational,
                bankName: data.bankNameInternational,
                bankAddress: data.bankAddressInternational,
                bankAddress2: data.bankAddress2International,
                bankState: data.bankStateInternational,
                bankTown: data.bankTownInternational,
                bankZipCode: data.bankZipCodeInternational,
                bankCountry: data.bankCountryInternational,
                accountType: data.accountType
             }
             return inter
        case PaymentMethodType.Check: 
            let check: PaymentMethod = {
                id: endpointResponse.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                payee: data.payee,
                companyName: data.companyName,
                address: data.checkAddress,
                address2: data.checkAddressLine2,
                state: data.checkState,
                town: data.checkTown,
                zipCode: data.checkZipCode,
                country: data.checkCountry
            }
            return check
        case PaymentMethodType.PayPal:
            let paypal: PaymentMethod = {
                id: endpointResponse.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                emailAddress: data.emailAddress,
                comments: data.comments
            }
            return paypal
        default: 
            return null
    }
}

export const formatPutWithdrawalMethodInput = (data: PaymentMethodPut): PaymentMethodEndpoints => {

    switch(data.paymentMethodType) {
        case PaymentMethodType.BankAccountUS:
            let us: BankAccountUS = {
                id: data.id,
                paymentMethodType: 'us-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                accountNumber: data.accountNumberUS,
                routingNumber: data.routingNumberUS,
                firstName: data.firstNameUS,
                lastName: data.lastNameUS,
                accountName: data.accountNameUS,
                address: data.addressUS,
                address2: data.address2US,
                state: data.stateUS,
                town: data.townUS,
                zipCode: data.zipCodeUS,
                bankName: data.bankNameUS,
                bankAddress: data.bankAddressUS,
                bankAddress2: data.bankAddress2US,
                bankState: data.bankStateUS,
                bankTown: data.bankTownUS,
                bankZipCode: data.bankZipCodeUS,
                accountType: data.accountType.toLowerCase() as 'checking' | 'savings'
             }
            return us
        case PaymentMethodType.BankAccountInternational:
            let inter: BankAccountInternational = {
                id: data.id,
                paymentMethodType: 'international-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                swift: data.swiftInternational,
                iban: data.ibanInternational,
                firstName: data.firstNameInternational,
                lastName: data.lastNameInternational,
                accountName: data.accountNameInternational,
                address: data.addressInternational,
                address2: data.address2International,
                state: data.stateInternational,
                town: data.townInternational,
                zipCode: data.zipCodeInternational,
                country: data.countryInternational,
                bankName: data.bankNameInternational,
                bankAddress: data.bankAddressInternational,
                bankAddress2: data.bankAddress2International,
                bankState: data.bankStateInternational,
                bankTown: data.bankTownInternational,
                bankZipCode: data.bankZipCodeInternational,
                bankCountry: data.bankCountryInternational,
                accountType: data.accountType.toLowerCase() as 'checking' | 'savings'
             }
             return inter
        case PaymentMethodType.Check: 
            let check: Check = {
                id: data.id,
                paymentMethodType: 'check',
                paymentMethodName: data.paymentMethodName,
                payee: data.payee,
                companyName: data.companyName,
                address: data.checkAddress,
                address2: data.checkAddressLine2,
                state: data.checkState,
                town: data.checkTown,
                zipCode: data.checkZipCode,
                country: data.checkCountry
            }
            return check
        case PaymentMethodType.PayPal:
            let paypal: Paypal = {
                id: data.id,
                paymentMethodType: 'paypal',
                paymentMethodName: data.paymentMethodName,
                emailAddress: data.emailAddress,
                comments: data.comments
            }
            return paypal
        default: 
            return null
    }
}

export const formatPutWithdrawalMethodOutput = (endpointResponse: null, data: PaymentMethodPut ): PaymentMethod => {
    switch(data.paymentMethodType) {
        case PaymentMethodType.BankAccountUS:
            let us: PaymentMethod= {
                id: data.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType,
                accountNumber: data.accountNumberUS,
                routingNumber: data.routingNumberUS,
                firstName: data.firstNameUS,
                lastName: data.lastNameUS,
                accountName: data.accountNameUS,
                address: data.addressUS,
                address2: data.address2US,
                state: data.stateUS,
                town: data.townUS,
                zipCode: data.zipCodeUS,
                bankName: data.bankNameUS,
                bankAddress: data.bankAddressUS,
                bankAddress2: data.bankAddress2US,
                bankState: data.bankStateUS,
                bankTown: data.bankTownUS,
                bankZipCode: data.bankZipCodeUS,
                accountType: data.accountType
             }
            return us
        case PaymentMethodType.BankAccountInternational:
            let inter: PaymentMethod = {
                id: data.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType,
                swift: data.swiftInternational,
                iban: data.ibanInternational,
                firstName: data.firstNameInternational,
                lastName: data.lastNameInternational,
                accountName: data.accountNameInternational,
                address: data.addressInternational,
                address2: data.address2International,
                state: data.stateInternational,
                town: data.townInternational,
                zipCode: data.zipCodeInternational,
                country: data.countryInternational,
                bankName: data.bankNameInternational,
                bankAddress: data.bankAddressInternational,
                bankAddress2: data.bankAddress2International,
                bankState: data.bankStateInternational,
                bankTown: data.bankTownInternational,
                bankZipCode: data.bankZipCodeInternational,
                bankCountry: data.bankCountryInternational,
                accountType: data.accountType
             }
             return inter
        case PaymentMethodType.Check: 
            let check: PaymentMethod = {
                id: data.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                payee: data.payee,
                companyName: data.companyName,
                address: data.checkAddress,
                address2: data.checkAddressLine2,
                state: data.checkState,
                town: data.checkTown,
                zipCode: data.checkZipCode,
                country: data.checkCountry
            }
            return check
        case PaymentMethodType.PayPal:
            let paypal: PaymentMethod = {
                id: data.id,
                paymentMethodType: data.paymentMethodType,
                paymentMethodName: data.paymentMethodName,
                emailAddress: data.emailAddress,
                comments: data.comments
            }
            return paypal
        default: 
            return null
    }
}

export const formatDeleteWithdrawalMethodInput = (data: PaymentMethod): string => data.id

export const formatGetWithdrawalRequestsOutput = (data: GetPaymentRequestOutput): {withdrawalRequests: WithdrawalRequest[]; maxWithdrawalRequestAmount: number;} => {
    let maxAmount: number = 0
    const withdrawalRequests: WithdrawalRequest[] = data.withdrawals.map(withdrawal => {
        if(withdrawal.status === 'pending') {
            maxAmount += withdrawal.amount
        }
        return {
            ...withdrawal,
            status: capitalizeFirstLetter(withdrawal.status) as 'Completed' | 'Cancelled' | 'Pending'
        }
    })

    return {
        withdrawalRequests: withdrawalRequests,
        maxWithdrawalRequestAmount: maxAmount
    }
}

export const formatPostWithdrawalRequestInput = (data: WithdrawalRequest): PostPaymentRequestInput => {
    let formattedWithdrawalRequest: PostPaymentRequestInput = {
        paymentMethodId: data.paymentMethodId,
        currency: data.currency,
        amount:  data.amount,
        requestDate: data.requestDate,
        transferDate: data.transferDate
    }

    return formattedWithdrawalRequest
}

export const formatPostWithdrawalRequestOuput = (endpointResponse: PaymentRequestId, dataReact: WithdrawalRequest ): WithdrawalRequest => {
    let formattedData: WithdrawalRequest = {
        ...dataReact,
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutWithdrawalRequestInput = (data: WithdrawalRequest): PaymentRequestEndpoints => {
    let formattedWithdrawalRequest: PaymentRequestEndpoints = {
        ...data,
        id: data.id,
        status: data.status.toLowerCase() as 'completed' | 'cancelled' | 'pending'
    }

    return formattedWithdrawalRequest
}

export const formatGetPaywallBalanceOutput = (data: GetPaywallBalanceOutput): number => {
    return data.balance || 0
}

export const formatPostWithdrawalRequestErrorMessage = (error: any) => {
    if(error.details.indexOf("amount provided higher than the user\???s balance") !== -1) {
        return "The amount provided is too high for this request, please try with a lower amount."
    }

    return 'Couldn\'t submit withdrawal request'
}