export interface TitleUpdateAction {
    type: ActionTypes.UPDATE_TITLE;
    payload: {title: string};
}

export enum ActionTypes {
    UPDATE_TITLE = "@@title/UPDATE_TITLE",
}

const updateTitleAction = (text: string): TitleUpdateAction => ({
    type: ActionTypes.UPDATE_TITLE,
    payload: {
        title: text
    }
});

export const updateTitle = (text: string) => (dispatch: React.Dispatch<TitleUpdateAction>): void => {
    dispatch(updateTitleAction(text));
};

export const TitleReducer = (state= "", action: TitleUpdateAction): string => {
    switch (action.type) {
        case ActionTypes.UPDATE_TITLE:
            return action.payload.title
        default:
            return state;
    }
};