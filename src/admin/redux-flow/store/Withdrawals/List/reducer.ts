import { Reducer } from "redux";
import { Action } from "./actions";
import { withdrawalsListInitialState, ActionTypes, Withdrawal } from './types';


const reducer: Reducer<Withdrawal[] | false> = (state = withdrawalsListInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_WITHDRAWALS :
            return action.payload.data.operations.map(op => {
                return {
                    ...op,
                    requestedDate: parseInt(op.date),
                    completedDate: parseInt(op.date),
                    previous: parseInt(op.date),
                    method: op.comments ? op.comments : 'test',
                    id: op.paymentRequestID
                }
            })
        default :
            return state
    }
}

export { reducer as WithdrawalsListReducer}