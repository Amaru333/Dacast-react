import { UserTokenService } from '../utils/services/token/token'
import { AxiosClient } from '../utils/services/axios/AxiosClient'
import Axios, { AxiosResponse } from 'axios'
import { GetPromoPresetOutput, PromoPresetDetails, PromoId, PromoPreset, GetPromoOutput, PromoDetails, PromoEndpoints, GetPricePresetOutput, PricePresetDetails, PricePresetId, PricePresetEndpoint, GetPricePackageOutput, PostPricePackageInput, PricePackageId, PutPricePackageInput, GetPaymentMethodOutput, PaymentMethodDetails, PaymentMethodId, PaymentMethodEndpoints, GetPaymentRequestOutput, PostPaymentRequestInput, PaymentRequestId, PaymentRequestEndpoints, PaywallSettings, GetPaywallThemesOutput, PaywallThemeDetails, PaywallThemeId, PaywallThemeEndpoints, GetPaywallTransactionsOutput } from './paywall'
import { PostUploadUrlInput, PostUploadUrlOutput, PutUploadFileInput } from './common'
import { GetCompanyRequestOutput, CompanyDetailsEndpoints, GetInvoicesOutput, ProfileDetails, PutProfileDetailsInput, PostUserPasswordInput } from './account'
import { EmbedSettings } from './settings'
import { GetContentAnalyticsInput, GetContentAnalyticsOutput } from './analytics'
var qs = require('qs');

export class DacastSdk {

    constructor(baseUrl: string, userToken: UserTokenService, refreshTokenUrl?: string) {
        this.axiosClient = new AxiosClient(baseUrl, userToken, refreshTokenUrl)
        this.userId = userToken.getUserInfoItem('custom:dacast_user_id')
        this.baseUrl = baseUrl
        this.refreshTokenUrl = refreshTokenUrl
    }
    private baseUrl: string = null
    private refreshTokenUrl: string = null
    private axiosClient: AxiosClient = null
    private userId: string = null
    
    private checkExtraData = (response: AxiosResponse<any>): any => {
        let responseData: any = response.data
        if(responseData.data) {
            return {...responseData.data}
        }
        return responseData
    }

    public updateToken = (newToken: UserTokenService) => {
        this.axiosClient = new AxiosClient(this.baseUrl, newToken, this.refreshTokenUrl)
        this.userId = newToken.getUserInfoItem('custom:dacast_user_id')
    }

    public forceRefresh = async (): Promise<void> => await this.axiosClient.forceRefresh()

    public postUploadUrl = async (input: PostUploadUrlInput): Promise<PostUploadUrlOutput> => await this.axiosClient.post('/uploads/signatures/singlepart/' + input.uploadType, {...input.uploadRequestBody}).then(this.checkExtraData)
    public putUploadFile = async (input: PutUploadFileInput): Promise<void> => await this.axiosClient.put(input.uploadUrl, input.data, {authRequired: false})

    public getCompanyDetails = async (): Promise<GetCompanyRequestOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/company').then(this.checkExtraData)
    public putCompanyDetails = async (input: CompanyDetailsEndpoints): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/company', {...input}).then(this.checkExtraData)
    public deleteCompanyLogo = async (): Promise<void> => await this.axiosClient.delete('/accounts/' + this.userId + '/company/logo')

    public getInvoices = async (input: string): Promise<GetInvoicesOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/billing/invoices?' + input).then(this.checkExtraData)

    public getProfileDetails = async (): Promise<ProfileDetails> => await this.axiosClient.get('/accounts/' + this.userId + '/profile').then(this.checkExtraData)
    public putProfileDetails = async (input: PutProfileDetailsInput): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/profile', {...input})
    public postUserPassword = async (input: PostUserPasswordInput): Promise<void> => await this.axiosClient.post('/accounts/' + this.userId + '/change-password', {...input})

    public getEmbedSettings = async (): Promise<EmbedSettings> => await this.axiosClient.get('/settings/embed').then(this.checkExtraData)
    public putEmbedSettings = async (input: EmbedSettings): Promise<void> => await this.axiosClient.put('/settings/embed', {...input})
    
    public getPromoPreset = async (input: string): Promise<GetPromoPresetOutput> => await this.axiosClient.get('/paywall/promos/presets?' + input).then(this.checkExtraData)
    public postPromoPreset = async (input: PromoPresetDetails): Promise<PromoId> => await this.axiosClient.post('/paywall/promos/presets', {...input}).then(this.checkExtraData)
    public putPromoPreset = async (input: PromoPreset): Promise<void> => await this.axiosClient.put('/paywall/promos/presets/' + input.id, {...input})
    public deletePromoPreset = async (input: string): Promise<void> => this.axiosClient.delete('/paywall/promos/presets/' + input)

