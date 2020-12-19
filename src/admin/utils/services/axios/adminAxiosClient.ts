import { adminToken } from '../token/tokenService'
import { AxiosClient } from '../../../../utils/services/axios/AxiosClient'
import { DacastSdk } from '../../../../DacastSdk/sdk'

export const axiosClient = new AxiosClient(process.env.ADMIN_API_BASE_URL, adminToken, process.env.API_BASE_URL)
export const dacastSdk = new DacastSdk(process.env.ADMIN_API_BASE_URL, adminToken, process.env.API_BASE_URL)
