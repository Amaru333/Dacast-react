import { Account } from './List/types';
import { combineReducers, Reducer } from 'redux';
import {ListReducer} from './List/reducer';
import { PlanInfo } from './EditPlan/types';
import { PlanReducer } from './EditPlan/reducer';
import { AccountInfo } from './EditAccount/types';
import { AccountReducer } from './EditAccount';
import { AccountLogs } from './Logs/types';
import { AccountLogsReducer } from './Logs/reducer';


export interface AccountsState {
    list: Account[] | false;
    account: AccountInfo | false;
    plan: PlanInfo | false;
    logs: AccountLogs[] | false;

}

export const accountsInitialState: AccountsState = {
    list: false,
    account: false,
    plan: false,
    logs: false
}

export const AccountsReducer: Reducer<AccountsState> = combineReducers({
    list: ListReducer,
    account: AccountReducer,
    plan: PlanReducer,
    logs: AccountLogsReducer
})

