import { combineReducers } from 'redux'
import { AccountsState, AccountsReducer, accountsInitialState } from './Accounts/types'
import { withdrawalsListInitialState, WithdrawalsReducer } from './Withdrawals/types'
import { WithdrawalsState } from './Withdrawals/types'
import { PaywallReducer, paywallInitialState, PaywallState } from './Paywall/types'
import { RegisterState, RegisterInitialState, RegisterReducer } from './Register/types'
import { PiracyReducer, piracyInitialState, PiracyState } from './Piracy/types'
import { ToastsState, toastsInitialState, ToastReducer } from './Toasts'
import { MigrationData, migrationInitialState } from './Migration/types'
import { MigrationReducer } from './Migration/reducer'

export interface AdminState {
    accounts: AccountsState;
    withdrawals: WithdrawalsState;
    paywall: PaywallState;
    register: RegisterState;
    piracy: PiracyState;
    toasts: ToastsState;
    migration: MigrationData | false
}

export const globalDefaultState: AdminState = {
    accounts: accountsInitialState,
    withdrawals: withdrawalsListInitialState,
    paywall: paywallInitialState,
    piracy: piracyInitialState,
    register: RegisterInitialState,
    toasts: toastsInitialState,
    migration: migrationInitialState
}

export const createRootReducer = () => 
    combineReducers({
        accounts: AccountsReducer,
        withdrawals: WithdrawalsReducer,
        paywall: PaywallReducer,
        piracy: PiracyReducer,
        register: RegisterReducer,
        toasts: ToastReducer,
        migration: MigrationReducer
    })