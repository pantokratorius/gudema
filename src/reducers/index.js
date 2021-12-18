import { combineReducers } from 'redux';
import flowers from './flowers'; 
import header from './header'; 
import shop from './shop'; 
import auth from './auth'; 




export default combineReducers({
    flowers,
    header,
    shop,
    auth,
});
