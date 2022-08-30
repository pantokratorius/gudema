const initialState = {
    items: [],
 };
  
  export default function flowers (state = initialState, action)  {
    switch (action.type) {
      case "FILTER_UNIQ":
        return {
          ...state,
          items: [...new Map(state.items.map((item) => [item["id"], item])).values()],
          isReady: true
        };
      case "SET_FLOWERS":
        return {
          ...state,
          items: state.items.concat(action.payload),
          // items: action.payload,
          isReady: true
        };
      case "RESET_FLOWERS":
        return {
          ...state,
          items: [],
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
  