import { adminToken } from '../token/tokenService'
import { AxiosClient } from '../../../../utils/services/axios/AxiosClient'

export const axiosClient = new AxiosClient(process.env.ADMIN_API_BASE_URL, adminToken, process.env.API_BASE_URL)
