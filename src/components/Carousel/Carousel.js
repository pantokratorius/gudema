import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import { useHistory } from "react-router-dom";
import './Carousel.scss';
import * as shopActions from '../../actions/shop'
import * as headerActions from '../../actions/header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

const CarouselComponent = props => {  

const history = useHistory()
   
const openSpecialGroup = group => { 
  if(props.isAuth){
    props.addSpecialOffer(group)
    history.push('/shop')
  }
}
    

    return(
        props.images && props.images.map((block, index)=>(
          block.type == "slideBox" ?
          <React.Fragment key={index}>
          <Carousel controls={false} indicators={block.data.images && block.data.images.length < 2 ? false : true} >
          {block.data.images && block.data.images.map((image, i)=>(
             <Carousel.Item key={i}>
             <img
             className="d-block w-100"
             src={image.imageLink}
             alt="Slides"
             />
             {image.headline || image.headline ? 
            <div  className="heroText">
                      <h2>{image.headline}</h2>
                      {image.group &&
                      <p>browse all offers <a href="#" onClick={openSpecialGroup.bind(this, image.group)}>here</a></p>
                      }
                    </div>
                    : null
             }
         </Carousel.Item>
          ))}
        </Carousel>
          </React.Fragment>
        : null
        ))
    )
}




const mapStateToProps = state => ({
    isReady: state.shop.isReady,
    isAuth: !!state.auth.authUsername,
    specialOffer: state.header.specialOffer
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
    ...bindActionCreators(headerActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(CarouselComponent);

