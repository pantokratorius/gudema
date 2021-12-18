import React from "react";
import "./ConfirmationButton.scss"
import * as headerActions from '../../../actions/header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";


const ConfirmationButton = ({submitOrderHandler, requisites}) => {

  const { t } = useTranslation()  

    return(
        <div className="conf-cart">
            <button onClick={submitOrderHandler}>{t('confirmOrder')}</button>
            <p>{t('message.orderConfirmed')}<span style={{whiteSpace:"nowrap"}}> {requisites && requisites.phone}</span></p>
            {/* <hr /> */}
        </div>
        
    )
} 


    
const mapStateToProps = state => ({
    requisites: state.header.requisites
  });
    
    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators(headerActions, dispatch),
    });
    
    export default connect (
      mapStateToProps,
      mapDispatchToProps,
    )(ConfirmationButton);
  