import { TokenInfos } from '../redux-flow/store/Register/Login';

export function addToken(data: TokenInfos) {
    if(data) {
        localStorage.setItem('userToken', JSON.stringify(data))
    }
}

export function addTokenToHeader() {
    if(localStorage.getItem('userToken')) {
        var tokenObject: string =  JSON.parse(localStorage.getItem('userToken')).token;
        return tokenObject
    }
    return;
}

export function isLoggedIn() {
    return localStorage.getItem('userToken') ? true : false;
}