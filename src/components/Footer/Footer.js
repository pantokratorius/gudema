import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"
import * as headerActions from '../../actions/header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";



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
                    <h3 style={{height: '30px', display: 'flex', alignItems: 'flex-end'}}>Gudema</h3>
                    <p>{/*props.requisites && props.requisites.address*/}</p>
                </div>
                <div>
                    <h5 style={{height: '30px', display: 'flex', alignItems: 'flex-end'}}><a href={`tel:${props.requisites && props.requisites.phone}`}>{props.requisites && props.requisites.phone}</a></h5>
                    <p><a href={`mailto:${props.requisites && props.requisites.email}`}>{props.requisites && props.requisites.email}</a></p>
                </div>
           </div>
           <div className="wrap2">
                <div>
                    {/* <h5><Link to='./about'>{t('pages.aboutUs')}</Link></h5> */}
                </div>
                <div>
                <h5 style={{height: '30px', display: 'flex', alignItems: 'flex-end'}}><Link to='./about'>{t('pages.aboutUs')}</Link></h5>
                        {/* <h5><Link to='./contacts'>{t('pages.contacts')}</Link></h5> */}
                </div>
           </div>
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
  )(Footer);
