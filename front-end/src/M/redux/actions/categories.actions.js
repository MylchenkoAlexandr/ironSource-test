import Request from "../../../C/api/request";

export const ActionTypes = {
    LOADING: 'CATEGORIES.LOADING',
    ERROR: 'CATEGORIES.ERROR',
    ALL: 'CATEGORIES.ALL',
}

export const allCategories = () => async (dispatch) => {
    try {
        dispatch({type: ActionTypes.LOADING});
        const {data} = await Request.get("/api/v1/all_categories");
        dispatch({type: ActionTypes.ALL, data});

    } catch (error) {
        dispatch({type: ActionTypes.ERROR, data: {error}});
    }
}
