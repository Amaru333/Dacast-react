import { UserTokenService } from '../utils/services/token/token'
import { AxiosClient } from '../utils/services/axios/AxiosClient'
import { AxiosResponse } from 'axios'
import { GetPromoPresetOutput, PromoPresetDetails, PromoId, PromoPreset, GetPromoOutput, PromoDetails, PromoEndpoints, GetPricePresetOutput, PricePresetDetails, PricePresetId, PricePresetEndpoint, GetPricePackageOutput, PostPricePackageInput, PricePackageId, PutPricePackageInput, GetPaymentMethodOutput, PaymentMethodDetails, PaymentMethodId, PaymentMethodEndpoints, GetPaymentRequestOutput, PostPaymentRequestInput, PaymentRequestId, PaymentRequestEndpoints, PaywallSettings, GetPaywallThemesOutput, PaywallThemeDetails, PaywallThemeId, PaywallThemeEndpoints, GetPaywallTransactionsOutput, GetPaywallBalanceOutput } from './paywall'
import { DeleteContentImageAssetIdInput, DeleteContentPriceInput, GetContentPaywallInfoOutput, GetContentPricesOutput, GetContentSecuritySettingsOutput, GetContentThemeOutput, GetSearchContentOutput, PostBulkActionInput, PostBulkActionOutput, PostContentCustomThemeInput, PostContentPriceInput, PostContentPriceOutput, PostUploadUrlInput, PostUploadUrlOutput, PutContentAdsInput, PutContentThemeInput, PutContentEngagementSettingsInput, PutContentLockEngagementSettingsInput, PutContentPaywallInfoInput, PutContentPriceInput, PutContentSecuritySettingsInput, PutUploadFileInput } from './common'
import { GetCompanyRequestOutput, CompanyDetailsEndpoints, GetInvoicesOutput, ProfileDetails, PutProfileDetailsInput, PostUserPasswordInput, GetPlansListOutput, PostAccountPlanInput, PostAccountPlanOutput, GetProductExtraDataOutput, PostProductExtraDataInput, PostProductExtraDataOutput, GetAccountBillingInfoOutput, PostBillingPaymentMethodInput, PostBillingPaymentMethodOutput, PutPlaybackProtectionInput, GetUsersDetailsOutput, PostUserInput, PostUserRoleInput, DeleteUserInput } from './account'
import { GetAnalyticsInput, GetAnalyticsOutput } from './analytics'
var qs = require('qs');
import { EmbedSettings, GetEncodingRecipesOutput, GetEncodingRecipePresetsOutput, EncodingRecipeDetails, EncodingRecipeId, EncodingRecipe, EngagementSettingsEndpoint, PutAdInput, GeoRestrictionDetails, GeoRestrictionId, GeoRestrictionEndpoint, DomainControlId, DomainControlDetails, DomainControlEndpoint, GetSecuritySettingsOutput, PutSecuritySettingsInput, GetThemeSettingsOutput, ThemeSettings, ThemeId, ThemeEndpoint } from './settings'
import { isProduction } from '../app/utils/services/player/stage'
import { GetAccountAllowancesOutput, GetAccountDetailsOutput, GetAccountPlanOutput, GetAccountsListOutput, GetAccountsTransactionsOutput, GetAccountsWithdrawalsOutput, GetJobsListOutput, GetMigratedUsersListOutput, GetMigrationJobDetailsOutput, GetPirateInfoOutput, GetWithdrawalDetailsOutput, PostAccountAllowancesInput, PostAccountTransactionInput, PostImpersonateAccountInput, PostImpersonateAccountOutput, PostStartMigrationJobInput, PostSwitchOverUsersInput, PutAccountDetailsInput, PutAccountPlanInput, PutExtendTrialInput, PutWithdrawalDetailsInput } from './admin'
import { GetLiveDetailsOutput, PostEncoderKeyOutput, PutLiveDetailsInput } from './live'
import { GetDashboardGeneralInfoOutput, GetDashboardInfoOutput, GetDashboardLiveOutput, GetDashboardPaywallOutput, GetDashboardVodOutput } from './dashboard'
import { GetDownloadVodUrlOuput, GetVideoDetailsOutput, GetVodChapterMarkersOutput, GetVodRenditionsOutput, PostUploadImageFromVideoInput, PutVideoDetailsInput, PutVodChapterMarkersInput } from './video'
import { GetPlaylistDetailsOutput, GetPlaylistSetupOutput, PutPlaylistDetailsInput, PutPlaylistSetupInput } from './playlist'
import { GetExpoDetailsOutput, GetExpoSetupOutput, PutExpoDetailsInput, PutExpoSetupInput } from './expo'
import { PostLoginInput, PostLoginOuput } from './session'
const GRAPHQL_API_BASE_URL_STAGING = 'https://api-singularity.dacast.com/v2/'
const GRAPHQL_API_BASE_URL_PROD = 'https://developer.dacast.com/v2/'

