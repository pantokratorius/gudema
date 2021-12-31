import React from "react";
import "./CartCard.scss"
import * as shopActions from '../../../actions/shop'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import promo from '../../../images/special.png'


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

const setCursor = e => {
  e.target.scrollTop = 50
  e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
}

    return(
        <>
        <div className="Cart-card">
            <div className={"wrap"}>
                <div className="image">
                  <img src={item.photoLink} alt="" />
                  {item.specialOffer ?
                  <img className="promo" src={promo}  />
                  : null
                  }
                </div>
                
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
                {
                 props.item.ordered === false ?
                
                
                props.item.hasOwnProperty('editNote') && props.item.editNote === true ?
                <>
                  <textarea autoFocus maxLength={255} onFocus={setCursor.bind(this)} onChange={props.editNoteHandler.bind(this, props.item.id)} value={props.item.note}></textarea>
                  <Button className="comment_button save" onClick={props.saveComment.bind(this, props.item.id, props.item.note)}>{t('save')}</Button>
                  </>
                  :
                    <>
                      <div className="textarea" style={props.item.note?.length ? {borderBottom:'1px solid'}: null}>{props.item.note}</div>
                      <button className="comment_button" onClick={props.editComment.bind(this, props.item.id)}>{t('comment')}</button>
                    </>
                  : 
                  null
                }

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
                  <div className="buttons_wrap">
                    <span className="close" onClick={props.removeItem.bind(this, props.item.id, history)}>&times;</span>
                  </div>
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
    note: state.shop.note,
  });
    
    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators(shopActions, dispatch),
    });
    
export default connect (
      mapStateToProps,
      mapDispatchToProps,
    )(CartCard);