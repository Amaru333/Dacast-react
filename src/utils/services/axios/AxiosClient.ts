import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserTokenService } from '../token/token'
import EventHooker from '../event/eventHooker'

export type RequestConfig = {
    allowRetry?: boolean;
    authRequired?: boolean;
}

export class AxiosClient {
    constructor(baseUrl: string, userToken: UserTokenService, refreshTokenUrl?: string) {
        this.baseUrl = baseUrl
        this.userToken = userToken
        this.refreshTokenUrl = refreshTokenUrl
    }

    private baseUrl: string = null
    private userToken: UserTokenService = null
    private refreshTokenUrl: string = null
    private maxRetries = 1
    private retryDelay = 8000
    private axiosInstance: AxiosInstance = null
    private refreshingToken: boolean = false
    private loop: number = 0;
    private subscribers: Promise<any>[] = [];

    private getInstance = (): AxiosInstance => {
        if(!this.axiosInstance) {
            this.axiosInstance = Axios.create({
                baseURL: this.baseUrl,
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

        // if(new Date(this.userToken.getTokenInfo().expires * 1000).getTime() - new Date().getTime() <= 300000 && !this.refreshingToken) {
        //     return new Promise((resolve, reject) => {
        //         this.refreshingToken = true
        //             this.refreshToken().then(() => {
        //                 this.refreshingToken = false
        //                 let refreshedConfig = config
        //                 refreshedConfig.headers['Authorization'] = this.userToken.getTokenInfo().token
        //                 resolve(refreshedConfig);
        //                 return refreshedConfig
        //             }, reject);
        //     })
        // }
        config.headers['Authorization'] = this.userToken.getTokenInfo().token
        return config
    }

    private subscribeTokenRefresh = (cb: any) => {
        this.subscribers.push(cb);
      }
      
      private onRrefreshed = (token: string) => {
        this.subscribers.map((cb) => cb(token));
      }

    private responseInterceptor = (error: any) => {
        const {
            config,
            response: { status },
          } = error;

        if(!config){
            return Promise.reject(error)
        }

        const originalRequest = config;
      
        if (status === 401) {
          if (!this.refreshingToken) {
            this.refreshingToken = true;
            this.refreshToken().then(() => {
              this.refreshingToken = false
              let refreshedConfig = config
              refreshedConfig.headers['Authorization'] = this.userToken.getTokenInfo().token
              this.onRrefreshed(this.userToken.getTokenInfo().token)
              this.subscribers = []

              return refreshedConfig
              });
          }
          return new Promise((resolve) => {
            this.subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = token;
              resolve(Axios(originalRequest));
            });
          });
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

          return Promise.reject(error);

        // return new Promise(resolve => setTimeout(() => resolve(this.axiosInstance(config)), this.retryDelay));
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

    public async patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig & RequestConfig): Promise<R> {
        return await this.getInstance().patch(url, data, this.setConfig(config))
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

    private refreshToken = async () => {
        let token = this.userToken.getTokenInfo()
        return await Axios.post((this.refreshTokenUrl || this.baseUrl) + '/sessions/refresh', {refresh: token.refresh})
        .then((response) => {
            token.token = response.data.data.token
            token.expires = response.data.data.expires
            localStorage.removeItem('userToken')
            localStorage.setItem('userToken', JSON.stringify(token))
            this.userToken.addTokenInfo(token)
        }).catch((error: any) => {
            if(error.response.data.details.indexOf('Refresh Token has expired') > -1 || error.response.data.details.indexOf('Refresh Token has been revoked') > -1) {
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