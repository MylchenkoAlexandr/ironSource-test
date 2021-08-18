import {combineReducers} from "redux";
import categories from "./categories.reducer";
import applications from "./applications.reducer";

const reducers = {categories, applications};

export default combineReducers(reducers);
