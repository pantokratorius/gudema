import React, { useEffect } from "react";
import { connect } from "react-redux";
import Footer from "../components/Footer/Footer";
import Preloader from "../components/Preloader/Preloader";
import * as shopActions from '../actions/shop'
import { bindActionCreators } from 'redux';
import { Button, Table } from "react-bootstrap";
import classes from './scss/Balance.module.scss'
import moment from "moment"
import { useTranslation } from "react-i18next";
import Order from "../components/Order/Order";
import formatPrice from "../helpers/formatPrice";



const Balance = props => {

  const { t } = useTranslation() 
    
    document.title ="Gudema Balance"

    useEffect (() => {
      props.closeOrder()
        props.getBalance()   
        return () => {
            props.changeReady(false)
          }
    }, [])

    const returnFalse = e => {
      e.preventDefault()
    }

    const downloadBalance = () => {
        const link = document.createElement('a');
        link.href = '/api/balance.pdf';
        link.setAttribute('download','/api/balance.pdf')
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

   

    return(
        <>    
            <div>
              {props.order ?
                  <Order />
                  :
                  props.balances.orders 
                    ?
                    <>
                    <h4 className={classes.balances}>Kliento balansas</h4>
                  <Table striped bordered hover responsive="md" >
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>No</th>
                            <th>{t('orders.date')}</th>
                            <th>{t('orders.paymentDate')}</th>
                            <th>{t('orders.paimentStatus')}</th>
                            <th>{t('params.totalSumm')}</th>
                            <th>{t('params.paidSumm')}</th>
                            <th>{t('params.balance')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.balances.orders.map((item, i)=>(
                            <tr key={i} onClick={props.getOrder.bind(this, item.id, item.invoiceLink)}  className={classes.hover}>
                                <td style={{textAlign:'center'}}>{!item.invoiceLink ? item.invoiceNo : <a href={item.invoiceLink}  onClick={returnFalse}>{item.invoiceNo}</a>}</td>
                                <td>{item.invoiceDate && moment(item.invoiceDate).format("YYYY-MM-DD")}</td>
                                <td>{item.invoicePaymentDate && moment(item.invoicePaymentDate).format("YYYY-MM-DD")}</td>
                                <td>{t(`paymentStatus.${item.paidStatus}`)}</td>
                                <td>{formatPrice(item.totalSum)}</td>
                                <td>{item.paidedAmount && formatPrice(item.paidedAmount)}</td>
                                <td>{formatPrice(item.balance)}</td>
                            </tr>
                      ))}
                         <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{textAlign:"right"}}><b>{t('params.total')}:</b></td>
                            <td>{formatPrice(props.balances.totalSum)}</td>
                            <td>{formatPrice(props.balances.totalPaidSum)}</td>
                            <td><b>{formatPrice(props.balances.balance)}</b></td>
                        </tr>
                      </tbody>
                      </Table>
                       <Button size="sm" variant="outline-primary" style={{float: 'right', borderRadius: '20px'}} onClick={downloadBalance}>{t('download')} pdf</Button>
                       </>
                      :
                      null
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
    balances: state.shop.balances,
    isReady: state.shop.isReady,
    order: state.shop.order,
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(Balance);