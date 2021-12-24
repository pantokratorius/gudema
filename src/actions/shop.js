import axios from "axios"


export const getFlowers = (obj = {}) => (
  async dispatch => { 
    

     const url = '/api/products'

     
     try {
          const response = await axios.get(url, {params:{...obj}})
          const data = response.data
          await dispatch(setFlowers(data.content))
          await dispatch(setItemsTotal(data.totalElements))
          await dispatch(setPages(data.totalPages))
          await dispatch(setFilterParams(obj))
       } catch (err) {
          console.error(err)
       }
 }
)

export const getColors = () => (
  async dispatch => { 

     const url = '/api/products-colors'

     try {
          const response = await axios.get(url)
          const data = await response.data
          await dispatch(setColors(data))
       } catch (err) {
          console.error(err)
       }
 }
)


export const getGroups = () => (
  async dispatch => { 

     const url = '/api/products-groups'

     try {
          const response = await axios.get(url)
          const data = await response.data
          await dispatch(setGroups(data))
       } catch (err) {
          console.error(err)
       }
 }
)


export const setFilterParams = obj =>({
  type: "SET_FILTER_PARAMS",
  payload: obj
})

export const setColors = obj => ({
  type: "SET_COLORS",
  payload: obj
})

export const setGroups = obj => ({
  type: "SET_GROUPS",
  payload: obj
})


export const getCart = (history = null) => (
  async dispatch => {
     const url = '/api/cart'
     try {
          const response = await axios.get(url)
          const data = await response.data.items
          if(data && !data.length) history.push('/shop')
         await dispatch(setCart(data))
         await dispatch(getCartAmount())
         await dispatch(setDateData(response.data.plannedDeliveryDate))
       } catch (err) {
          console.error(err)
       }
 }
)

export const getDates = () => (
  async dispatch => {
     const url = 'api/delivery-dates'
     try {
          const response = await axios.get(url)
          const data = await response.data
         await dispatch(setDates(data))
       } catch (err) {
          console.error(err)
       }
 }
)


export const setDates = data => ({
  type:"SET_DATES",
  payload: data
})


export const setDate = data => (
  async dispatch => {
    const url = '/api/cart/delivery-date'
    const params = {plannedDeliveryDate:data}
    try {
         await axios.put(url, params)
         await dispatch(setDateData(data))
      } catch (err) {
         console.error(err)
      }
}
)

export const setDateData = data => {
  return{
    type:"SET_DATE",
    payload: data
  }
}



export const getCartAmount = () => (
  async dispatch => {
     const url = '/api/cart'
     try {
          const response = await axios.get(url)
          dispatch(setCartAmount(response.data.totalItems))
       } catch (err) {
          console.error(err)
       }
 }  
)

export const setCartAmount = amount => ({
  type: 'SET_CART_AMOUNT',
  payload: amount
})



  export const setCart = flowers => ({
    type: 'SET_CART',
    payload: flowers
  });


  export const setFlowers = flowers => ({
    type: 'SET_FLOWERS',
    payload: flowers
  })

  export const setPages = pages => ({
    type: 'SET_PAGES',
    payload: pages
  });

  export const setPagesOrder = pages => ({
    type: 'SET_PAGES_ORDER',
    payload: pages
  });

  export const setItemsTotal = num => ({
    type: 'SET_ITEMS_TOTAL',  
    payload: num
  });


  export const showCard = obj => ({
    type: 'SHOW_CARD',
    payload: obj, 
  })


  export const closeCart = e => {
    if(e.target.className ==='fade-for-click2' || e.target.className ==='close')
    return { type: 'CLOSE_CARD'}
    else return {type: ''}
}

export const plusFifty = fl => {
  return {
      type: 'ADD_FIFTY',
      payload: fl
  }
}


