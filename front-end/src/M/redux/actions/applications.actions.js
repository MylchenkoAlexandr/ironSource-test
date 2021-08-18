import Request from "../../../C/api/request";
import QueryString from "querystring";

export const ActionTypes = {
    LOADING: 'APPLICATIONS.LOADING',
    ERROR: 'APPLICATIONS.ERROR',
    INSTALL: 'APPLICATIONS.INSTALL',
    BY_CATEGORY: 'APPLICATIONS.BY.CATEGORY',
    BY_RELEVANT: 'APPLICATIONS.BY.RELEVANT',
}

export const getApplicationsByCategoryId = (category_id) => async (dispatch) => {
    try {
        dispatch({type: ActionTypes.LOADING});
        const params = QueryString.encode({category_id});
        const {data} = await Request.get(`/api/v1/applications_by_category?${params}`);
        dispatch({type: ActionTypes.BY_CATEGORY, data});

    } catch (error) {
        dispatch({type: ActionTypes.ERROR, data: {error}});
    }
}
export const getRelevantApplications = ({category_id, customerType}) => async (dispatch) => {
    try {
        dispatch({type: ActionTypes.LOADING});
        const params = QueryString.encode({category_id, customerType});
        const {data} = await Request.get(`/api/v1/relevant_application?${params}`);
        dispatch({type: ActionTypes.BY_RELEVANT, data});

    } catch (error) {
        dispatch({type: ActionTypes.ERROR, data: {error}});
    }
}
export const installApplication = (applicationId, callback) => async (dispatch) => {
    try {
        await Request.post("/api/v1/install_app", JSON.stringify({applicationId}));
        callback && callback() ;

    } catch (error) {
        dispatch({type: ActionTypes.ERROR, data: {error}});
    }
}
