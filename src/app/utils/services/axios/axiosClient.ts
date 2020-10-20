import { userToken } from '../token/tokenService'
import { AxiosClient } from '../../../../utils/services/axios/AxiosClient'
import { DacastSdk } from '../../../../DacastSdk/sdk'

export const axiosClient = new AxiosClient(process.env.API_BASE_URL, userToken)
export const dacastSdk = new DacastSdk(process.env.API_BASE_URL, userToken)
