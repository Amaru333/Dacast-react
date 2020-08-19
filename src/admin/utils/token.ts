import { TokenInfos } from '../redux-flow/store/Register/Login';
import { DateTime } from 'luxon';
import axios from 'axios'


export function addToken(data: TokenInfos) {
    if(data) {
        localStorage.setItem('adminToken', JSON.stringify(data))
    }
}

export function addTokenToHeader() {
    if(localStorage.getItem('adminToken')) {
        var tokenObject =  JSON.parse(localStorage.getItem('adminToken'));
        let userInfo = JSON.parse(window.atob(decodeURIComponent(tokenObject.token.split('.')[1])))
        return {token: tokenObject.token, userId: userInfo['custom:dacast_user_id'], accessToken: tokenObject.accessToken}
    }
    throw new Error('No user token found')
}

export function isLoggedIn() {
    return localStorage.getItem('adminToken') ? true : false;
}

export function isTokenExpired() {
    let token: TokenInfos = JSON.parse(localStorage.getItem('adminToken'))
    if(Math.abs(DateTime.fromSeconds(parseInt(token.expires)).diffNow('minutes').minutes) <= 5) {
        axios.post(process.env.API_BASE_URL + '/sessions/refresh', {refresh: token.refresh})
            .then(response => {
                token.token = response.data.data.token
                token.expires = response.data.data.expires
                localStorage.removeItem('adminToken')
                localStorage.setItem('adminToken', JSON.stringify(token))
            })
    }
}