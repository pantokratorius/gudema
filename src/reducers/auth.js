const initialState = {
    username: null,
    password: null,
    alert: false,
    authUsername: null
}


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'ALERT_STATUS': 
            return{
                ...state, 
                alert: action.payload
            }
        case 'SET_USER_NAME': 
            return{
                ...state, 
                username: action.payload
            }
        case 'SET_AUTH_USERNAME': 
            return{
                ...state, 
                authUsername: action.payload
            }
        case 'SET_USER_PASSWORD': 
            return{
                ...state, 
                password: action.payload
            }
        case 'AUTH_SUCCESS': 
            return{
                ...state,  password: null
            }
        case 'AUTH_LOGOUT':
            return{
                ...state,  authUsername: null
            }
        default:
            return state
    }
}