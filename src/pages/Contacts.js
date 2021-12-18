import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import './scss/Contacts.scss'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as shopActions from './../actions/shop'

const Contacts = props => {

    document.title ="Gudema Contacts page"


    useEffect(()=>{
        props.getContent('contacts')
        return () => {
            props.changeReady(false)
          }
      }, [])

    return(
        <>
            <div className="contacts">
                <div className="block">
                    <div className="text">
                        <h2>Lorem ipsim 10 sit amet</h2>
                        <p>onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis</p>
                    </div>
                </div>
                <div className="block">
                    <div className="text">
                        <h2>Lorem ipsim 10 sit amet</h2>
                        <p>onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis</p>
                    </div>
                </div>
            </div>
              <Footer />
        </>
    )
}



  
const mapStateToProps = (state) => ({ 
    content: state.shop.content
});
  

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });
 
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(Contacts);