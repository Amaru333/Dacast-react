import {UserInfo} from './types'
import { axiosClient } from '../../../../utils/axiosClient';
var moment = require('moment-timezone');


export const signupService = async (data: UserInfo) => {
    return await axiosClient.post('/accounts', {...data, timezone: moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')'}, {authRequired: false});
}