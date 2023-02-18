import React, { useEffect } from "react";
import { connect } from "react-redux";
import  CarouselComponent from '../components/Carousel/Carousel'
import Footer from "../components/Footer/Footer";
import Preloader from "../components/Preloader/Preloader";
import './scss/Home.scss'
import * as shopActions from './../actions/shop'
import { bindActionCreators } from 'redux';
import HowWeWork from "../components/HowWeWork/HowWeWork";

const Home = props => {
    
    document.title ="Gudema Homepage"

    useEffect (() => {
        props.getContent('home')   
        return () => {
            props.changeReady(false)
          }
    }, [])

    return(
        <>    
            {!props.isReady 
            ?
            <Preloader />
            : 
            <CarouselComponent images={props.content ? props.content : null} />
            }
            <HowWeWork />
            <div style={{minHeight: 'calc(100vh - 465px)'}}>
              {!props.isReady ?
                  <Preloader />
                  :
                  props.content && props.content.map((item, i)=>(
                      item.type== "blockWithImage" ?
                      
                       item.data.imagePosition == 'right' ?
                      <div className="block2" key={i}>
                        <div className="text">
                            <h2>{item.data.headline}</h2>
                            <p>{item.data.text}</p>
                        </div>
                        <img src={item.data.imageLink} alt="" />
                    </div>
                    :
                    <div className="block1" key={i}>
                        <img src={item.data.imageLink} alt="" />
                        <div className="text">
                            <h2>{item.data.headline}</h2>
                            <p>{item.data.text}</p>
                        </div>
                    </div>
                    :
                    item.type== "paragraph" ?
                    <div className="block" key={i}>
                        <div className="text">
                            <h2>{item.data.headline}</h2>
                            <p>{item.data.text}</p>
                        </div>
                    </div>
                    :
                    null
                  ))
                  }
                </div>

            {!props.isReady ?
                  <Preloader />
                  :
              <Footer content={props.content} />
            }
        </>
    )
}


  
const mapStateToProps = state => ({ 
    formIsOpen: state.header.formIsOpen,
    isReady: state.shop.isReady,
    content: state.shop.content
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(Home);