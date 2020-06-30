import axios from 'axios'
import {UserInfo} from './types'
var moment = require('moment-timezone');

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

export const signupService = async (data: UserInfo) => {
    return await axios.post(process.env.API_BASE_URL + '/accounts', {...data, timezone: moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')'});
}