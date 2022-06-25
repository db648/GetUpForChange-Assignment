import {LOGIN_SUCCESS} from "./action"
import { combineReducers } from "redux";

const initState = {
    loginUser : JSON.parse(localStorage.getItem("login_details")) || null
}

export const AuthReducer = (state=initState, {type, payload}) => {
    switch(type) {
        case LOGIN_SUCCESS : 
            localStorage.setItem("login_details", JSON.stringify(payload));
            return { 
                ...state, 
                loginUser : payload 
            }

        case LOGOUT :
            localStorage.removeItem("login_details");
            return { 
                ...state, 
                loginUser : payload 
            }

        default :
            return state
    }
}

export const rootReducer = combineReducers({
    AuthReducer
})


