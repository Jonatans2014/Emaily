//Combine it with combine reducers call
import {combineReducers} from 'redux';
import authReducer from './authReducer';




export  default  combineReducers({
    auth: authReducer
});
