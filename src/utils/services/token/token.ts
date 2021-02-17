export type AdverstisingPrivilege = "privilege-advertising";
export type AesPrivilege = "privilege-aes";
export type ApiPrivilege = "privilege-api";
export type ChinaPrivilege = "privilege-china";
export type DvrPrivilege = "privilege-dvr";
export type EmailCatcherPrivilege = "privilege-email-catcher";
export type FoldersPrivilege = "privilege-folders";
export type GroupIdPrivilege = "privilege-group-id";
export type LivePrivilege = "privilege-live";
export type PaywallPrivilege = "privilege-paywall";
export type PlayerDownloadPrivilege = "privilege-player-download";
export type PlaylistPrivilege = "privilege-playlists";
export type RecordingPrivilege = "privilege-recording"
export type SignedKeysPrivilege = "privilege-signed-keys";
export type UnsecureM3u8Privilege = "privilege-unsecure-m3u8";
export type VodPrivilege = "privilege-vod";
export type WebDownloadPrivilege = "privilege-web-download";
export type AnalyticsPrivilege = "privilege-analytics";
export type ExposPrivilege = "privilege-expo";
export type PhoneSupportPrivilege = "privilege-phone-support"

export type Privilege = AdverstisingPrivilege | AesPrivilege | ApiPrivilege | ChinaPrivilege | DvrPrivilege | EmailCatcherPrivilege | FoldersPrivilege |
GroupIdPrivilege | LivePrivilege | PaywallPrivilege | PlayerDownloadPrivilege | PlaylistPrivilege | RecordingPrivilege | SignedKeysPrivilege | UnsecureM3u8Privilege |
VodPrivilege | WebDownloadPrivilege | AnalyticsPrivilege | ExposPrivilege | PhoneSupportPrivilege;

type ExtraUserInfo = 'custom:dacast_user_id' | 'custom:first_name' | 'custom:last_name' | 'email' | 'custom:website' | 'planName' | 'planAmount' | 'companyName'

type GroupIds = 'credit-group-id' | 'live-channel-group-id' | 'monetization-group-id' | 'restriction-group-id' | 'billing-group-id' | 'privilege-group-id' | 'expo-group-id' | 'transcoding-recipe-group-id' | 'vod-storage-id' | 'policy-group-id' | 'folder-group-id' | 'salesforce-group-id' | 'playlist-group-id' | 'theme-group-id' | 'payment-group-id' | 'ads-group-id'

type UserInfo = {
    [key in ExtraUserInfo | Privilege | GroupIds]: string
}

interface TokenInfo {
    token: string;
    accessToken?: string;
    refresh: string;
    expires: number;
    userInfo?: UserInfo;
    impersonatedUserIdentifier?: string;
}

var base64 = require('base-64');

export class UserTokenService {
    constructor() {
        this.getUserInfoItem = this.getUserInfoItem.bind(this)
        this.setTokenInfo = this.setTokenInfo.bind(this)
    }

    private tokenInfo: TokenInfo = null

    private setTokenInfo = () => {
        if(localStorage.getItem('userToken')) {
            try {
                let existingUserInfo = this.tokenInfo && this.tokenInfo.userInfo ? this.tokenInfo.userInfo : {}
                this.tokenInfo =  JSON.parse(localStorage.getItem('userToken'));
                let userInfo = {...existingUserInfo, ...JSON.parse(base64.decode(this.tokenInfo.token.split('.')[1])) as UserInfo}
                this.tokenInfo.userInfo = userInfo
                return this.tokenInfo
            } catch(error) {
                console.log(error)
                localStorage.clear()
                location.href = '/login'
                return null
            }
        }

        return null
    }

    public getTokenInfo = () => {
        return this.setTokenInfo() 
    }

    public getUserInfoItem = (item: Privilege | ExtraUserInfo | GroupIds | 'impersonatedUserIdentifier') => {
        this.setTokenInfo()
        if(!this.tokenInfo || !this.tokenInfo.userInfo) {
            return null
        }

        if(item === 'impersonatedUserIdentifier') {
            return this.tokenInfo.impersonatedUserIdentifier
        }
        return this.tokenInfo.userInfo[item] || ''
    
    }

    public getPrivilege = (privilege: Privilege) => {
        //Remove this by updating type on backend
        return this.getUserInfoItem(privilege) === 'true';
    }

    public resetUserInfo = () => {
        localStorage.removeItem('userToken')
        this.tokenInfo = null
    }

    public addTokenInfo = (data: TokenInfo) => {
        if(data) {
            let existingUserInfo = this.tokenInfo && this.tokenInfo.userInfo ? this.tokenInfo.userInfo : {}
            localStorage.setItem('userToken', JSON.stringify({...data, userInfo: {...existingUserInfo, ...data.userInfo}}))
            this.setTokenInfo()
        } else {
            throw new Error('no token provided')
        }
    }

    public isLoggedIn = () => {
        if(localStorage.getItem('userToken')) {
            this.setTokenInfo()
            return true
        } 
        return false
    }

    public updateUserInfo = (info: {[key in ExtraUserInfo | Privilege]?: string}) => {
        if (info) {
            this.tokenInfo.userInfo = {...this.tokenInfo.userInfo, ...info}
            this.addTokenInfo(this.tokenInfo)
        }
    }
}
