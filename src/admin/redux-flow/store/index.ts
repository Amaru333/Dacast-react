import { combineReducers } from 'redux'
import { AccountsState, AccountsReducer, accountsInitialState } from './Accounts/List'
import { withdrawalsListInitialState, WithdrawalsReducer } from './Withdrawals/types'
import { WithdrawalsState } from './Withdrawals/types'
import { PaywallReducer, paywallInitialState, PaywallState } from './Paywall/types'
import { RegisterState, RegisterInitialState, RegisterReducer } from './Register/types'
import { PiracyReducer, piracyInitialState, PiracyState } from './Piracy/types'

export interface AdminState {
    accounts: AccountsState;
    withdrawals: WithdrawalsState;
    paywall: PaywallState;
    register: RegisterState;
    piracy: PiracyState;
}

export const globalDefaultState: AdminState = {
    accounts: accountsInitialState,
    withdrawals: withdrawalsListInitialState,
    paywall: paywallInitialState,
    piracy: piracyInitialState,
    register: RegisterInitialState
}

export const createRootReducer = () => 
    combineReducers({
        accounts: AccountsReducer,
        withdrawals: WithdrawalsReducer,
        paywall: PaywallReducer,
        piracy: PiracyReducer,
        register: RegisterReducer,
    })