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

    public getPromo = async (input: string): Promise<GetPromoOutput> => {
        return await this.axiosClient.get('/paywall/promos?' + input)
        .then(response => {
            return this.checkExtraData(response.data)
        })
    }

    public postPromo = async (input: PromoDetails): Promise<PromoId> => {
        return await this.axiosClient.post('/paywall/promos', {promo: input})
        .then(response => {
            return {id: this.checkExtraData(response.data)}
        })
    }

    public putPromo = async (input: Promo): Promise<void> => {
        return await this.axiosClient.put('/paywall/promos/' + input.id, {promo: input})
    }

    public deletePromo = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/promos/' + input)
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
            return this.checkExtraData(response)
        })
    }

    public putPricePackage = async (input: PutPricePackageInput): Promise<void> => {
        return await this.axiosClient.put('/paywall/prices/groups/' + input.id, {package: input})
        .then(response => {
            return this.checkExtraData(response)
        })
    }

    public deletePricePackage = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/prices/groups/' + input)
    }

    public getPaymentMethod = async (): Promise<GetPaymentMethodOutput> => {
        return await this.axiosClient.get('/paywall/payment-methods')
        .then(response => {
            return this.checkExtraData(response)
        })
    }

    public postPaymentMethod = async (input: PaymentMethodDetails): Promise<PaymentMethodId> => {
        return await this.axiosClient.post('/paywall/payment-methods', input)
        .then(response => {
            return this.checkExtraData(response)
        })
    }

    public putPaymentMethod = async (input: PaymentMethod): Promise<void> => {
        return await this.axiosClient.put('/paywall/payment-methods/'+ input.id, input)
    }

    public deletePaymentMethod = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/payment-methods/' + input)
    }
}