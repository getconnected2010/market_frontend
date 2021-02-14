import {combineReducers} from 'redux'
import listReducer from './listReducer'
import userReducer from './userReducer';

export default combineReducers({
    list: listReducer,
    user: userReducer
})