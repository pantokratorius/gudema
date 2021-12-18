const initialState = {
    items: null,
 };
  
  export default function flowers (state = initialState, action)  {
    switch (action.type) {
      case "SET_FLOWERS":
        return {
          ...state,
          items: action.payload,
          isReady: true
        };
      case "SET_IS_READY":
        return {
          ...state, 
          isReady: action.payload
        };
        case "SET_PRODUCT_QUANTITY":
        return {
          ...state,
          items: state.items.map((item) =>(
            item.id == action.payload.id ? {...action.payload} : item
          ))
        };
      default:
        return state;
    }
  };
  