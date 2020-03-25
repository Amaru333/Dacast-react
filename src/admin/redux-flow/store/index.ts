import { combineReducers } from 'redux'
import { AccountsState, AccountsReducer, accountsInitialState } from './Accounts/List'
import { withdrawalsListInitialState, WithdrawalsReducer } from './Withdrawals/types'
import { WithdrawalsState } from './Withdrawals/types'
import { PaywallReducer, paywallInitialState, PaywallState } from './Paywall/types'

export interface AdminState {
    accounts: AccountsState;
    withdrawals: WithdrawalsState;
    paywall: PaywallState
}

export const globalDefaultState: AdminState = {
    accounts: accountsInitialState,
    withdrawals: withdrawalsListInitialState,
    paywall: paywallInitialState
}

export const createRootReducer = () => 
    combineReducers({
        accounts: AccountsReducer,
        withdrawals: WithdrawalsReducer,
        paywall: PaywallReducer
    })