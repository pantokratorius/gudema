import axios from "axios";

export const authFormToggle = () => ({
    type: 'AUTH_FORM_TOGGLE',
  });

export const toggleMenu = e => {
  e.preventDefault()
    return{
      type: 'MENU_TOGGLE',
    }
}

export const closeMenu = e => {
  e.stopPropagation()
  return dispatch => {
    if(e.target.dataset.type !== 'currentLang'){
      dispatch(closeMenuHandler())
      dispatch(toggleLangsMobile(false))
    }
    else return {type: null}
}
}

export const closeMenuHandler = () => (
  {
    type: 'MENU_CLOSE'
  }
)
 




export const toggleLangsMobile = st => (
     dispatch => {
      st === true ? dispatch(openLangsMobile()) :  dispatch(closeLangsMobile())
    }
)

export const toggleLangs = st => (
     dispatch => {
    if(st === true){
      dispatch(openLangs())
    }
    else{
      dispatch(closeLangs())
    }
  }
)

export const toggleOrderMenu = st => (
     dispatch => {
    if(st === true){
      dispatch(openOrderMenu())
    }
    else{
      dispatch(closeOrderMenu())
    }
  }
)


export const getRequisites = () => (
  async dispatch => {
    const url = `/api/public/requisites`
    try {
         const response = await axios.get(url)
         await dispatch(setRequisites(response.data))
      } catch (err) {
         console.error(err)
      }
  }
)


export const setRequisites = data => (
  {
    type: 'SET_REQUISITES',
    payload: data
  }
)

export const openLangs = () => (
  {
    type: 'LANGS_TOGGLE',
    payload: true
  }
)

export const closeLangs = () => (
  {
    type: 'LANGS_TOGGLE',
    payload: false
  }
)

export const openOrderMenu = () => (
  {
    type: 'ORDER_MENU_TOGGLE',
    payload: true
  }
)

export const closeOrderMenu = () => (
  {
    type: 'ORDER_MENU_TOGGLE',
    payload: false
  }
)

export const openLangsMobile = () => (
  {
    type: 'LANGS_MOBILE_TOGGLE',
    payload: true
  }
)

export const closeLangsMobile = () => (
  {
    type: 'LANGS_MOBILE_TOGGLE',
    payload: false
  }
) 

export const saveTimer = timer => (
  {
    type: 'SAVE_TIMER',
    payload: timer
  }
)

export const removeTimer = () => (
  {
    type: 'REMOVE_TIMER',
    payload: null
  }
)



 


