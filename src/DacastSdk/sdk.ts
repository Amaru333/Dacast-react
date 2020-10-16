import { UserTokenService } from '../utils/services/token/token'
import { AxiosClient } from '../utils/services/axios/AxiosClient'

export class DacastSdk {

    constructor(baseUrl: string, userToken: UserTokenService, refreshTokenUrl?: string) {
        this.axiosClient = new AxiosClient(baseUrl, userToken, refreshTokenUrl)
    }

    private axiosClient: AxiosClient = null

    private checkExtraData = (data: any): any => {
        if(data.data) {
            return {...data.data}
        }
        return data
    }

    public forceRefresh = async (): Promise<void> => {
        return await this.axiosClient.forceRefresh()
    }

    public getPromoPreset = async (input: string): Promise<GetPromoPresetOutput> => {
        return await this.axiosClient.get('/paywall/promos/presets?' + input)
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public postPromoPreset = async (input: PromoPresetDetails): Promise<PromoId> => {
        return await this.axiosClient.post('/paywall/promos/presets', {...input})
        .then(response => {
            return {id: this.checkExtraData(response.data).id}
        })
    }

    public putPromoPreset = async (input: PromoPreset): Promise<void> => {
        return await this.axiosClient.put('/paywall/promos/presets/' + input.id, {...input})
    }

    public deletePromoPreset = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/promos/presets/' + input)
    }

    public getPromo = async (input: string): Promise<GetPromoOutput> => {
        return await this.axiosClient.get('/paywall/promos?' + input)
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public postPromo = async (input: PromoDetails): Promise<PromoId> => {
        return await this.axiosClient.post('/paywall/promos', {promo: input})
        .then(response => {
            return {id: this.checkExtraData(response.data).id}
        })
    }

    public putPromo = async (input: PromoEndpoints): Promise<void> => {
        return await this.axiosClient.put('/paywall/promos/' + input.id, {promo: input})
    }

    public deletePromo = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/promos/' + input)
    }

    public getPricePreset = async (input: string): Promise<GetPricePresetOutput> => {
        return await this.axiosClient.get('/paywall/prices/presets?' + input)
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public postPricePreset = async (input: PricePresetDetails): Promise<PricePresetId> => {
        return await this.axiosClient.post('/paywall/prices/presets', {...input})
        .then(response => {
            return {id: this.checkExtraData(response.data).id}
        })
    }

    public putPricePreset = async (input: PricePresetEndpoint): Promise<void> => {
        return await this.axiosClient.put('/paywall/prices/presets/' + input.id, {package: input})
    }

    public deletePricePreset = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/prices/presets/' + input)
    }

    public getPricePackage = async (input: string): Promise<GetPricePackageOutput> => {
        return await this.axiosClient.get('/paywall/prices/groups?' + input)
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public postPricePackage = async (input: PostPricePackageInput): Promise<PricePackageId> => {
        return await this.axiosClient.post('/paywall/prices/groups', {...input})
        .then(response => {
            return {id: this.checkExtraData(response.data).id}
        })
    }

    public putPricePackage = async (input: PutPricePackageInput): Promise<void> => {
        return await this.axiosClient.put('/paywall/prices/groups/' + input.id, {package: input})
    }

    public deletePricePackage = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/prices/groups/' + input)
    }

    public getPaymentMethod = async (): Promise<GetPaymentMethodOutput> => {
        return await this.axiosClient.get('/paywall/payment-methods')
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public postPaymentMethod = async (input: PaymentMethodDetails): Promise<PaymentMethodId> => {
        return await this.axiosClient.post('/paywall/payment-methods', input)
        .then(response => {
            return {id: this.checkExtraData(response.data).id}
        })
    }

    public putPaymentMethod = async (input: PaymentMethodEndpoints): Promise<void> => {
        return await this.axiosClient.put('/paywall/payment-methods/'+ input.id, input)
    }

    public deletePaymentMethod = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/payment-methods/' + input)
    }



    public getPaymentRequest = async (): Promise<GetPaymentRequestOutput> => {
        return await this.axiosClient.get('/paywall/payment-requests')
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public postPaymentRequest = async (input: PostPaymentRequestInput): Promise<PaymentRequestId> => {
        return await this.axiosClient.post('/paywall/payment-requests', input)
        .then(response => {
            return {id: this.checkExtraData(response.data).id}
        })
    }

    public putPaymentRequest = async (input: PaymentRequestEndpoints): Promise<void> => {
        return await this.axiosClient.put('/paywall/payment-requests/'+ input.id, input)
    }

    public getPaywallSettings = async (): Promise<PaywallSettings> => {
        return await this.axiosClient.get('paywall/payment-options')
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public putPaywallSettings = async (input: PaywallSettings): Promise<void> => {
        return await this.axiosClient.put('paywall/payment-options', {...input})
    }

    public getPaywallThemes = async (): Promise<GetPaywallThemesOutput> => {
        return await this.axiosClient.get('/paywall/themes')
        .then(response => {
            return this.checkExtraData(response.data)
        }) 
    }

    public postPaywallTheme = async (input: PaywallThemeDetails): Promise<PaywallThemeId> => {
        return await this.axiosClient.post('/paywall/themes', input)
        .then(response => {
            return {id: this.checkExtraData(response.data).id}
        })
    }

    public putPaywallTheme = async (input: PaywallThemeEndpoints): Promise<void> => {
        return await this.axiosClient.put('/paywall/themes/'+ input.id, input)
    }

    public deletePaywallTheme = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/themes/' + input)
    }

    public getPaywallTransactions = async (input: string): Promise<GetPaywallTransactionsOutput> => {
        return await this.axiosClient.get('/paywall/transactions?' + input)
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

}