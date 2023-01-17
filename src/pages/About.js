import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import './scss/About.scss'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as shopActions from './../actions/shop'
import Preloader from "../components/Preloader/Preloader";

const About = props => {

    document.title ="Gudema About page"

    useEffect (()=>{
        props.getContent('about')
        return () => {
            props.changeReady(false)
          }
      }, [])

    return(
        <>
            <div className="about">
              {!props.isReady ?
                  <Preloader />
                  :
                  props.content && props.content.map((item, i)=>(
                      item.type= "blockWithImage" ?
                       item.data.imagePosition && item.data.imagePosition == 'right' ?
                      <div className="block2" key={i}>
                        <div className="text">
                            <h2>{props.content && props.content[i] ? props.content[i].data.headline : ''}</h2>
                            <p>{props.content && props.content[i] ? props.content[i].data.text : ''}</p>
                        </div>
                        <img src={props.content && props.content[i] ? props.content[i].data.imageLink : ''} alt="" />
                    </div>
                    :
                    <div className="block1" key={i}>
                        <img src={props.content && props.content[i] ? props.content[i].data.imageLink : ''} alt="" />
                        <div className="text">
                            <h2>{props.content && props.content[i] ? props.content[i].data.headline : ''}</h2>
                            <p>{props.content && props.content[i] ? props.content[i].data.text : ''}</p>
                        </div>
                    </div>
                    :
                    <div className="block">
                        <div className="text">
                            <h2>{props.content && props.content[1] ? props.content[1].data.headline : ''}</h2>
                            <p>{props.content && props.content[1] ? props.content[1].data.text : ''}</p>
                        </div>
                    </div>
                  ))
                  }
            </div>
              <Footer />
        </>
    )
}


const mapStateToProps = state => ({ 
    content: state.shop.content,
    isReady: state.shop.isReady
});
  

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });
 
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(About);