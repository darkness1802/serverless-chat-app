import { combineReducers, createStore } from "redux";
import authReducer from "./reducers/auth.reducer";

const reducers = combineReducers({ 
    user: authReducer
})

const Store = createStore(reducers)

export default Store