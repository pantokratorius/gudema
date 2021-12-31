import React from "react";
import "./ShoppingCardPopup.scss"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import  CardGroup  from "react-bootstrap/CardGroup";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import * as shopActions from '../../../actions/shop'
import { useTranslation } from "react-i18next";
import promo from '../../../images/special.png'



const ShoppingCardPopup = props => {

  const { t } = useTranslation();

    const checkPlusTen = fl =>{ 
        let ten = Number(fl.variations[0].unitsInPackage)
      let fifty = 0
    if(fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount2)
    fifty =  fl.cartTemp[fl.id].amount2 * fl.variations[1].unitsInPackage
  
        if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount1)){
            return fl.quantity - fifty - ten >= 0 ? true : false
        }else{
            return fl.cartTemp[fl.id].amount1 * ten + ten + fifty <= fl.quantity ? true : false
        }
      }

     const checkPlusFifty = fl =>{
       if(!fl.variations[1]) return false
        let fifty = Number(fl.variations[1].unitsInPackage)
      let ten = 0
    if(fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount1)
      ten =  fl.cartTemp[fl.id].amount1 * fl.variations[0].unitsInPackage
  
       if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount2)){
        return fl.quantity - ten - fifty >= 0 ? true : false
       }else{
        return fl.cartTemp[fl.id].amount2 * fifty + fifty + ten <= fl.quantity ? true : false
       }
      }

      const checkMinusTen = fl => {
        if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount1)){
          return false
     }else{
        return fl.cartTemp[fl.id].amount1 > 0 ? true : false
     }
      }

      const checkMinusFifty = fl => {
        if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount2)){
          return false
    }else{
      return fl.cartTemp[fl.id].amount2 > 0 ? true : false
    }
  }

    return(
        <div className="fade-for-click2" onClick={props.closeCart}>
            <CardGroup className="shopping-cart-popup">
                <Card>
                <div className="close" onClick={props.closeCart}>&times;</div>
                    <Card.Img  src={props.photoLink} />
                    {props.specialOffer ?
                    <Card.Img className="promo" src={promo}  />
                    : null
                    }
                    <Card.Body>
                    <div className="title-wrap mb-4">
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Subtitle>{t('params.supplier')}: {props.grower}</Card.Subtitle>
                    </div>   
                    <div>
                        <Card.Text>{t('params.length')}: {props.height}</Card.Text>
                        <Card.Text>{t('params.amount')}: {props.quantity}</Card.Text>
                        <Card.Text>{t('params.quality')}: {props.quality}</Card.Text>
                    <Card.Text>{t('params.color')}: {props.color}</Card.Text>
                    </div>    
                        <div className="countWrap">
                            <div>
                            <div className="count">
                                <span className={`minus ${!checkMinusTen(props) ? 'disabled' : null}`} onClick={checkMinusTen(props) ? props.minusTen.bind(this, props) : null}>&ndash;</span>
                                <span className="amount">{props.cartTemp[props.id] && props.cartTemp[props.id].amount1 ? props.cartTemp[props.id].amount1 : 0}</span>
                                <span className={`plus  ${!checkPlusTen(props) ? 'disabled' : null}`} onClick={checkPlusTen(props) ? props.plusTen.bind(this, props) : null}>+</span>
                            </div>
                                <p style={{textAlign: 'center'}}>x{props.variations[0].unitsInPackage}&nbsp;&nbsp;{props.variations[0].unitPrice.toFixed(2)} €</p>
                            </div>
                            {props.variations[1] ?
                                <div>
                                <div className="count">
                                        <span className={`minus ${!checkMinusFifty(props) ? 'disabled' : null}`} onClick={checkMinusFifty(props) ? props.minusFifty.bind(this, props) : null}>&ndash;</span>
                                        <span className="amount">{props.cartTemp[props.id] && props.cartTemp[props.id].amount2 ? props.cartTemp[props.id].amount2 : 0}</span>
                                        <span className={`plus ${!checkPlusFifty(props) ? 'disabled' : null}`} onClick={checkPlusFifty(props) ? props.plusFifty.bind(this, props) : null}>+</span>
                                </div>
                                    <p style={{textAlign: 'center'}}>x{props.variations[1].unitsInPackage}&nbsp;&nbsp;{props.variations[1].unitPrice.toFixed(2)} €</p>
                            </div>
                            : null
                            }
                        </div>
                        <Button disabled={!(props.cartTemp[props.id] && props.cartTemp[props.id].amount2 || props.cartTemp[props.id] && props.cartTemp[props.id].amount1)} variant="primary" onClick={props.addToCart.bind(this, props)}>{t('order')}</Button>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}


const mapStateToProps = (state) => ({ 
    cart: state.shop.cart,
    cartTemp: state.shop.cartTemp,
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(ShoppingCardPopup);