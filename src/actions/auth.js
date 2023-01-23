import axios from 'axios'



export const auth = (email, password) => (
    async dispatch => {
       const authData = {
           username: email,
           password,
       }

       const url = './authentification'

       try {

        
        await axios.post(url, authData)
        await dispatch(hideAuth('close-popup'))
        await  dispatch(handleAlert(false))
        await dispatch(autoLogin())
        return true
         
         } catch (err) {
            console.error(err)
            dispatch(handleAlert(true))
            return false
         }

   }
)



export const autoLogout = time => (
    dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time + 1000)
    }
)




export const logout = () => {
    return {
        type: 'AUTH_LOGOUT'
    }

}

// export const authSuccess = token => (
//     {
//        type: 'AUTH_SUCCESS',
//        token
//    }
// )

export const autoLogin= () => ( 
     async dispatch => {
        const url = 'api/user'
        try {
            const response = await axios.get(url)
            const data = await response.data
            if(data.details)
                await dispatch(setAuthUsername(data.details.username))
         } catch (err) {
            console.error(err)
         }
    }
)


export const setAuthUsername = name => (
    {
        type: "SET_AUTH_USERNAME",
        payload: name
    }
)



export const onChangeName = e => (
        dispatch => {
            dispatch(changeName(e.target.value))
            dispatch(handleAlert(false))
        }
)

export const changeName = name =>{
    return {
        type: 'SET_USER_NAME',
        payload: name
    }
}

export const onChangePassword = e => (
    dispatch => {   
        dispatch(ChangePassword(e.target.value))
        dispatch(handleAlert(false))
    }
)

export const ChangePassword = password => {
    return {
        type: 'SET_USER_PASSWORD',
        payload: password
    }
}



  export const hideAuthHandler = e => (
        dispatch => {
            dispatch(hideAuth(e.target.className))
            dispatch(handleAlert(false))
        }
  )

  export const hideAuth = className =>{
    if(className==='fade-for-click-auth' || className==='close-popup')
    return { type: 'AUTH_FORM_HIDE'}
    else return {type: ''}
}


export const handleAlert = alert => {
    return{
        type: 'ALERT_STATUS',
        payload: alert
    }
}