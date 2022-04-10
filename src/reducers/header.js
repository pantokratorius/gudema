const initialState = {
    formIsOpen: false,
    menuIsOpen: false,
    orderMenuOpen: false,
    langsOpen: false,
    langsOpenMobile: false,
    timer: null,
    headerReady: false,
    requisites: null
  };
  
  export default function header (state = initialState, action)  { 
    switch (action.type) {
      case "SET_REQUISITES":
        return {
            ...state,
            requisites: action.payload,
        };
      case "REMOVE_TIMER":
        clearTimeout(state.timer)
        return {
            ...state,
            timer: null,
        };
      case "SAVE_TIMER":
        return {
            ...state,
            timer: action.payload,
        };
      case "LANGS_TOGGLE":
        return {
            ...state,
            langsOpen: action.payload,
        };
      case "ORDER_MENU_TOGGLE":
        return {
            ...state,
            orderMenuOpen: action.payload,
        };
      case "LANGS_MOBILE_TOGGLE":
        return {
            ...state,
            langsOpenMobile: action.payload,
        };
      case "MENU_CLOSE":
        return {
            ...state,
            menuIsOpen: false,
        };
      case "MENU_TOGGLE":
        return {
            ...state,
            menuIsOpen: !state.menuIsOpen,
        };
      case "AUTH_FORM_TOGGLE":
        return {
            ...state,
            formIsOpen: !state.formIsOpen,
        };
        case "AUTH_FORM_HIDE":
        return {
            ...state,
            formIsOpen: false,
        };
      default:
        return state;
    }
    
  };
  