    public getPromo = async (input: string): Promise<GetPromoOutput> => await this.axiosClient.get('/paywall/promos?' + input).then(this.checkExtraData)
    public postPromo = async (input: PromoDetails): Promise<PromoId> => await this.axiosClient.post('/paywall/promos', {promo: input}).then(this.checkExtraData)
    public putPromo = async (input: PromoEndpoints): Promise<void> => await this.axiosClient.put('/paywall/promos/' + input.id, {promo: input})
    public deletePromo = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/promos/' + input)

    public getPricePreset = async (input: string): Promise<GetPricePresetOutput> => await this.axiosClient.get('/paywall/prices/presets?' + input).then(this.checkExtraData)
    public postPricePreset = async (input: PricePresetDetails): Promise<PricePresetId> => await this.axiosClient.post('/paywall/prices/presets', {...input}).then(this.checkExtraData)
    public putPricePreset = async (input: PricePresetEndpoint): Promise<void> => await this.axiosClient.put('/paywall/prices/presets/' + input.id, {package: input})
    public deletePricePreset = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/prices/presets/' + input)

    public getPricePackage = async (input: string): Promise<GetPricePackageOutput> => await this.axiosClient.get('/paywall/prices/groups?' + input).then(this.checkExtraData)
    public postPricePackage = async (input: PostPricePackageInput): Promise<PricePackageId> => await this.axiosClient.post('/paywall/prices/groups', {...input}).then(this.checkExtraData)
    public putPricePackage = async (input: PutPricePackageInput): Promise<void> => await this.axiosClient.put('/paywall/prices/groups/' + input.id, {package: input})
    public deletePricePackage = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/prices/groups/' + input)

    public getPaymentMethod = async (): Promise<GetPaymentMethodOutput> => await this.axiosClient.get('/paywall/payment-methods').then(this.checkExtraData)
    public postPaymentMethod = async (input: PaymentMethodDetails): Promise<PaymentMethodId> => await this.axiosClient.post('/paywall/payment-methods', input).then(this.checkExtraData)
    public putPaymentMethod = async (input: PaymentMethodEndpoints): Promise<void> => await this.axiosClient.put('/paywall/payment-methods/'+ input.id, input)
    public deletePaymentMethod = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/payment-methods/' + input)

    public getPaymentRequest = async (): Promise<GetPaymentRequestOutput> => await this.axiosClient.get('/paywall/payment-requests').then(this.checkExtraData)
    public postPaymentRequest = async (input: PostPaymentRequestInput): Promise<PaymentRequestId> => await this.axiosClient.post('/paywall/payment-requests', input).then(this.checkExtraData)
    public putPaymentRequest = async (input: PaymentRequestEndpoints): Promise<void> => await this.axiosClient.put('/paywall/payment-requests/'+ input.id, input)

    public getPaywallSettings = async (): Promise<PaywallSettings> => await this.axiosClient.get('paywall/payment-options').then(this.checkExtraData)
    public putPaywallSettings = async (input: PaywallSettings): Promise<void> => await this.axiosClient.put('paywall/payment-options', {...input})

    public getPaywallThemes = async (): Promise<GetPaywallThemesOutput> => await this.axiosClient.get('/paywall/themes').then(this.checkExtraData)
    public postPaywallTheme = async (input: PaywallThemeDetails): Promise<PaywallThemeId> => await this.axiosClient.post('/paywall/themes', input).then(this.checkExtraData)
    public putPaywallTheme = async (input: PaywallThemeEndpoints): Promise<void> => await this.axiosClient.put('/paywall/themes/'+ input.id, input)
    public deletePaywallTheme = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/themes/' + input)

    public getPaywallTransactions = async (input: string): Promise<GetPaywallTransactionsOutput> => await this.axiosClient.get('/paywall/transactions?' + input).then(this.checkExtraData)

    public getContentAnalytics = async (options: GetContentAnalyticsInput): Promise<GetContentAnalyticsOutput> => await this.axiosClient.get('https://api-singularity.dacast.com/v3/'+options.type+'/'+options.id+'/analytics', {params: { time_range: options.time_range,  dimension: options.dimension }, paramsSerializer: params => { return qs.stringify(params, {arrayFormat: 'comma'})} }).then(this.checkExtraData)

}