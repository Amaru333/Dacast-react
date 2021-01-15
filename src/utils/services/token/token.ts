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

type ExtraUserInfo = 'custom:dacast_user_id' | 'custom:first_name' | 'custom:last_name' | 'email' | 'custom:website'

interface UserInfo {
    "privilege-advertising": string;
    "privilege-aes": string;
    "privilege-api": string;
    "privilege-china": string;
    "privilege-dvr": string;
    "privilege-email-catcher": string;
    "privilege-folders": string;
    "privilege-group-id": string;
    "privilege-live": string;
    "privilege-paywall": string;
    "privilege-player-download": string;
    "privilege-playlists": string;
    "privilege-recording": string;
    "privilege-signed-keys": string;
    "privilege-unsecure-m3u8": string;
    "privilege-vod": string;
    "privilege-web-download": string;
    "privilege-analytics": string;
    'privilege-expo': string;
    'privilege-phone-support': string;
    'custom:dacast_user_id': string;
    'custom:first_name': string;
    'custom:last_name': string;
    'email': string;
    'custom:website': string;
}

interface TokenInfo {
    token: string;
    accessToken?: string;
    refresh: string;
    expires: number;
    userInfo?: UserInfo;
    impersonatedUserIdentifier?: string;
}

export class UserTokenService {
    constructor() {
        this.getUserInfoItem = this.getUserInfoItem.bind(this)
        this.setTokenInfo = this.setTokenInfo.bind(this)
    }

    private tokenInfo: TokenInfo = null

    private setTokenInfo = () => {
        if(this.tokenInfo) {
            return this.tokenInfo
        } else {
            if(localStorage.getItem('userToken')) {
                this.tokenInfo =  JSON.parse(localStorage.getItem('userToken'));
                let userInfo = JSON.parse(window.atob(decodeURIComponent(this.tokenInfo.token.split('.')[1]))) as UserInfo
                this.tokenInfo.userInfo = userInfo
                return this.tokenInfo
            }
        }
    }

    public getTokenInfo = () => {
        return this.setTokenInfo() 
    }

    public getUserInfoItem = (item: Privilege | ExtraUserInfo | 'impersonatedUserIdentifier') => {
        if(!this.tokenInfo  || !this.tokenInfo.userInfo) {
            this.setTokenInfo()
        } 
        if(!this.tokenInfo) {
            return ''
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
            this.tokenInfo = null
            localStorage.setItem('userToken', JSON.stringify(data))
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
}