export class DacastSdk {

    constructor(baseUrl: string, userToken: UserTokenService, refreshTokenUrl?: string) {
        this.axiosClient = new AxiosClient(baseUrl, userToken, refreshTokenUrl)
        this.userId = userToken.getUserInfoItem('user-id')
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
        this.userId = newToken.getUserInfoItem('user-id')
    }

    public forceRefresh = async (): Promise<void> => await this.axiosClient.forceRefresh()

    public postLogin = async (input: PostLoginInput): Promise<PostLoginOuput> => await this.axiosClient.post('/sessions/login', input, {authRequired: false}).then(this.checkExtraData)

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
    public putExtendTrial = async (input: PutExtendTrialInput): Promise<void> => await this.axiosClient.put('/accounts/' + input.userId + '/extend-trial', input.payload)
    
    public getJobsList = async (): Promise<GetJobsListOutput> => await this.axiosClient.get('/migration/jobs').then(this.checkExtraData)
    public getJobDetails = async (input: string): Promise<GetMigrationJobDetailsOutput> => await this.axiosClient.get('/migration/job/' + input).then(this.checkExtraData)
    public postStartMigrationJob = async (input: PostStartMigrationJobInput) => await this.axiosClient.post('/migration/job', input)
    public postSwitchOverUsers = async (input: PostSwitchOverUsersInput, jobId: string) => await this.axiosClient.post('/migration/job/' + jobId + '/switchover', input)
    public getMigratedUsersList = async (input: string): Promise<GetMigratedUsersListOutput> => await this.axiosClient.get('/migration/users' + input).then(this.checkExtraData)

    public getDashboardInfo = async (): Promise<GetDashboardInfoOutput> => await this.axiosClient.get('/dashboard').then(this.checkExtraData)
    public getDashboardGeneralInfo = async (): Promise<GetDashboardGeneralInfoOutput> => await this.axiosClient.get('/dashboard/general').then(this.checkExtraData)
    public getDashboardLiveInfo = async (): Promise<GetDashboardLiveOutput> => await this.axiosClient.get('/dashboard/live').then(this.checkExtraData)
    public getDashboardVodInfo = async (): Promise<GetDashboardVodOutput> => await this.axiosClient.get('/dashboard/vod').then(this.checkExtraData)
    public getDashboardPaywallInfo = async (): Promise<GetDashboardPaywallOutput> => await this.axiosClient.get('/dashboard/paywall').then(this.checkExtraData)

    public postUploadUrl = async (input: PostUploadUrlInput): Promise<PostUploadUrlOutput> => await this.axiosClient.post('/uploads/signatures/singlepart/' + input.uploadType, {...input.uploadRequestBody}).then(this.checkExtraData)
    public putUploadFile = async (input: PutUploadFileInput): Promise<void> => await this.axiosClient.put(input.uploadUrl, input.data, {authRequired: false})

    public getCompanyDetails = async (): Promise<GetCompanyRequestOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/company').then(this.checkExtraData)
    public putCompanyDetails = async (input: CompanyDetailsEndpoints): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/company', {...input}).then(this.checkExtraData)
    public deleteCompanyLogo = async (): Promise<void> => await this.axiosClient.delete('/accounts/' + this.userId + '/company/logo')

    public getPlansList = async (): Promise<GetPlansListOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/plans').then(this.checkExtraData)
    public postAccountPlan = async (input: PostAccountPlanInput): Promise<PostAccountPlanOutput> => await this.axiosClient.post('/accounts/' + this.userId + '/plans/purchase', input).then(this.checkExtraData)

