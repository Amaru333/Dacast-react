import { ActionTypes } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "..";

export interface WhateverAction {
    type: ActionTypes.CAPITAL_LETTER_ACTION_NAME;
    payload: { foo: Number };
}

//Exemple of Async Action
export const asyncAction = (foo: number): ThunkDispatch<Promise<void>, {}, WhateverAction> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, WhateverAction> ) => {
        setTimeout(() => {
            dispatch(
                {
                    payload: { foo },
                    type: ActionTypes.CAPITAL_LETTER_ACTION_NAME,
                }
            );
        }, 2000);
    };
}

//Exemple of classic Action
export const classicAction = (foo: number): WhateverAction => {
    return {
        payload: { foo },
        type: ActionTypes.CAPITAL_LETTER_ACTION_NAME,
    };
};

export type Action = WhateverAction;
