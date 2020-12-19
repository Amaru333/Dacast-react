import { GetWithdrawalDetailsOutput, PutWithdrawalDetailsInput } from "../../../../../DacastSdk/admin"
import { capitalizeFirstLetter } from "../../../../../utils/utils"
import { WithdrawalInfo, WithdrawalStatusAdmin } from "./types"

export const formatGetWithdrawalDetailsInput = (data: string): string => data
export const formatGetWithdrawalsDetailsOutput = (data: GetWithdrawalDetailsOutput): WithdrawalInfo => {
    let formattedData: WithdrawalInfo = {
        id: data.id,
        amount: data.amount,
        currency: data.currency,
        method: data.method,
        requestedDate: data.requestedDate,
        transferDate: data.transferDate,
        status: capitalizeFirstLetter(data.status) as WithdrawalStatusAdmin,
        paymentMethod: {
            id: {
                value: data.id,
                label: 'ID'
             },
             paymentMethodName: {
                 value: data.paymentMethod.paymentMethodName,
                 label: 'Payment Method Name'
             },
            accountNumber: {
                value: data.paymentMethod.accountNumber,
                label: 'Account Number'
            },
            routingNumber: {
                value: data.paymentMethod.routingNumber,
                label: 'Routing Number'
            },
            swift: {
                value: data.paymentMethod.swift,
                label: 'SWIFT'
            },
            iban: {
                value: data.paymentMethod.iban,
                label: 'IBAN'
            },
            payee: {
                value: data.paymentMethod.payee,
                label: 'Payee'
            },
            emailAddress: {
                value: data.paymentMethod.emailAddress,
                label: 'Email Address'
            },
            recipientType: {
                value: data.paymentMethod.paymentMethodType === 'us-transfer' || data.paymentMethod.paymentMethodType === 'international-transfer' ? capitalizeFirstLetter(data.paymentMethod.recipientType) : null,
                label: 'Recipient Type'
            },
            firstName: {
                value: data.paymentMethod.firstName,
                label: 'First Name'
            },
            lastName: {
                value: data.paymentMethod.lastName,
                label: 'Last Name'
            },
            accountName: {
                value: data.paymentMethod.accountName,
                label: 'Account Name'
            },
            companyName: {
                value: data.paymentMethod.companyName,
                label: 'Company Name'
            },
            address: {
                value: data.paymentMethod.address,
                label: 'Address'
            },
            address2: {
                value: data.paymentMethod.address2,
                label: 'Address Line 2'
            },
            state: {
                value: data.paymentMethod.state,
                label: 'State'
            },
            town: {
                value: data.paymentMethod.town,
                label: 'Town'
            },
            zipCode: {
                value: data.paymentMethod.zipCode,
                label: 'ZipCode'
            },
            country: {
                value: data.paymentMethod.paymentMethodType === 'us-transfer' ? 'United States' : data.paymentMethod.country,
                label: 'Country'
            },
            comments: {
                value: data.paymentMethod.comments,
                label: 'Comments'
            }
        },
        bankInfo: data.paymentMethod.paymentMethodType === 'us-transfer' || data.paymentMethod.paymentMethodType === 'international-transfer' ?
            {
                bankName: {
                    value: data.paymentMethod.bankName,
                    label: 'Bank Name'
                },
                bankAddress: {
                    value: data.paymentMethod.bankAddress,
                    label: 'Bank Address'
                },
                bankAddress2: {
                    value: data.paymentMethod.bankAddress2,
                    label: 'Bank Address Line 2'
                },
                bankState: {
                    value: data.paymentMethod.bankState,
                    label: 'Bank State'
                },
                bankTown: {
                    value:data.paymentMethod.bankTown,
                    label: 'Bank Town'
                },
                bankZipCode: {
                    value: data.paymentMethod.bankZipCode,
                    label: 'Bank ZipCode'
                },
                bankCountry: {
                    value: data.paymentMethod.bankCountry,
                    label: 'Bank Country'
                }
            } : null
    }

    return formattedData
}

export const formatPutWithdrawalDetailsInput = (data: WithdrawalStatusAdmin): PutWithdrawalDetailsInput => {
    let formattedData: PutWithdrawalDetailsInput = {
        status: data.toLowerCase() as 'cancelled' | 'completed' | 'pending'
    }

    return formattedData
}