    public getProductExtraDataList = async (): Promise<GetProductExtraDataOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/products').then(this.checkExtraData)
    public postProductExtraData = async (input: PostProductExtraDataInput): Promise<PostProductExtraDataOutput> => await this.axiosClient.post('/accounts/' + this.userId + '/products/purchase', input).then(this.checkExtraData)
    public putPlaybackProtection = async (input: PutPlaybackProtectionInput): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/billing/playback-protection', input)

    public getBillingInfo = async (): Promise<GetAccountBillingInfoOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/billing').then(this.checkExtraData)
    public postBillingPaymentMethod = async (input: PostBillingPaymentMethodInput): Promise<PostBillingPaymentMethodOutput> => await this.axiosClient.post('/accounts/' + this.userId + '/billing/payment-method', input).then(this.checkExtraData)

    public getInvoices = async (input: string): Promise<GetInvoicesOutput> => await this.axiosClient.get('/accounts/' + this.userId + '/billing/invoices?' + input).then(this.checkExtraData)

    public getProfileDetails = async (): Promise<ProfileDetails> => await this.axiosClient.get('/accounts/' + this.userId + '/profile').then(this.checkExtraData)
    public putProfileDetails = async (input: PutProfileDetailsInput): Promise<void> => await this.axiosClient.put('/accounts/' + this.userId + '/profile', {...input})
    public postUserPassword = async (input: PostUserPasswordInput): Promise<void> => await this.axiosClient.post('/accounts/' + this.userId + '/change-password', {...input})

    public getUsersDetails = async (): Promise<GetUsersDetailsOutput> => await this.axiosClient.get('/multi-user').then(this.checkExtraData)
    public postUser = async (input: PostUserInput): Promise<void> => await this.axiosClient.post('/multi-user/invites', input)
    public postUserRole = async (input: PostUserRoleInput): Promise<void> => await this.axiosClient.post('/multi-user/' + input.id + '/set-role', input.payload)
    public postMakeUserOwner = async (input: string): Promise<void> => await this.axiosClient.post('/multi-user/' + input + '/make-owner')
    public postCancelUserInvite = async (input: string): Promise<void> => await this.axiosClient.post('/multi-user/invites/' + input + '/cancel')
    public postResendUserInvite = async (input: string): Promise<void> => await this.axiosClient.post('/multi-user/invites/' + input + '/resend-email')
    public deleteUser = async (input: DeleteUserInput): Promise<void> => await this.axiosClient.post('/multi-user/' + input.id + '/delete', input.payload)

    public getEmbedSettings = async (): Promise<EmbedSettings> => await this.axiosClient.get('/settings/embed').then(this.checkExtraData)
    public putEmbedSettings = async (input: EmbedSettings): Promise<void> => await this.axiosClient.put('/settings/embed', {...input})

    public getEncodingRecipePresets = async (): Promise<GetEncodingRecipePresetsOutput> => await this.axiosClient.get('/settings/encoding-recipes/presets').then(this.checkExtraData)
    public getEncodingRecipes = async (): Promise<GetEncodingRecipesOutput> => await this.axiosClient.get('/settings/encoding-recipes').then(this.checkExtraData)
    public postEncodingRecipe = async (input: EncodingRecipeDetails): Promise<EncodingRecipeId> => await this.axiosClient.post('/settings/encoding-recipes', {...input}).then(this.checkExtraData)
    public putEncodingRecipe = async (input: EncodingRecipe): Promise<void> => await this.axiosClient.put('/settings/encoding-recipes/' + input.id, {...input})
    public deleteEncodingRecipe = async (input: string): Promise<void> => await this.axiosClient.delete('/settings/encoding-recipes/' + input)

    public getEngagementSettings = async (): Promise<EngagementSettingsEndpoint> => await this.axiosClient.get('/accounts/' + this.userId + '/settings/engagement').then(this.checkExtraData)
    public putEngagementSettings = async (input: EngagementSettingsEndpoint) => await this.axiosClient.put('/accounts/' + this.userId + '/settings/engagement', {...input})
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
    public putPricePreset = async (input: PricePresetEndpoint): Promise<void> => await this.axiosClient.put('/paywall/prices/presets/' + input.id, input)
    public deletePricePreset = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/prices/presets/' + input)

