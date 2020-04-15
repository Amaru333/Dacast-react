import { TokenInfos } from '../redux-flow/store/Register/Login';
import { DateTime } from 'luxon';
import axios from 'axios'


export function addToken(data: TokenInfos) {
    if(data) {
        localStorage.setItem('userToken', JSON.stringify(data))
    }
}

export function addTokenToHeader() {
    if(localStorage.getItem('userToken')) {
        var tokenObject =  JSON.parse(localStorage.getItem('userToken'));
        let userInfo = JSON.parse(window.atob(decodeURIComponent(tokenObject.token.split('.')[1])))
        return {token: tokenObject.token, userId: userInfo['custom:dacast_user_id'], accessToken: tokenObject.accessToken, vodStorageId: userInfo['vod-storage-id']}

    }
    throw new Error('No user token found')
}

export function isLoggedIn() {
    return localStorage.getItem('userToken') ? true : false;
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