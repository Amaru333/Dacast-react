import { CurrencyKey, GetPlansListOutput, PlanCurrencyEndpoint, PlanKey, PostAccountPlanInput } from "../../../../../DacastSdk/account";
import { BandwidthProductCurrency } from "../Plan";
import { ChangePlanData, Currency, Plans, upgradeInitialState } from "./types";

export const formatGetPlansListOutput = (data: GetPlansListOutput): Plans => {
    let formattedData: Plans = Object.keys(data).reduce((acc, next: PlanKey ) => {
        return {
            ...acc, [next]: {
                ...data[next],
                name: data[next].name === 'Annual Starter' ? 'Starter' : data[next].name,
                privileges: data[next].privileges.map(privilege => {
                    return {...privilege, checked: false, price: Object.keys(privilege.price).reduce((acc, next: CurrencyKey) => {return {...acc, [next]: privilege.price[next] / 100}}, {})}
                    }),
                price: Object.keys(data[next].price).reduce((accPrice, nextPrice: BandwidthProductCurrency) => { return {...accPrice, [nextPrice]: data[next].price[nextPrice] / 100 }}, {}),
                privilegesTotal: 0,
                termsAndConditions: false,
            }
        }
    }, upgradeInitialState)

    return formattedData
}

export const formatPostPlanInput = (data: ChangePlanData): PostAccountPlanInput => {
    let formattedData: PostAccountPlanInput = {
        planCode: data.code,
        token: data.token,
        currency: data.currency.toUpperCase() as PlanCurrencyEndpoint,
        couponCode: '',
        allowances: data.allowanceCode,
        threeDSecureToken: data.token3Ds ? data.token3Ds : undefined,
        paidPrivileges: data.privileges ? data.privileges.filter(p => p.checked).map((privilege) => { return { code: privilege.code, quantity: privilege.quantity || 1 }}).filter(f => f) : null
    }

    return formattedData
}