    public getPricePackage = async (input: string): Promise<GetPricePackageOutput> => await this.axiosClient.get('/paywall/prices/groups?' + input).then(this.checkExtraData)
    public postPricePackage = async (input: PostPricePackageInput): Promise<PricePackageId> => await this.axiosClient.post('/paywall/prices/groups', {...input}).then(this.checkExtraData)
    public putPricePackage = async (input: PutPricePackageInput): Promise<void> => await this.axiosClient.put('/paywall/prices/groups/' + input.id, {package: input})
    public deletePricePackage = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/prices/groups/' + input)
    public getPricePackageContents = async (input: string): Promise<GetPricePackageOutput> => await this.axiosClient.get('/paywall/prices/groups/' + input).then(this.checkExtraData)

    public getPaymentMethod = async (): Promise<GetPaymentMethodOutput> => await this.axiosClient.get('/paywall/payment-methods').then(this.checkExtraData)
    public postPaymentMethod = async (input: PaymentMethodDetails): Promise<PaymentMethodId> => await this.axiosClient.post('/paywall/payment-methods', input).then(this.checkExtraData)
    public putPaymentMethod = async (input: PaymentMethodEndpoints): Promise<void> => await this.axiosClient.put('/paywall/payment-methods/'+ input.id, input)
    public deletePaymentMethod = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/payment-methods/' + input)

    public getPaymentRequest = async (): Promise<GetPaymentRequestOutput> => await this.axiosClient.get('/paywall/payment-requests').then(this.checkExtraData)
    public postPaymentRequest = async (input: PostPaymentRequestInput): Promise<PaymentRequestId> => await this.axiosClient.post('/paywall/payment-requests', input).then(this.checkExtraData)
    public putPaymentRequest = async (input: PaymentRequestEndpoints): Promise<void> => await this.axiosClient.put('/paywall/payment-requests/'+ input.id, input)

    public getPaywallBalance = async (): Promise<GetPaywallBalanceOutput> => await this.axiosClient.get('/paywall/balance').then(this.checkExtraData)
    
    public getPaywallSettings = async (): Promise<PaywallSettings> => await this.axiosClient.get('paywall/payment-options').then(this.checkExtraData)
    public putPaywallSettings = async (input: PaywallSettings): Promise<void> => await this.axiosClient.put('paywall/payment-options', {...input})

    public getPaywallThemes = async (): Promise<GetPaywallThemesOutput> => await this.axiosClient.get('/paywall/themes').then(this.checkExtraData)
    public postPaywallTheme = async (input: PaywallThemeDetails): Promise<PaywallThemeId> => await this.axiosClient.post('/paywall/themes', input).then(this.checkExtraData)
    public putPaywallTheme = async (input: PaywallThemeEndpoints): Promise<void> => await this.axiosClient.put('/paywall/themes/'+ input.id, input)
    public deletePaywallTheme = async (input: string): Promise<void> => await this.axiosClient.delete('/paywall/themes/' + input)

    public getPaywallTransactions = async (input: string): Promise<GetPaywallTransactionsOutput> => await this.axiosClient.get('/paywall/transactions?' + input).then(this.checkExtraData)
    public getPaywallTransactionsCsv = async (input: string): Promise<string> => await this.axiosClient.get('paywall/transactions/csv?' + input).then(this.checkExtraData)
    public syncTransactions = async (): Promise<string> => await this.axiosClient.put('paywall/transactions/sync')

    public getContentPrices = async (input: string): Promise<GetContentPricesOutput> => await this.axiosClient.get('/paywall/prices?content-id=' + input).then(this.checkExtraData)
    public postContentPrice = async (input: PostContentPriceInput): Promise<PostContentPriceOutput> => await this.axiosClient.post('/paywall/prices', input).then(this.checkExtraData)
    public putContentPrice = async (input: PutContentPriceInput): Promise<void> => await this.axiosClient.put('/paywall/prices/' + input.id, input)
    public deleteContentPrice = async (input: DeleteContentPriceInput): Promise<void> => await this.axiosClient.delete('/paywall/prices/' + input.id + '?content-id=' + input.contentId)
    
