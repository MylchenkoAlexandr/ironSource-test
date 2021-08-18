import {ActionTypes} from "../actions/categories.actions"
import model from "../model/categories.model";

export default (state = {...model}, action) => {
    const {type, data} = action;
    if (type) switch (type) {
        case ActionTypes.LOADING: {
            return {...model, fetching: true, fetched: false};
        }
        case ActionTypes.ERROR: {
            const {error} = data;
            return {...model, error};
        }
        case ActionTypes.ALL: {
            return {...state, fetching: false, fetched: true, error: null, data};
        }
        default:
            return state
    }
};

