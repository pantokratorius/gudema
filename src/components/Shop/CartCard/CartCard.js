import React, { useEffect } from "react";
import "./CartCard.scss"
import * as shopActions from '../../../actions/shop'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";


const CartCard = props => { 

    const history = useHistory()
    const { t } = useTranslation();
   
    
      const checkPlusAmount = fl =>{
        let amount = Number(fl.item.variation.unitsInPackage); 
        let quantity = Number(fl.item.product.quantity);
        return !(amount++ > quantity) 
      }
    
      const checkMinusAmount = fl =>{
        return (Number(fl.item.quantity) < 2)
      }

    const item = props.item.product
    const ordered = props.item.ordered

    return(
        <>
        <div className="Cart-card">
            <div className={"wrap"}>
                <div className="image"><img src={item.photoLink} alt="" /></div>
                
                <div className="info">
                    <ul>
                        <li>{item.name}</li>
                        <li style={{overflow: 'hidden'}}>{item.grower}</li>
                        
                    </ul>
                    <ul>
                        <li>{t('params.length')}: {item.height}</li>
                        <li>{t('params.color')}: {item.color}</li>
                        <li>{t('params.amount')}: {item.quantity}</li>
                        <li>{t('params.quality')}: {item.quality}</li>
                        <li>{t('params.price')}: {props.item.variation.unitPrice.toFixed(2)}</li>

                    </ul>
                </div>
            </div>

            <div className="controls-wrap">
                <div className="controls">  

                
                <div>
                  {!ordered ?
                        <div className="count">
                                        <span className={`minus ${checkMinusAmount(props) ? 'disabled' : ''}`} onClick={!checkMinusAmount(props) ? props.changeAmount.bind(this,props.item.id, (props.item.quantity - 1)) : null}>&ndash;</span>
                                        <span className="amount">{props.item.quantity}</span>
                                        <span className={`plus ${!checkPlusAmount(props) ? 'disabled' : ''}`} onClick={checkPlusAmount(props) ? props.changeAmount.bind(this,props.item.id, (props.item.quantity + 1)) : null}>+</span>
                                </div>
                                : 
                                <div className="count">
                                        <span className="amount"  style={{color:'#2b48da'}}>{t('ordered')}</span>
                                </div>
                  }
                  {!ordered 
                    ? <p>x{props.item.variation.unitsInPackage}&nbsp;&nbsp;{props.item.variation.unitPrice.toFixed(2)} €</p>
                    : null
                  }
                    </div>
                </div>
                {!ordered
                  ?
                  <span className="close" onClick={props.removeItem.bind(this, props.item.id, history)}>&times;</span>
                  : null
                  }
            </div>
        </div>
        <hr  className="hr" />
        </>
        
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
    )(CartCard);