    public getAccountAnalytics = async (options: GetAnalyticsInput): Promise<GetAnalyticsOutput> => await this.axiosClient.get(`${isProduction() ? GRAPHQL_API_BASE_URL_PROD : GRAPHQL_API_BASE_URL_STAGING}${options.type}/analytics`, {params: { time_range: options.time_range,  dimension: options.dimension, end: options.end, start: options.start }, paramsSerializer: params => { return qs.stringify(params, {arrayFormat: 'comma'})} }).then(this.checkExtraData)
    public getContentAnalytics = async (options: GetAnalyticsInput): Promise<GetAnalyticsOutput> => await this.axiosClient.get(`${isProduction() ? GRAPHQL_API_BASE_URL_PROD : GRAPHQL_API_BASE_URL_STAGING}${options.type}/${options.id}/analytics`, {params: { time_range: options.time_range,  dimension: options.dimension, end: options.end, start: options.start }, paramsSerializer: params => { return qs.stringify(params, {arrayFormat: 'comma'})} }).then(this.checkExtraData)

    public getExpos = async (input: string): Promise<GetSearchContentOutput> => await this.axiosClient.get('/expos?' + input).then(this.checkExtraData)
    public deleteExpo = async (input: string): Promise<void> => await this.axiosClient.delete('/expos/' + input)
    public getExpoDetails = async (input: string): Promise<GetExpoDetailsOutput> => await this.axiosClient.get('/expos/' + input).then(this.checkExtraData)
    public putExpoDetails = async (input: PutExpoDetailsInput): Promise<void> => await this.axiosClient.put('/expos/' + input.id, input.payload)
    public deleteExpoImageAsset = async (input: DeleteContentImageAssetIdInput): Promise<void> => await this.axiosClient.delete(`/expos/${input.id}/targets/${input.targetId}`)
    public getExpoSetup = async (input: string): Promise<GetExpoSetupOutput> => await this.axiosClient.get('/expos/' + input + '/setup').then(this.checkExtraData)
    public putExpoSetup = async (input: PutExpoSetupInput): Promise<void> => await this.axiosClient.put('/expos/' + input.id + '/setup', input.payload)

    public getChannels = async (input: string): Promise<GetSearchContentOutput> => await this.axiosClient.get('/channels?' + input).then(this.checkExtraData)
    public deleteChannel = async (input: string): Promise<void> => await this.axiosClient.delete('/channels/' + input)
    public getChannelEngagementSettings = async (input: string): Promise<EngagementSettingsEndpoint> => await this.axiosClient.get('/channels/' + input + '/settings/engagement').then(this.checkExtraData)
    public putChannelEngagementSettings = async (input: PutContentEngagementSettingsInput): Promise<void> => await this.axiosClient.put('/channels/' + input.id + '/settings/engagement', input)
    public putChannelLockEngagementSettings = async (input: PutContentLockEngagementSettingsInput): Promise<void> => await this.axiosClient.put('/channels/' + input.id + '/settings/engagement/' + input.section + '/' + input.action)
    public putChannelAds = async (input: PutContentAdsInput): Promise<void> => await this.axiosClient.put('/channels/' + input.id + '/settings/engagement/ads', input.data)
    public deleteChannelBrandImage = async (input: string): Promise<void> => await this.axiosClient.delete('/channels/' + input + '/settings/engagement/brand-image')
    public getChannelDetails = async (input: string): Promise<GetLiveDetailsOutput> => await this.axiosClient.get('/channels/' + input).then(this.checkExtraData)
    public putChannelDetails = async (input: PutLiveDetailsInput): Promise<void> => await this.axiosClient.put('/channels/' + input.id, input.payload)
    public deleteChannelImageAsset = async (input: DeleteContentImageAssetIdInput): Promise<void> => await this.axiosClient.delete(`/channels/${input.id}/targets/${input.targetId}`)
    public getChannelPaywallInfo = async (input: string): Promise<GetContentPaywallInfoOutput> => await this.axiosClient.get('/channels/' + input + '/paywall').then(this.checkExtraData)
    public putChannelPaywallInfo = async (input: PutContentPaywallInfoInput): Promise<void> => await this.axiosClient.put('/channels/' + input.id + '/paywall', input.payload).then(this.checkExtraData)
    public getChannelSecuritySettings = async (input: string): Promise<GetContentSecuritySettingsOutput> => await this.axiosClient.get('/channels/' + input + '/settings/security').then(this.checkExtraData)
    public putChannelSecuritySettings = async (input: PutContentSecuritySettingsInput): Promise<void> => await this.axiosClient.put('/channels/' + input.id + '/settings/security', input.payload)
    public putLockChannelSecuritySettings = async (input: string): Promise<void> => await this.axiosClient.put('/channels/' + input + '/settings/security/lock')
    public getChannelThemes = async (input: string): Promise<GetContentThemeOutput> => await this.axiosClient.get('/channels/' + input + '/settings/themes').then(this.checkExtraData)
    public postChannelCustomTheme = async (input: PostContentCustomThemeInput): Promise<ThemeId> => await this.axiosClient.post('/channels/' + input.contentId + '/settings/themes', input.payload).then(this.checkExtraData)
    public putChannelCustomTheme = async (input: PutContentThemeInput): Promise<void> => await this.axiosClient.put('/channels/' + input.contentId + '/settings/themes/' + input.payload.id + input.actionWord, input.payload)

