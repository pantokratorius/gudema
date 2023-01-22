import React from "react";
import './MainMenu.scss'
import * as headerActions from '../../actions/header'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavLink } from "react-router-dom";
import './../../i18n'
import { useTranslation } from "react-i18next";
import axios from "axios";



  const MainMenu = props => {

    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.translator.language
    const changeLanguage = (language) => { 
      i18n.changeLanguage(language);
      axios.put(`/api/user/lang/${language}`)
    };
  
    const langs = ['lt', 'en', 'fin', 'ru']
  

    const handleLangClickMobile = lang => {
      changeLanguage(lang)
      props.toggleLangsMobile(false)
  
   }


    return(
            <div className="fade-for-click"   onClick={props.closeMenu}>
                <div className="popup_wrap_mobile">
                    <span className="close-popup" onClick={props.closeMenu}>&times;</span>
                        <ul>
                        {props.isAuth &&
                            <li><NavLink to="/shop">{t('pages.shop')}</NavLink></li>
                        }
                            {/* <li><NavLink to="/about">{t('pages.aboutUs')}</NavLink></li> */}
                            {/* <li><NavLink to="/contacts">{t('pages.contacts')}</NavLink></li> */}
                            {props.isAuth &&
                              <>
                                <li><NavLink to="/orders">{t('pages.hystory')}</NavLink></li>
                                <li><NavLink to="/balance">{t('pages.balance')}</NavLink></li>
                              </>
                            }
                            <li className="langs_m"><a href="#" data-type='currentLang' onClick={props.toggleLangsMobile.bind(this,!props.langsOpenMobile)}>{currentLanguage}</a>
                            <span className={`arrow  ${props.langsOpenMobile && 'rotated'}`} >&lsaquo;</span>
                              <ul className={props.langsOpenMobile ? 'slideOut' : null}>
                                {langs.map((lang, i)=> {
                                  if(lang != currentLanguage)
                                  return(
                                  <li key={i}><a href="#" onClick={handleLangClickMobile.bind(this, lang)} >{lang}</a></li>
                                  )
                                })}
                              </ul>
                            </li>
                        </ul>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    formIsOpen: state.header.formIsOpen,
    cart: state.shop.cart,
    isAuth: !!state.auth.authUsername,
    username: state.auth.username,
    authUsername: state.auth.authUsername,
    langsOpen: state.header.langsOpen,
    langsOpenMobile: state.header.langsOpenMobile,
    
  });
    
    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators(headerActions, dispatch),
    });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(MainMenu);