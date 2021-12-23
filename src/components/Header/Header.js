import React, { useEffect } from "react";
import "./Header.scss"
import dots from "../../images/dots.png"
import cart from "../../images/cart.png"
import { Link, NavLink } from "react-router-dom";
import * as headerActions from '../../actions/header'
import * as shopActions from '../../actions/shop'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AuthForm from "../AuthForm/Auth";
import EmptyCartPop from "../EmptyCartPop/EmptyCartPop";
import LogoutForm from "../LogoutForm/LogoutForm";
import MainMenu from "../MainMenu/MainMenu";
import logo from './../../images/logo.png'
import './../../i18n'
import { useTranslation } from "react-i18next";
import {  useHistory } from "react-router";
import { useCookies } from "react-cookie";



const Header = props => {

  const [cookies, setCookie] = useCookies(['lang'])

  const  handleCookie = lang =>{
    setCookie('lang', lang, {path: '/'})
  }

  const history = useHistory()

  useEffect(()=>{
    const {getCart} = props
    getCart(history)
    changeLanguage(currentLanguage)
  }, [])

  const amount = props.cartAmount

  const { t, i18n } = useTranslation();
  const currentLanguage = Object.keys(cookies).length ? cookies.lang : i18n.translator.language
  const changeLanguage = language => { 
    i18n.changeLanguage(language);
  };

  const langs = ['lt', 'en', 'fin', 'ru']

 const handleLangClick = lang => {
    changeLanguage(lang)
    handleCookie(lang)
    const path = history.location.pathname
    const pathname = path.substring(1) === '' ? 'home' : path.substring(1)
  
    props.getContent(pathname);
    props.toggleLangs(false)

 }
  
    

    return(
      <>
        <div className="header">
            <div className="logo">
                <Link to="/home"><img src={logo} alt="logo" /></Link>
                {props.isAuth ?
                <ul>
                  <li><NavLink to="/orders">{t('pages.orders')}</NavLink></li>
                  <li><NavLink to="/shop">{t('pages.shop')}</NavLink></li>
                </ul>
                : null 
                }
            </div>
            <ul className="links">
                <li className="dots"><a onClick={props.toggleMenu} href='#'><img src={dots} alt="" /></a></li>
                <li id="login"><a onClick={props.authFormToggle} href="#">{props.isAuth ? props.authUsername : t('logIn')}</a></li>
                <li style={{position: 'relative', textTransform: 'uppercase', fontSize: '13px'}}><a href="#" onClick={props.toggleLangs.bind(this,!props.langsOpen)}>{currentLanguage}</a>
                  <ul className={props.langsOpen ? 'slideOut' : null}>
                    {langs.map((lang, i)=> {
                      if(lang != currentLanguage)
                      return(
                      <li key={i}><a href="#" onClick={handleLangClick.bind(this, lang)}>{lang}</a></li>
                      )
                    })}
                  </ul>
                  </li>
                <li style={{position: 'relative'}} >
                  <Link to={props.isAuth && amount > 0 ? "/cart" : "#"}><img src={cart} alt="" /></Link>
                  {amount > 0 && props.isAuth ? <span className={`badge ${amount.toString().length >2 && "thirty"}`} >{amount}</span> : null}
                  {!amount  && props.isAuth ? <EmptyCartPop cls="trigger" /> : null }
                </li>
            </ul>
        </div>
        {props.formIsOpen 
            ? 
            props.isAuth 
              ? <LogoutForm />
              : <AuthForm />
            
            : null
            }
          {props.menuIsOpen 
          ?
          <MainMenu toggleMenu={props.toggleMenu} />
          :
          null
          }  

        </>
    )
}



const mapStateToProps = state => ({
  formIsOpen: state.header.formIsOpen,
  cart: state.shop.cart,
  cartAmount: state.shop.cartAmount,
  cartTemp: state.shop.cartTemp,
  isAuth: !!state.auth.authUsername,
  username: state.auth.username,
  authUsername: state.auth.authUsername,
  menuIsOpen: state.header.menuIsOpen,
  langsOpen: state.header.langsOpen,
  headerReady: state.header.headerReady
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(headerActions, dispatch),
    ...bindActionCreators(shopActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(Header);
