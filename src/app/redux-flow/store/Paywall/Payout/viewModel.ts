import { PaymentMethodType, PaymentMethod, WithdrawalRequest } from './types';
import { capitalizeFirstLetter } from '../../../../../utils/utils';

export const formatGetWithdrawalMethodsOutput = (input: GetPaymentMethodOutput): PaymentMethod[] => {
    return input.paymentMethods.map((p) => {
        return {
            ...p,
            paymentMethodType: p.paymentMethodType === 'us-transfer' ? PaymentMethodType.BankAccountUS : p.paymentMethodType === 'international-transfer' ? PaymentMethodType.BankAccountInternational : p.paymentMethodType === 'check' ? PaymentMethodType.Check : PaymentMethodType.PayPal,
            recipientType: isBankAccountMethod(p) ? capitalizeFirstLetter(p.recipientType) as 'Business' | 'Personal' : 'Business'
        }
    })
} 

export const formatPostWithdrawalMethodInput = (data: PaymentMethod): PaymentMethodDetails => {

    switch(data.paymentMethodType) {
        case PaymentMethodType.BankAccountUS:
            let us: BankAccountUSDetails = {
                paymentMethodType: 'us-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                accountNumber: data.accountNumber,
                routingNumber: data.routingNumber,
                firstName: data.firstName,
                lastName: data.lastName,
                accountName: data.accountName,
                address: data.address,
                address2: data.address2,
                state: data.state,
                town: data.town,
                zipCode: data.zipCode,
                bankName: data.bankName,
                bankAddress: data.bankAddress,
                bankAddress2: data.bankAddress2,
                bankState: data.bankState,
                bankTown: data.bankTown,
                bankZipCode: data.bankZipCode
             }
            return us
        case PaymentMethodType.BankAccountInternational:
            let inter: BankAccountInternationalDetails = {
                paymentMethodType: 'international-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                swift: data.swift,
                iban: data.iban,
                firstName: data.firstName,
                lastName: data.lastName,
                accountName: data.accountName,
                address: data.address,
                address2: data.address2,
                state: data.state,
                town: data.town,
                zipCode: data.zipCode,
                country: data.country,
                bankName: data.bankName,
                bankAddress: data.bankAddress,
                bankAddress2: data.bankAddress2,
                bankState: data.bankState,
                bankTown: data.bankTown,
                bankZipCode: data.bankZipCode,
                bankCountry: data.bankCountry
             }            
             return inter
        case PaymentMethodType.Check: 
            let check: CheckDetails = {
                paymentMethodType: 'check',
                paymentMethodName: data.paymentMethodName,
                payee: data.payee,
                companyName: data.companyName,
                address: data.address,
                address2: data.address2,
                state: data.state,
                town: data.town,
                zipCode: data.zipCode,
                country: data.country
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

export const formatPutWithdrawalMethodInput = (data: PaymentMethod): PaymentMethodEndpoints => {

    switch(data.paymentMethodType) {
        case PaymentMethodType.BankAccountUS:
            let us: BankAccountUS = {
                id: data.id,
                paymentMethodType: 'us-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                accountNumber: data.accountNumber,
                routingNumber: data.routingNumber,
                firstName: data.firstName,
                lastName: data.lastName,
                accountName: data.accountName,
                address: data.address,
                address2: data.address2,
                state: data.state,
                town: data.town,
                zipCode: data.zipCode,
                bankName: data.bankName,
                bankAddress: data.bankAddress,
                bankAddress2: data.bankAddress2,
                bankState: data.bankState,
                bankTown: data.bankTown,
                bankZipCode: data.bankZipCode
             }
            return us
        case PaymentMethodType.BankAccountInternational:
            let inter: BankAccountInternational = {
                id: data.id,
                paymentMethodType: 'international-transfer',
                paymentMethodName: data.paymentMethodName,
                recipientType: data.recipientType.toLowerCase() as 'business' | 'personal',
                swift: data.swift,
                iban: data.iban,
                firstName: data.firstName,
                lastName: data.lastName,
                accountName: data.accountName,
                address: data.address,
                address2: data.address2,
                state: data.state,
                town: data.town,
                zipCode: data.zipCode,
                country: data.country,
                bankName: data.bankName,
                bankAddress: data.bankAddress,
                bankAddress2: data.bankAddress2,
                bankState: data.bankState,
                bankTown: data.bankTown,
                bankZipCode: data.bankZipCode,
                bankCountry: data.bankCountry
             }            
             return inter
        case PaymentMethodType.Check: 
            let check: Check = {
                id: data.id,
                paymentMethodType: 'check',
                paymentMethodName: data.paymentMethodName,
                payee: data.payee,
                companyName: data.companyName,
                address: data.address,
                address2: data.address2,
                state: data.state,
                town: data.town,
                zipCode: data.zipCode,
                country: data.country
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

export const formatGetWithdrawalRequestsOutput = (data: GetPaymentRequestOutput): WithdrawalRequest[] => {
    return data.withdrawals.map(withdrawal => {
        return {
            ...withdrawal,
            status: capitalizeFirstLetter(withdrawal.status) as 'Completed' | 'Cancelled' | 'Pending'
        }
    })
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

export const formatPutWithdrawalRequestInput = (data: WithdrawalRequest): PaymentRequestEndpoints => {
    let formattedWithdrawalRequest: PaymentRequestEndpoints = {
        ...data,
        id: data.id,
        status: data.status.toLowerCase() as 'completed' | 'cancelled' | 'pending'
    }

    return formattedWithdrawalRequest
}