import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { DateTime } from 'luxon'
import { UserTokenService } from '../utils/services/token/token'
import EventHooker from '../utils/services/event/eventHooker'

export type RequestConfig = {
    allowRetry?: boolean;
    authRequired?: boolean;
}

export class AxiosClient {
    constructor(isAdmin: boolean, userToken: UserTokenService) {
        this.isAdmin = isAdmin
        this.userToken = userToken
    }

    private isAdmin: boolean = false
    private userToken: UserTokenService = null
    private maxRetries = 3
    private retryDelay = 4000
    private axiosInstance: AxiosInstance = null
    private refreshingToken: Promise<any> | null = null

    private getInstance = (): AxiosInstance => {
        if(!this.axiosInstance) {
            this.axiosInstance = Axios.create({
                baseURL: this.isAdmin ? process.env.ADMIN_API_BASE_URL: process.env.API_BASE_URL,
                timeout: 30000,
                headers: {Authorization: null}
            })
            this.axiosInstance.interceptors.response.use(null, this.responseInterceptor)
            this.axiosInstance.interceptors.request.use(this.requestInterceptor, null)
        }
        return this.axiosInstance
    }

    private requestInterceptor = async (config: AxiosRequestConfig) => {
        let {
            authRequired = true,
        } = config.headers['X-Api-Key']
        if(!authRequired) {
            let newConfig = config
            delete newConfig.headers.Authorization
            return newConfig
        }
        if(DateTime.fromSeconds(this.userToken.getTokenInfo().expires).diff(DateTime.local()).milliseconds / 60000 <= 5) {
            await this.checkRefresh()
        }
        config.headers['Authorization'] = this.userToken.getTokenInfo().token
        return config
    }

    private responseInterceptor = (error: any) => {
        const config = error.config
        if(!config){
            return Promise.reject(error)
        }
        let {
            currentCount = 0,
            allowRetry = true,
        } = config.headers['X-Api-Key']

        const shouldRetry = allowRetry && currentCount < this.maxRetries && isNetworkOrIdempotentRequestError(error)
        if (!shouldRetry) {
            return Promise.reject(error)
        }
        currentCount++
        config.headers['X-Api-Key'].currentCount = currentCount

        return new Promise(resolve => setTimeout(() => resolve(this.axiosInstance(config)), this.retryDelay));
    }

    public async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig & RequestConfig): Promise<R> {
        return await this.getInstance().get(url, this.setConfig(config))
    }

    public async delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig & RequestConfig): Promise<R> {
        return await this.getInstance().delete(url, this.setConfig(config))
    }

    public async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig & RequestConfig): Promise<R> {
        return await this.getInstance().post(url, data, this.setConfig(config))
    }

    public async put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig & RequestConfig): Promise<R> {
        return await this.getInstance().put(url, data, this.setConfig(config))
    }

    private setConfig = (config: AxiosRequestConfig & RequestConfig) => {
        config = config || {}
        let headers = config.headers || {}
        headers['X-Api-Key'] = {
            authRequired: config.authRequired,
            allowRetry: config.allowRetry,
        }
        config.headers = headers
        return config
    }

    public forceRefresh = async () => {
        await this.refreshToken()
    }

    private checkRefresh = async () => {
        if(!this.refreshingToken) {
            return await this.refreshToken().then(() => {
                this.refreshingToken = null
            })
        }
    }

    private refreshToken = async () => {
        let token = this.userToken.getTokenInfo()
        return await Axios.post(process.env.API_BASE_URL + '/sessions/refresh', {refresh: token.refresh})
        .then((response) => {
            token.token = response.data.data.token
            token.expires = response.data.data.expires
            localStorage.removeItem('userToken')
            localStorage.setItem('userToken', JSON.stringify(token))
            this.userToken.addTokenInfo(token)

        }).catch((error: any) => {
            console.log('error', error.response)
            if(error.response.data.error.indexOf('Refresh Token has expired') > -1) {
                console.log('refresh token has expired')
                EventHooker.dispatch('EVENT_FORCE_LOGOUT', undefined)
            }
            return Promise.reject(error);
        })  
    }

}

const isNetworkError = (error: any) => {
    return (
        !error.response &&
        Boolean(error.code) &&
        error.code !== 'ECONNABORTED'
    )
}

const isIdempotentRequestError = (error: any) => {
    if (!error.config) {
        return false;
    }
    return isRetryableError(error)
}

const isRetryableError = (error: any) => {
    return (
        error.code !== 'ECONNABORTED' &&
        (!error.response || (error.response.status >= 500 && error.response.status <= 599))
    )
}

const isNetworkOrIdempotentRequestError = (error: any) => {
    return isNetworkError(error) || isIdempotentRequestError(error)
}