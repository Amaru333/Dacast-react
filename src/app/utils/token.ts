import { TokenInfos } from '../redux-flow/store/Register/Login';
import { DateTime } from 'luxon';
import axios from 'axios'
import { Privilege } from '../constants/PrivilegesName';

var userInfo: any = false;

export const initUserInfo = () => {
    if(userInfo) {
        return userInfo;
    } else {
        if(localStorage.getItem('userToken')) {
            var tokenObject =  JSON.parse(localStorage.getItem('userToken'));
            let userInfos = JSON.parse(window.atob(decodeURIComponent(tokenObject.token.split('.')[1])))
            userInfo = userInfos;
        }
    }
}

export function addToken(data: TokenInfos) {
    if(data) {
        localStorage.setItem('userToken', JSON.stringify(data));
        initUserInfo();
    }
}

export const getUserInfoItem = (item: string | Privilege) => {
    if(userInfo) {
        console.log(userInfo);
        return userInfo[item];
    }
    throw new Error('User not defined')
}

export function addTokenToHeader() {
    if(userInfo) {
        return {token: userInfo.token, userId: userInfo['custom:dacast_user_id'], accessToken: userInfo.accessToken, vodStorageId: userInfo['vod-storage-id']}
    }
    if(localStorage.getItem('userToken')) {
        var tokenObject =  JSON.parse(localStorage.getItem('userToken'));
        let userInfo = JSON.parse(window.atob(decodeURIComponent(tokenObject.token.split('.')[1])))

        return {token: tokenObject.token, userId: userInfo['custom:dacast_user_id'], accessToken: tokenObject.accessToken, vodStorageId: userInfo['vod-storage-id']}
    }
    throw new Error('No user token found')
}

export function isLoggedIn() {
    if(localStorage.getItem('userToken')) {
        initUserInfo();
        return true;
    } else {
        return false
    }
}

export async function isTokenExpired() {
    let token: TokenInfos = JSON.parse(localStorage.getItem('userToken'))
    if(DateTime.fromSeconds(parseInt(token.expires)).diff(DateTime.local()).milliseconds / 60000 <= 5) {
        let response = await axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/sessions/refresh', {refresh: token.refresh})
        token.token = response.data.data.token
        token.expires = response.data.data.expires
        localStorage.removeItem('userToken')
        localStorage.setItem('userToken', JSON.stringify(token))
    }
}