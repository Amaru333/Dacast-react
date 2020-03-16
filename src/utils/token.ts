import { TokenInfos } from '../redux-flow/store/Register/Login';

export function addToken(data: TokenInfos) {
    if(data) {
        localStorage.setItem('userToken', JSON.stringify(data))
    }
}

export function addTokenToHeader() {
    if(localStorage.getItem('userToken')) {
        var tokenObject =  JSON.parse(localStorage.getItem('userToken'));
        let userInfo = JSON.parse(window.atob(decodeURIComponent(tokenObject.token.split('.')[1])))
        return {token: tokenObject.token, userId: userInfo['custom:dacast_user_id']}

    }
    throw new Error('No user token found')
}

export function isLoggedIn() {
    return localStorage.getItem('userToken') ? true : false;
}