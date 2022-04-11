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



const Balance = props => {console.log(props);

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
                  props.balances 
                    ?
                    <>
                  <Table striped bordered hover responsive="md" className={classes.balances}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>No</th>
                            <th>{t('orders.date')}</th>
                            <th>{t('orders.paymentDate')}</th>
                            <th>{t('orders.paimentStatus')}</th>
                            <th>{t('orders.plannedDeliveryDate')}</th>
                            <th>{t('orders.status')}</th>
                            <th>{t('orders.totalsum')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.balances.map((item, i)=>(
                            <tr key={i} onClick={props.getOrder.bind(this, item.id, item.invoiceLink)}  className={classes.hover}>
                                <td style={{textAlign:'center'}}>{item.id}</td>
                                <td>{!item.invoiceLink ? item.invoiceNo : <a href={item.invoiceLink}  onClick={returnFalse}>{item.invoiceNo}</a>}</td>
                                <td>{item.invoiceDate && moment(item.invoiceDate).format("YYYY-MM-DD")}</td>
                                <td>{item.invoicePaymentDate && moment(item.invoicePaymentDate).format("YYYY-MM-DD")}</td>
                                <td>{t(`paymentStatus.${item.paidStatus}`)}</td>
                                <td>{item.plannedDeliveryDate && moment(item.plannedDeliveryDate).format("YYYY-MM-DD")}</td>
                                <td>{t(`status.${item.status}`)}</td>
                                <td>{item.totalSum && item.totalSum.toFixed(2)}</td>
                            </tr>
                      ))}
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