    public getVods = async (input: string): Promise<GetSearchContentOutput> => await this.axiosClient.get('/vods?' + input).then(this.checkExtraData)
    public deleteVod = async (input: string): Promise<void> => await this.axiosClient.delete('/vods/' + input)
    public getVodEngagementSettings = async (input: string): Promise<EngagementSettingsEndpoint> => await this.axiosClient.get('/vods/' + input + '/settings/engagement').then(this.checkExtraData)
    public putVodEngagementSettings = async (input: PutContentEngagementSettingsInput): Promise<void> => await this.axiosClient.put('/vods/' + input.id + '/settings/engagement', input)
    public putVodLockEngagementSettings = async (input: PutContentLockEngagementSettingsInput): Promise<void> => await this.axiosClient.put('/vods/' + input.id + '/settings/engagement/' + input.section + '/' + input.action)
    public putVodAds = async (input: PutContentAdsInput): Promise<void> => await this.axiosClient.put('/vods/' + input.id + '/settings/engagement/ads', input.data)
    public deleteVodBrandImage = async (input: string): Promise<void> => await this.axiosClient.delete('/vods/' + input + '/settings/engagement/brand-image')
    public getVodDetails = async (input: string): Promise<GetVideoDetailsOutput> => await this.axiosClient.get('/vods/' + input).then(this.checkExtraData)
    public putVodDetails = async (input: PutVideoDetailsInput): Promise<void> => await this.axiosClient.put('/vods/' + input.id, input.payload)
    public postUploadImageFromVideo = async (input: PostUploadImageFromVideoInput): Promise<void> => await this.axiosClient.post(`/vods/${input.id}/targets/${input.imageType}`, input.payload)
    public deleteVodImageAsset = async (input: DeleteContentImageAssetIdInput): Promise<void> => await this.axiosClient.delete(`/vods/${input.id}/targets/${input.targetId}`)
    public getDownloadVodUrl = async (input: string): Promise<GetDownloadVodUrlOuput> => await this.axiosClient.get('/vods/' + input + '/download-url').then(this.checkExtraData)
    public getRestoreVod = async (input: string): Promise<void> => await this.axiosClient.get('/vods/' + input + '/restore')
    public getVodPaywallInfo = async (input: string): Promise<GetContentPaywallInfoOutput> => await this.axiosClient.get('/vods/' + input + '/paywall').then(this.checkExtraData)
    public putVodPaywallInfo = async (input: PutContentPaywallInfoInput): Promise<void> => await this.axiosClient.put('/vods/' + input.id + '/paywall', input.payload).then(this.checkExtraData)
    public getVodSecuritySettings = async (input: string): Promise<GetContentSecuritySettingsOutput> => await this.axiosClient.get('/vods/' + input + '/settings/security').then(this.checkExtraData)
    public putVodSecuritySettings = async (input: PutContentSecuritySettingsInput): Promise<void> => await this.axiosClient.put('/vods/' + input.id + '/settings/security', input.payload)
    public putLockVodSecuritySettings = async (input: string): Promise<void> => await this.axiosClient.put('/vods/' + input + '/settings/security/lock')
    public getVodThemes = async (input: string): Promise<GetContentThemeOutput> => await this.axiosClient.get('/vods/' + input + '/settings/themes').then(this.checkExtraData)
    public postVodCustomTheme = async (input: PostContentCustomThemeInput): Promise<ThemeId> => await this.axiosClient.post('/vods/' + input.contentId + '/settings/themes', input.payload).then(this.checkExtraData)
    public putVodCustomTheme = async (input: PutContentThemeInput): Promise<void> => await this.axiosClient.put('/vods/' + input.contentId + '/settings/themes/' + input.payload.id + input.actionWord, input.payload)
    public getVodRenditions = async (input: string): Promise<GetVodRenditionsOutput> => await this.axiosClient.get('/vods/' + input + '/renditions').then(this.checkExtraData)
    public getVodChapterMarkers = async (input: string): Promise<GetVodChapterMarkersOutput> => await this.axiosClient.get('/vods/' + input + '/chapter-markers').then(this.checkExtraData)
    public putVodChapterMarkers = async (input: PutVodChapterMarkersInput): Promise<void> => await this.axiosClient.put('/vods/' + input.id + '/chapter-markers', input.payload)
    
