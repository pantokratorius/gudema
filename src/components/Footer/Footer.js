import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"
import * as headerActions from '../../actions/header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";
import logo from '../../images/logoFooter.png'



const Footer = props => { 

  const { t } = useTranslation();

    useEffect (()=>{
        const {getRequisites} = props
        getRequisites()
      }, [])


    return(
        <div className="footer" >
        {props.hr 
        ? <hr />
        : null
        }
            <div className="wrap">
                <div>
                    <h3 className="logo"><img src={logo}/></h3>
                    <p className="requisites">{props.requisites && props.requisites.secondaryAddress}</p>
                </div>
                <div className="phoneMail">
                    <h5 >
                      <a href={`tel:${props.requisites && props.requisites.phone}`}>{props.requisites && props.requisites.phone}</a>
                    </h5>
                    <h5 >
                      <a href={`tel:${props.requisites && props.requisites.phoneSecond}`}>{props.requisites && props.requisites.phoneSecond}</a>
                    </h5>
                    <p className="email" style={{margin: 'auto 0 0'}}><a style={{fontSize:'12pt', lineHeight: '32px'}} href={`mailto:${props.requisites && props.requisites.email}`}>{props.requisites && props.requisites.email}</a></p>
                </div>
           </div>
      
        </div>
    )
}




  
const mapStateToProps = state => ({
  requisites: state.header.requisites,
  isAuth: !!state.auth.authUsername
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(headerActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(Footer);
