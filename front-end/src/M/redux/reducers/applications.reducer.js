import {ActionTypes} from "../actions/applications.actions"
import model from "../model/applications.model";

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
        case ActionTypes.BY_CATEGORY: {
            return {...model, fetched: true, data };
        }
        case ActionTypes.BY_RELEVANT: {
            return {...state, fetched: true, error: null, relevant: data };
        }
        default: return state ;
    }
};

