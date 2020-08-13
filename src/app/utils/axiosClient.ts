import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { userToken } from './token'
import { DateTime } from 'luxon'

export type RequestConfig = {
    allowRetry?: boolean;
    authRequired?: boolean;
}

class AxiosClient {
    constructor() {
    }

    private maxRetries = 3
    private retryDelay = 4000
    private axiosInstance: AxiosInstance = null
    private refreshingToken: Promise<any> | null = null

    private getInstance = (): AxiosInstance => {
        if(!this.axiosInstance) {
            this.axiosInstance = Axios.create({
                baseURL: process.env.API_BASE_URL,
                timeout: 10000,
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
        if(DateTime.fromSeconds(userToken.getTokenInfo().expires).diff(DateTime.local()).milliseconds / 60000 <= 5) {
            await this.checkRefresh()
        }
        config.headers['Authorization'] = userToken.getTokenInfo().token
        return config
    }

    private responseInterceptor = (error: any) => {
        const config = error.config
        if(!config){
            console.log('couldnt retry, error has no config:', error)
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

        console.log('setup retry', currentCount)

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
        debugger
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

    private checkRefresh = async () => {
        if(!this.refreshingToken) {
            debugger
            return await this.refreshToken().then(() => {
                debugger
                this.refreshingToken = null
            })
        }
    }

    private refreshToken = async () => {
        let token = userToken.getTokenInfo()
        return await Axios.post(process.env.API_BASE_URL + '/sessions/refresh', {refresh: token.refresh}).then((response) => {
            token.token = response.data.data.token
            token.expires = response.data.data.expires
            localStorage.removeItem('userToken')
            localStorage.setItem('userToken', JSON.stringify(token))
            userToken.addTokenInfo(token)
        }).catch((error) => {
            throw new Error(error)
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

export const axiosClient = new AxiosClient()
