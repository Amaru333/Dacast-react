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

    public postPromo = async (input: PostPromoInput): Promise<PostPromoOutput> => {
        return await this.axiosClient.post('/paywall/promos', {promo: input})
        .then(response => {
            return {id: this.checkExtraData(response.data)}
        })
    }

    public putPromo = async (input: PutPromoInput): Promise<void> => {
        return await this.axiosClient.put('/paywall/promos/' + input.id, {promo: input})
    }

    public deletePromo = async (input: string): Promise<void> => {
        return await this.axiosClient.delete('/paywall/promos/' + input)
    }


}