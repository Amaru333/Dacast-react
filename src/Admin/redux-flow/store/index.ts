import { combineReducers } from 'redux'
import { AccountsState, AccountsReducer, accountsInitialState } from './Accounts'

export interface AdminState {
    accounts: AccountsState
}

export const globalDefaultState: AdminState = {
    accounts: accountsInitialState
}

export const createRootReducer = () => 
    combineReducers({
        accounts: AccountsReducer
    })