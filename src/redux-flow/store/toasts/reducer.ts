import { ToastAction } from "./actions";
import { ToastType } from '../../../components/Toast/ToastTypes';
import { ActionTypes, toastsInitialState, ToastsState } from './types';
  
  
export const reducer = (state= toastsInitialState, action: ToastAction): ToastsState => {
    switch (action.type) {
        case ActionTypes.HIDE_TOAST:
            return {
                ...state,
                data: state.data.filter((toast: ToastType) => toast.timestamp !== action.payload.toast.timestamp)
            }
        case ActionTypes.SHOW_TOAST:
            return {
                ...state,
                data: [...state.data, action.payload.toast]
            }
        default:
            return state;
    }
};
  
export {reducer as ToastReducer};