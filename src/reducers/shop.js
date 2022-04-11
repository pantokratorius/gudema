const initialState = {
    isReady: false,
    visible: false,
    card: [],
    cart: [],
    cartAmount: 0,
    cartTemp: {},
    perPage: 5,
    page: 0,
    pageNumber: 0,
    pages: 0,
    itemsTotal: 0,
    totalPages:0,
    filterParams: {},
    colors: [],
    groups: [],
    ordered: false,
    content: {},
    dates: null,
    date: null,
    dateSelect: false,
    orders: [],
    order: null,
    perPageOrder: 20,
    pageOrder: 0,
    pagesOrder: 0,
    itemsTotalOrder: 0,
    filterParamsOrder: {},
    
    balances: [],

    notification: null,
  };
  
  export default function shop (state = initialState, action)  {
    switch (action.type) {

      case "EDIT_NOTE":
        return {
          ...state,
          cart: state.cart.map(item=>(item.id == action.payload[0] ? {...item, note: action.payload[1]} : {...item}))
        };

      case "SAVE_COMMENT":
        return {
          ...state,
          cart: state.cart.map(item=>(item.id == action.payload ? {...item, editNote: false} : {...item}))
        };

      case "EDIT_COMMENT":
        return {
          ...state,
          cart: state.cart.map(item=>(item.id == action.payload ? {...item, editNote: true} : {...item}))
        };
      case "SET_ORDERS":
        return {
          ...state,
          orders: action.payload,
          isReady: true
        };
      case "SET_BALANCES":
        return {
          ...state,
          balances: action.payload,
          isReady: true
        };

      case "SET_ORDER":
        return {
          ...state,
          order: [action.payload[0], action.payload[1]]
        };


      case "CLOSE_ORDER":
        return {
          ...state,
          order: null,
        };
        

      case "TOGGLE_DATES":
        return {
          ...state,
          dateSelect: !state.dateSelect
        };
      case "SET_DATE":
        return {
          ...state,
          date: action.payload
        };

      case "SET_DATES":
        return {
          ...state,
          dates: action.payload
        };
      case "CHANGE_READY":
        return {
          ...state,
          isReady: action.payload
        };
      case "SET_CONTENT":
        return {
          ...state,
          content: action.payload,
          isReady: true
        };
      case "SUBMIT_ORDER":
        return {
          ...state,
          ordered: true,
        };
      case "SET_LIMIT_OFFSET":
        return {
          ...state,
          perPage: action.payload,
        };
      case "SET_LIMIT_OFFSET_ORDER":
        return {
          ...state,
          perPageOrder: action.payload,
        };
      case "SET_PAGES":
        return {
          ...state,
          pages: action.payload,
        };
      case "SET_PAGES_ORDER":
        return {
          ...state,
          pagesOrder: action.payload,
        };
      case "SET_ITEMS_TOTAL":
        return {
          ...state,
          itemsTotal: action.payload,
        };
      case "SET_PAGE":
        return {
          ...state,
          pageNumber: action.payload,
        };
      case "SHOW_CARD":
        return {
            ...state,
            card: action.payload,
            visible: true
        };
      case "CLOSE_CARD":
        return {
            ...state,
            card: [],
            visible: false
        };
      case "ADD_FIFTY":
        return {
            ...state,
            cartTemp:{
              ...state.cartTemp,
              [action.payload.id]:{
                ...state.cartTemp[action.payload.id],
                amount2: state.cartTemp[action.payload.id] && state.cartTemp[action.payload.id].amount2 ? state.cartTemp[action.payload.id].amount2 + 1 :  1,
              }
            }
        };
      case "ADD_TEN":
        return {
            ...state,
            cartTemp:{
              ...state.cartTemp,
              [action.payload.id]:{
                ...state.cartTemp[action.payload.id],
                amount1: state.cartTemp[action.payload.id] && state.cartTemp[action.payload.id].amount1 ? state.cartTemp[action.payload.id].amount1 + 1 :  1,
              }
            }
        };
        case "SUBSTR_FIFTY":
          return {
              ...state,
              cartTemp:{
                ...state.cartTemp,
                [action.payload]:{
                  ...state.cartTemp[action.payload],
                  amount2: state.cartTemp[action.payload].amount2 - 1
                }
              }
          };
        case "SUBSTR_TEN":
          return {
              ...state,
              cartTemp:{
                ...state.cartTempt,
                [action.payload]:{
                  ...state.cartTemp[action.payload],
                  amount1: state.cartTemp[action.payload].amount1 - 1
                }
              }
          };
        case "ADD_TO_CART":
          return {
              ...state,
              cartTemp:{}
          };
        case "REMOVE_FROM_CART":
        //   Object.entries(state.cart).filter((el) => 
        //      el != action.payload
        // );
          delete state.cart[action.payload]  
          return {
              ...state,
               cart: state.cart.filter((item)=>(item.id != action.payload))
          };
          case "SET_CART":
            return {
              ...state,
              cart: action.payload,
            };
          case "SET_CART_AMOUNT":
            return {
              ...state,
              cartAmount: action.payload,
            };
          case "SET_COLORS":
            return {
              ...state,
              colors: action.payload,
            };
          case "SET_FILTER_PARAMS":
            return {
              ...state,
              filterParams: action.payload,
            };
          case "SET_FILTER_PARAMS_ORDER": 
            return {
              ...state,
              filterParamsOrder: action.payload,
            };
          case "SET_GROUPS":
            return {
              ...state,
              groups: action.payload,
            };
          case "SET_CARD_QUANTITY": 
            return {
              ...state,
              card:  {...action.payload} 
            };
      
         
  
      default:
        return state;
    }
    
  };
  