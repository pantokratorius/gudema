import React from "react";
import Carousel from 'react-bootstrap/Carousel'

import './Carousel.scss';
import * as shopActions from '../../actions/shop'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

const CarouselComponent = props => {  
  
    

    return(
        props.images && props.images.map((block, index)=>(
          block.type == "slideBox" ?
          <>
          <Carousel controls={false} indicators={block.data.images && block.data.images.length < 2 ? false : true} key={index}>
          {block.data.images && block.data.images.map((image, i)=>(
             <Carousel.Item key={i}>
             <img
             className="d-block w-100"
             src={image.imageLink}
             alt="Slides"
             />
         </Carousel.Item>
          ))}
        </Carousel>
          <div className="heroText">
            <h2>Don‘t miss our spring offers</h2>
            <p>browse all offers <a href="#">here</a></p>
          </div>
          </>
        : null
        ))
    )
}




const mapStateToProps = state => ({
    isReady: state.shop.isReady,
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(CarouselComponent);

