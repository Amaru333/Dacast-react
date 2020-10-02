import { userToken } from '../token/tokenService'
import { AxiosClient } from '../../../../DacastSdk/AxiosClient'

export const axiosClient = new AxiosClient(process.env.API_BASE_URL, userToken)