    public getPlaylists = async (input: string): Promise<GetSearchContentOutput> => await this.axiosClient.get('/playlists?' + input).then(this.checkExtraData)
    public deletePlaylist = async (input: string): Promise<void> => await this.axiosClient.delete('/playlists/' + input)
    public getPlaylistDetails = async (input: string): Promise<GetPlaylistDetailsOutput> => await this.axiosClient.get('/playlists/' + input).then(this.checkExtraData)
    public putPlaylistDetails = async (input: PutPlaylistDetailsInput): Promise<void> => await this.axiosClient.put('/playlists/' + input.id, input.payload)
    public deletePlaylistImageAsset = async (input: DeleteContentImageAssetIdInput): Promise<void> => await this.axiosClient.delete(`/playlists/${input.id}/targets/${input.targetId}`)
    public getPlaylistSetup = async (input: string): Promise<GetPlaylistSetupOutput> => await this.axiosClient.get('/playlists/' + input + '/setup').then(this.checkExtraData)
    public putPlaylistSetup = async (input: PutPlaylistSetupInput): Promise<void> => await this.axiosClient.put('/playlists/' + input.id + '/setup', input)
    public getPlaylistPaywallInfo = async (input: string): Promise<GetContentPaywallInfoOutput> => await this.axiosClient.get('/playlists/' + input + '/paywall').then(this.checkExtraData)
    public putPlaylistPaywallInfo = async (input: PutContentPaywallInfoInput): Promise<void> => await this.axiosClient.put('/playlists/' + input.id + '/paywall', input.payload).then(this.checkExtraData)
    public getPlaylistSecuritySettings = async (input: string): Promise<GetContentSecuritySettingsOutput> => await this.axiosClient.get('/playlists/' + input + '/settings/security').then(this.checkExtraData)
    public putPlaylistSecuritySettings = async (input: PutContentSecuritySettingsInput): Promise<void> => await this.axiosClient.put('/playlists/' + input.id + '/settings/security', input.payload)
    public putLockPlaylistSecuritySettings = async (input: string): Promise<void> => await this.axiosClient.put('/playlists/' + input + '/settings/security/lock')
    public getPlaylistThemes = async (input: string): Promise<GetContentThemeOutput> => await this.axiosClient.get('/playlists/' + input + '/settings/themes').then(this.checkExtraData)
    public postPlaylistCustomTheme = async (input: PostContentCustomThemeInput): Promise<ThemeId> => await this.axiosClient.post('/playlists/' + input.contentId + '/settings/themes', input.payload).then(this.checkExtraData)
    public putPlaylistCustomTheme = async (input: PutContentThemeInput): Promise<void> => await this.axiosClient.put('/playlists/' + input.contentId + '/settings/themes/' + input.payload.id + input.actionWord, input.payload)

    public postEncoderKey = async (input: string): Promise<PostEncoderKeyOutput> => await this.axiosClient.post(`${isProduction() ? GRAPHQL_API_BASE_URL_PROD : GRAPHQL_API_BASE_URL_STAGING}live/${input}/encoder-key`).then(this.checkExtraData)
    public postBulkAction = async (input: PostBulkActionInput): Promise<PostBulkActionOutput> => await this.axiosClient.post('bulk', input).then(this.checkExtraData)
}
