import React, { useEffect } from "react";
import { connect } from "react-redux";
import Footer from "../components/Footer/Footer";
import CartCard from "../components/Shop/CartCard/CartCard";
import * as shopActions from './../actions/shop'
import { bindActionCreators } from 'redux';
import {  useHistory } from "react-router";
import TotalSum from "../components/Shop/TotalSum/TotalSum";
import ConfirmationButton from "../components/Shop/ConfirmationButton/ConfirmationButton";
import { useTranslation } from "react-i18next";
import './scss/Cart.scss'
import DateSelect from "../components/Cart/DateSelect/DateSelect";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';




const Cart = props => { 


  const { t } = useTranslation()  

  const submitOrderHandler = async({message}) =>{ 
    const res =  await props.submitOrder() 
    if(res && res ==true)
       NotificationManager.success(t('message.orderConfNotif.message'))
       else if(res && res == 'error')
       NotificationManager.error('Something went wrong')
}


 

  const history = useHistory()

  
  document.title ="Gudema Cart"; 
 

  useEffect(()=>{
    

    const {getCart, getDates} = props
    getCart(history)
    getDates()
    
  }, [])

    return(
      <>
        <NotificationContainer  />
          {/* <Link to="/shop" style={{textAlign:'right', paddingRight: '90px', display: 'block'}}>{t('back')}</Link> */}
          <p style={{textAlign:'right', paddingRight: '90px', display: 'block', cursor:'pointer', marginBottom:"0", marginTop:"10px", fontSize: '19px'}} >{t('deliveryDate')}: <span style={{color:'#0d6efd'}} onClick={!props.dateSelect ? props.toggleDates.bind(this) : null}>
            {!props.dateSelect
            ?
            props.date
            :
            <DateSelect setNewDate = {props.setNewDate} date={props.date} dates={props.dates} toggleDates ={props.toggleDates} />
            }
            </span></p>
          {props.cart.map((item, i) => (
              <CartCard key={i} item={item} />
            )
          )}
          <TotalSum cart={props.cart} />
          <ConfirmationButton submitOrderHandler={submitOrderHandler.bind(this, {"message": t('message.orderConfNotif.message')} )} ordered={props.ordered} />
          <Footer hr={true}  />
         
        </>
    )
}



  
const mapStateToProps = state => ({ 
    cart: state.shop.cart,
    cartTemp: state.shop.cartTemp,
    flowers: state.flowers.items,
    ordered: state.shop.ordered,
    dates: state.shop.dates,
    date: state.shop.date,
    dateSelect: state.shop.dateSelect,
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });

export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(Cart);