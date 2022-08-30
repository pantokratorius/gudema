import React from "react";
import "./ShopingCard.scss"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import  CardGroup  from "react-bootstrap/CardGroup";
import * as shopActions from '../../../actions/shop'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { useTranslation } from "react-i18next";
import promo from '../../../images/special.png'




const ShopingCard = fl => {

  const { t } = useTranslation();


    const checkPlusTen = fl =>{ 
        let ten = Number(fl.variations[0].unitsInPackage)
      let fifty = 0
    if(fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount2)
    fifty =  fl.cartTemp[fl.id].amount2 * fl.variations[1].unitsInPackage
  
        if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount1)){
            return fl.quantity - fifty - ten >= 0 
        }else{
            return fl.cartTemp[fl.id].amount1 * ten + ten + fifty <= fl.quantity 
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
        return fl.cartTemp[fl.id].amount2 * fifty + fifty + ten <= fl.quantity 
       }
      }

      const checkMinusTen = fl => {
        if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount1)){
          return false
     }else{
        return fl.cartTemp[fl.id].amount1 > 0 
     }
      }

      const checkMinusFifty = fl => {
        if(!fl.cartTemp[fl.id] || (fl.cartTemp[fl.id] && !fl.cartTemp[fl.id].amount2)){
          return false
    }else{
      return fl.cartTemp[fl.id].amount2 > 0 
    }
  }


    return(
        <CardGroup className="shopping-cart">
            <Card>
                <div className="title-wrap mb-4" onClick={fl.showCard.bind(this,fl)}>
                    <Card.Subtitle>{fl.fullName}</Card.Subtitle>   
                    <Card.Subtitle style={{whiteSpace: 'nowrap'}}>{fl.variations[0] && fl.variations[0].unitPrice.toFixed(2)} €</Card.Subtitle>
                 </div>   
                <Card.Img variant="top" src={fl.photoLink}  onClick={fl.showCard.bind(this,fl)} />
                {fl.specialOffer ?
                <Card.Img className="promo" src={promo}  onClick={fl.showCard.bind(this,fl)}  />
                : null
                }
                <Card.Body>
                    <Card.Text className="text_supplier" style={{}}>{t('params.supplier')}: {fl.grower}</Card.Text>
                    <Card.Text><span>{t('params.length')}:</span> {fl.height}</Card.Text>
                    <Card.Text><span>{t('params.amount')}:</span> {fl.quantity}</Card.Text>
                    <Card.Text><span>{t('params.quality')}:</span> {fl.quality}</Card.Text>
                    <Card.Text className="colorParam"><span>{t('params.color')}:</span> {fl.color}</Card.Text>
                    <div className="countWrap"> 
                        <div>
                            <div className="count">
                                <span className={`minus ${!checkMinusTen(fl) ? 'disabled' : null}`} onClick={checkMinusTen(fl) ? fl.minusTen.bind(this, fl) : null}>&ndash;</span>
                                <span className="amount">{fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount1 ? fl.cartTemp[fl.id].amount1 : 0}</span>
                                <span className={`plus  ${!checkPlusTen(fl) ? 'disabled' : null}`} onClick={checkPlusTen(fl) ? fl.plusTen.bind(this, fl) : null}>+</span>
                            </div>
                            <p style={{whiteSpace:'nowrap'}}>x{fl.variations[0].unitsInPackage}&nbsp;&nbsp;{fl.variations[0].unitPrice.toFixed(2)} €</p>
                        </div>
                        {fl.variations[1] ?
                            <div>
                            <div className="count">
                                        <span className={`minus ${!checkMinusFifty(fl) ? 'disabled' : null}`} onClick={checkMinusFifty(fl) ? fl.minusFifty.bind(this, fl) : null}>&ndash;</span>
                                        <span className="amount">{fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount2 ? fl.cartTemp[fl.id].amount2 : 0}</span>
                                        <span className={`plus ${!checkPlusFifty(fl) ? 'disabled' : null}`} onClick={checkPlusFifty(fl) ? fl.plusFifty.bind(this, fl) : null}>+</span>
                                </div>
                            <p style={{whiteSpace:'nowrap'}}>x{fl.variations[1] && fl.variations[1].unitsInPackage}&nbsp;&nbsp;{fl.variations[1] && fl.variations[1].unitPrice.toFixed(2)} €</p>
                        </div>
                        : null 
                        }
                    </div>
                    <div className="bottom">
                        <Button disabled={!(fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount2 || fl.cartTemp[fl.id] && fl.cartTemp[fl.id].amount1)} variant="primary" onClick={fl.addToCart.bind(this, fl)}>{t('order')}</Button>
                    </div>
                </Card.Body>
            </Card>
        </CardGroup>
    )
} 



const mapStateToProps = state => ({
    cart: state.shop.cart,
    cartTemp: state.shop.cartTemp
  });
    
    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators(shopActions, dispatch),
    });
    
export default connect (
      mapStateToProps,
      mapDispatchToProps,
    )(ShopingCard);