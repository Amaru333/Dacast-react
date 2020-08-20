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
    userInfo?: UserInfo
}

class userTokenService {
    constructor() {
        this.setTokenInfo = this.setTokenInfo.bind(this)
    }

    private tokenInfo: TokenInfo = null

    private setTokenInfo = () => {
        if(this.tokenInfo) {
            return this.tokenInfo
        } else {
            if(localStorage.getItem('adminToken')) {
                this.tokenInfo =  JSON.parse(localStorage.getItem('adminToken'));
                let userInfo = JSON.parse(window.atob(decodeURIComponent(this.tokenInfo.token.split('.')[1]))) as UserInfo
                this.tokenInfo.userInfo = userInfo
                return this.tokenInfo
            }
        }
    }

    public getTokenInfo = () => {
        return this.setTokenInfo() 
    }

    public resetUserInfo = () => {
        localStorage.removeItem('adminToken')
        this.tokenInfo = null
    }

    public addTokenInfo = (data: TokenInfo) => {
        if(data) {
            this.tokenInfo = null
            localStorage.setItem('adminToken', JSON.stringify(data))
            this.setTokenInfo()
        } else {
            throw new Error('no token provided')
        }
    }

    public isLoggedIn = () => {
        if(localStorage.getItem('adminToken')) {
            this.setTokenInfo()
            return true
        } 
        return false
    }
}

export const adminToken = new userTokenService()