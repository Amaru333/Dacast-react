import { combineReducers } from 'redux'
import { AccountsState, AccountsReducer, accountsInitialState } from './Accounts/List'
import { withdrawalsListInitialState, WithdrawalsReducer } from './Withdrawals/types'
import { WithdrawalsState } from './Withdrawals/types'

export interface AdminState {
    accounts: AccountsState;
    withdrawals: WithdrawalsState;
}

export const globalDefaultState: AdminState = {
    accounts: accountsInitialState,
    withdrawals: withdrawalsListInitialState
}

export const createRootReducer = () => 
    combineReducers({
        accounts: AccountsReducer,
        withdrawals: WithdrawalsReducer
    })