import { GetPlansListOutput, PlanCurrencyEndpoint, PlanKey, PostAccountPlanInput } from "../../../../../DacastSdk/account";
import { ChangePlanData, Plans, upgradeInitialState } from "./types";

export const formatGetPlansListOutput = (data: GetPlansListOutput): Plans => {
    let formattedData: Plans = Object.keys(data).reduce((acc, next: PlanKey ) => {
        return {
            ...acc, [next]: {
                ...data[next],
                name: data[next].name === 'Annual Starter' ? 'Starter' : data[next].name,
                privileges: data[next].privileges.map(privilege => {
                    return {...privilege, checked: false}
                }),
                selectedPrivileges: undefined,
                privilegesTotal: 0,
                termsAndConditions: false
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
        paidPrivileges: data.privileges ? data.privileges.map((privilege) => { return data.selectedPrivileges && data.selectedPrivileges.includes(privilege.code) ? { code: privilege.code, quantity: 1 } : null }).filter(f => f) : null
    }

    return formattedData
}