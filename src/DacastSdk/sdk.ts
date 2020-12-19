import { UserTokenService } from '../utils/services/token/token'
import { AxiosClient } from '../utils/services/axios/AxiosClient'
import { AxiosResponse } from 'axios'
import { GetPromoPresetOutput, PromoPresetDetails, PromoId, PromoPreset, GetPromoOutput, PromoDetails, PromoEndpoints, GetPricePresetOutput, PricePresetDetails, PricePresetId, PricePresetEndpoint, GetPricePackageOutput, PostPricePackageInput, PricePackageId, PutPricePackageInput, GetPaymentMethodOutput, PaymentMethodDetails, PaymentMethodId, PaymentMethodEndpoints, GetPaymentRequestOutput, PostPaymentRequestInput, PaymentRequestId, PaymentRequestEndpoints, PaywallSettings, GetPaywallThemesOutput, PaywallThemeDetails, PaywallThemeId, PaywallThemeEndpoints, GetPaywallTransactionsOutput } from './paywall'
import { PostUploadUrlInput, PostUploadUrlOutput, PutUploadFileInput } from './common'
import { GetCompanyRequestOutput, CompanyDetailsEndpoints, GetInvoicesOutput, ProfileDetails, PutProfileDetailsInput, PostUserPasswordInput } from './account'
import { GetContentAnalyticsInput, GetContentAnalyticsOutput } from './analytics'
var qs = require('qs');
import { EmbedSettings, GetEncodingRecipesOutput, GetEncodingRecipePresetsOutput, EncodingRecipeDetails, EncodingRecipeId, EncodingRecipe, EngagementSettingsEndoint, PutAdInput, GeoRestrictionDetails, GeoRestrictionId, GeoRestrictionEndpoint, DomainControlId, DomainControlDetails, DomainControlEndpoint, GetSecuritySettingsOutput, PutSecuritySettingsInput, GetThemeSettingsOutput, ThemeSettings, ThemeId, ThemeEndpoint } from './settings'
import { isProduction } from '../app/utils/services/player/stage'
import { GetAccountAllowancesOutput, GetAccountDetailsOutput, GetAccountPlanOutput, GetAccountsListOutput, GetAccountsTransactionsOutput, GetAccountsWithdrawalsOutput, GetPirateInfoOutput, GetWithdrawalDetailsOutput, PostAccountAllowancesInput, PostAccountTransactionInput, PostImpersonateAccountInput, PostImpersonateAccountOutput, PutAccountDetailsInput, PutAccountPlanInput, PutWithdrawalDetailsInput } from './admin'
import { PostEncoderKeyOutput } from './live'
const GRAPHQL_API_BASE_URL_STAGING = 'https://api-singularity.dacast.com/v3/'
const GRAPHQL_API_BASE_URL_PROD = 'https://developer.dacast.com/v3/'

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

    public postImpersonateAccount = async (input: PostImpersonateAccountInput): Promise<PostImpersonateAccountOutput> => await this.axiosClient.post('/impersonate', input).then(this.checkExtraData)
    
    public getAccounts = async (input: string): Promise<GetAccountsListOutput> => await this.axiosClient.get('/accounts?' + input).then(this.checkExtraData)
    public getAccountDetails = async (input: string): Promise<GetAccountDetailsOutput> => await this.axiosClient.get('/accounts/' + input).then(this.checkExtraData)
    public putAccountDetails = async (input: PutAccountDetailsInput, accountId: string): Promise<void> => await this.axiosClient.put('/accounts/' + accountId, input)
    public postCreateLegacyAccount = async (input: string): Promise<void> => await this.axiosClient.post('/accounts/' + input + '/create-legacy')
    public getAccountPlan = async (input: string): Promise<GetAccountPlanOutput> => await this.axiosClient.get('/privileges/' + input).then(this.checkExtraData)
    public putAccountPlan = async (input: PutAccountPlanInput, accountId: string): Promise<void> => await this.axiosClient.put('/privileges/' + accountId, input)
    public getAccountAllowances = async (input: string): Promise<GetAccountAllowancesOutput> => await this.axiosClient.get('/credits/' + input).then(response => response.data)
    public postAccountAllowances = async (input: PostAccountAllowancesInput, accountId: string): Promise<void> => await this.axiosClient.post('/credits/' + accountId + '/add', input)
    public getAccountsWithdrawals = async (input: string): Promise<GetAccountsWithdrawalsOutput> => await this.axiosClient.get('/payment-requests?' + input).then(this.checkExtraData)
    public getWithdrawalDetails = async (input: string): Promise<GetWithdrawalDetailsOutput> => await this.axiosClient.get('/payment-requests/' + input).then(this.checkExtraData)
    public putWithdrawalDetails = async (input: PutWithdrawalDetailsInput, withdrawalId: string): Promise<void> => await this.axiosClient.put('/payment-requests/' + withdrawalId, input)
    public getAccountsTransactions = async (input: string): Promise<GetAccountsTransactionsOutput> => await this.axiosClient.get('/paywall-transactions?' + input).then(this.checkExtraData)
    public postAccountTransaction = async (input: PostAccountTransactionInput): Promise<void> => await this.axiosClient.post('/paywall-transactions', input)
    public getPirateInfo = async (input: string): Promise<GetPirateInfoOutput> => await this.axiosClient.get('/identify-cdn-url?url=' + input).then(this.checkExtraData)
    
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

    public getEncodingRecipePresets = async (): Promise<GetEncodingRecipePresetsOutput> => await this.axiosClient.get('/settings/encoding-recipes/presets').then(this.checkExtraData)
    public getEncodingRecipes = async (): Promise<GetEncodingRecipesOutput> => await this.axiosClient.get('/settings/encoding-recipes').then(this.checkExtraData)
    public postEncodingRecipe = async (input: EncodingRecipeDetails): Promise<EncodingRecipeId> => await this.axiosClient.post('/settings/encoding-recipes', {...input}).then(this.checkExtraData)
    public putEncodingRecipe = async (input: EncodingRecipe): Promise<void> => await this.axiosClient.put('/settings/encoding-recipes/' + input.id, {...input})
    public deleteEncodingRecipe = async (input: string): Promise<void> => await this.axiosClient.delete('/settings/encoding-recipes/' + input)

    public getEngagementSettings = async (): Promise<EngagementSettingsEndoint> => await this.axiosClient.get('/accounts/' + this.userId + '/settings/engagement').then(this.checkExtraData)
    public putEngagementSettings = async (input: EngagementSettingsEndoint) => await this.axiosClient.put('/accounts/' + this.userId + '/settings/engagement', {...input})
    public putAdsSettings = async (input: PutAdInput): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/settings/engagement/ads', {...input})
    public deleteUserBrandImage = async (): Promise<void> => await this.axiosClient.delete('/accounts/' + this.userId + '/settings/engagement/brand-image')
    
    public getSecuritySettings = async (): Promise<GetSecuritySettingsOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/settings/security').then(this.checkExtraData)
    public putSecuritySettings = async (input: PutSecuritySettingsInput): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/settings/security', {...input})
    public postGeoRestriction = async (input: GeoRestrictionDetails): Promise<GeoRestrictionId> => await this.axiosClient.post('/accounts/' + this.userId + '/settings/security/restrictions', {...input}).then(this.checkExtraData)
    public putGeoRestriction = async (input: GeoRestrictionEndpoint): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/settings/security/restrictions/' + input.id, {...input})
    public deleteGeoRestriction = async (input: string): Promise<void> => await this.axiosClient.delete('/accounts/' + this.userId + '/settings/security/restrictions/' + input)
    public postDomainControl = async (input: DomainControlDetails): Promise<DomainControlId> => await this.axiosClient.post('/accounts/' + this.userId + '/settings/security/restrictions', {...input}).then(this.checkExtraData)
    public putDomainControl = async (input: DomainControlEndpoint): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/settings/security/restrictions/' + input.id, {...input})
    public deleteDomainControl = async (input: string): Promise<void> => await this.axiosClient.delete('/accounts/' + this.userId + '/settings/security/restrictions/' + input)
    
    public getThemes = async (): Promise<GetThemeSettingsOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/settings/themes').then(this.checkExtraData)
    public postTheme = async (input: ThemeSettings): Promise<ThemeId> => await this.axiosClient.post('/accounts/' + this.userId + '/settings/themes', {...input}).then(this.checkExtraData)
    public putTheme = async (input: ThemeEndpoint): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/settings/themes/' + input.id, {...input})
    public deleteTheme = async (input: string): Promise<void> => await this.axiosClient.delete('/accounts/' + this.userId + '/settings/themes/' + input)
    
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
    public getPaywallTransactionsCsv = async (input: string): Promise<string> => await this.axiosClient.get('paywall/transactions/csv?' + input).then(this.checkExtraData)

    public getContentAnalytics = async (options: GetContentAnalyticsInput): Promise<GetContentAnalyticsOutput> => await this.axiosClient.get(`${isProduction() ? GRAPHQL_API_BASE_URL_PROD : GRAPHQL_API_BASE_URL_STAGING}${options.type}/${options.id}/analytics`, {params: { time_range: options.time_range,  dimension: options.dimension, end: options.end, start: options.start }, paramsSerializer: params => { return qs.stringify(params, {arrayFormat: 'comma'})} }).then(this.checkExtraData)
    public postEncoderKey = async (input: string): Promise<PostEncoderKeyOutput> => await this.axiosClient.post(`${isProduction() ? GRAPHQL_API_BASE_URL_PROD : GRAPHQL_API_BASE_URL_STAGING}live/${input}/encoder-key`).then(this.checkExtraData)
}