export const changeAmount = (id, quantity) => (
    async dispatch => {
      const url = `/api/cart/${id}`
      const params = {quantity}
      try {
           await axios.put(url, params)
           dispatch(getCart())
        } catch (err) {
          dispatch(getCart())
           console.error(err)
        }
    }
)




  //   export const checkPlusFifty = fl =>{
  //     let fifty = Number(fl.variations[1].unitsInPackage)
  //   let ten = 0
  // if(fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount1)
  //   ten =  fl.cartTemp[fl.id].amount1 * fl.variations[0].unitsInPackage

  //    if(!fl.cartTemp[fl.id] || (fl.cart[fl.id] && !fl.cartTemp[fl.id].amount2)){
  //     return fl.quantity - ten - fifty >= 0 ? true : false
  //    }else{
  //     return fl.cartTemp[fl.id].amount2 * fifty + fifty + ten <= fl.quantity ? true : false
  //    }
  //   }

  export const plusTen = fl => {
        return {
            type: 'ADD_TEN',
            payload: fl
        }
  }

  //   export const checkPlusTen = fl =>{
  //     let ten = Number(fl.variations[0].unitsInPackage)
  //   let fifty = 0
  // if(fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount2)
  // fifty =  fl.cartTemp[fl.id].amount2 * fl.variations[1].unitsInPackage

  //     if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount1)){
  //         return fl.quantity - fifty - ten >= 0 ? true : false
  //     }else{
  //         return fl.cartTemp[fl.id].amount1 * ten + ten + fifty <= fl.quantity ? true : false
  //     }
  //   }


    
      export const minusTen = fl => {
        return {
          type: 'SUBSTR_TEN',
          payload: fl.id
        } 
      }


      export const minusFifty = fl => {
        return {
          type: 'SUBSTR_FIFTY',
          payload: fl.id
        } 
      }

     
      export const setPageChange = page => ({
        type: 'SET_PAGE_CHANGE',
        payload: page
      });


      export const setLimitOffset = (e) => { 
        
        return{
          type: 'SET_LIMIT_OFFSET',
          payload: e.target.value
        }
        
    }

      export const setLimitOffsetOrder = (e) => { 
        
        return{
          type: 'SET_LIMIT_OFFSET_ORDER',
          payload: e.target.value
        }
        
    }
      
    export const changeReady = param =>{
        return{
          type: 'CHANGE_READY',
          payload: param
        }
    } 
      
    export const addToCart =  item =>( 
      async dispatch => { 
      const url = './api/cart/add'
      let obj1  = {}  
      let obj2  = {}  
     
      if(item.cartTemp[item.id].amount1){
      obj1 =  {
          "variationId": item.variations[0].id,
          "quantity": item.cartTemp[item.id].amount1
        }
      }
        if(item.cartTemp[item.id].amount2){
        obj2 =  {
          "variationId": item.variations[1].id,
          "quantity": item.cartTemp[item.id].amount2
        }
      }
        const obj = {
          ...obj1,
          ...obj2
        }
      try {
        await axios.post(url, obj)
         dispatch(getProductQuantity(item.id))
        
        } catch (err) {
           console.error(err)
        }
      }
    )

       
      
    export const addToCartState = obj =>  obj


    export const getProductQuantity = id => (
      async dispatch => {
        const url = `/api/products/${id}`
      try {
            const response = await axios.get(url)
            const data = response.data
            dispatch(addToCartState(
              {
                type: 'ADD_TO_CART',
              }
            ))
          await dispatch(setProductQuantity(data))
          await dispatch(setCardQuantity(data))
          await dispatch(getCartAmount())
        } catch (err) {
            console.error(err)
        }
      }
    )

    export const setProductQuantity = prod => ({
      type: "SET_PRODUCT_QUANTITY",
      payload: prod
    })

    export const setCardQuantity = prod => ({
      type: "SET_CARD_QUANTITY",
      payload: prod
    })

    export const removeItem =  (id, history) =>( 
      async dispatch => { 
      const url = `/api/cart/${id}`
     
      try {
        let response = await axios.delete(url)
        if(!response.data.totalItems) history.push('/shop')
        await dispatch(removeItemState(
          {
            type: 'REMOVE_FROM_CART',
            payload: id
          }
        ))
        await dispatch(getCartAmount())
        } catch (err) {
           console.error(err)
        }
      }
    )
      
    export const removeItemState = obj => obj
    

      
    export const submitOrder =  () =>( 
      async dispatch => { 
      const url = `/api/cart/complete`
     
      try {
           await axios.post(url)
          await dispatch(handleSubmitOrder())
          await dispatch(getCart())
          return true
        } catch (err) {
           console.error(err)
           return 'error'
        }
      }
    )



 
    export const handleSubmitOrder = () => ({
      type: 'SUBMIT_ORDER'
    })


    export const getContent = page => {
      return async dispatch => {
        const url = `/api/contents/${page}`
        try {
          let response = await axios.get(url)
          await dispatch(setContent(response.data))
          } catch (err) {
            console.error(err)
          }
      }
    }

    export const setContent = data => ({
      type: "SET_CONTENT",
      payload: data
    })

    export const toggleDates = () => ({
      type: "TOGGLE_DATES"
    })

    export const setNewDate = e => (
      dispatch =>{
        dispatch(setDate(e.target.value))
        dispatch(toggleDates())
      }
    )



 

    export const getOrders = (obj = {}) => (
      async dispatch => { 
        
    
         const url = '/api/orders'
    
         
         try {
              const response = await axios.get(url, {params:{...obj}})
              const data = response.data
              await dispatch(setOrders(data.content))
              await dispatch(setItemsTotalOrder(data.totalElements))
              await dispatch(setPagesOrder(data.totalPages))
              await dispatch(setFilterParamsOrder(obj))
              await dispatch(setOrders(data.content))
           } catch (err) {
              console.error(err)
           }
     }
    )
  
    
    export const setFilterParamsOrder = obj =>({
      type: "SET_FILTER_PARAMS",
      payload: obj
    })
  
    
    export const setItemsTotalOrder = num => ({
      type: 'SET_ITEMS_TOTAL',  
      payload: num
    });

  
    export const setOrders = data => ({
      type: "SET_ORDERS",
      payload: data,
    })
  
    export const getOrder = (id, link) => (
      async dispatch => {
        const url = `/api/orders/${id}/items`
        try {
          let response = await axios.get(url)
          await dispatch(setOrder(response.data, link))
          } catch (err) {
            console.error(err)    
          }
      }
    )
  
  
    export const setOrder = (data, link) => ({
      type: "SET_ORDER",
      payload: [data,link]
    })
  
    export const closeOrder = () => ({
      type: "CLOSE_ORDER",
    })
  

    export const editComment = id => {
      return{
      type: "EDIT_COMMENT",
      payload: id
    }}

    export const saveComment = id => {
      return{
      type: "SAVE_COMMENT",
      payload: id
    }}


    export const editNoteHandler = (id, e) =>{
      console.log(e.target.value);
      return {
        type: 'EDIT_NOTE',
        payload: [id, e.target.value]
      }
    }