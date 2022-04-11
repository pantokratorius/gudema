import React, { useEffect } from "react";
import "./Order.scss"
import * as shopActions from '../../actions/shop'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";



const Order = props => { 

    useEffect(() => {
          return () => {
            props.closeOrder()
            }
      }, [])

    const { t } = useTranslation();

    const downloadPdf = () => {
        const link = document.createElement('a');
        link.href = props.order[1];
        link.setAttribute('download',props.order[1].substr(1))
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
   

    return(
        <div style={{marginTop:'70px'}}>
            
            <span style={{color: '#0d6efd'}}>&larr;</span> <span style={{color: '#0d6efd', cursor: 'pointer', textDecoration: 'underline'}} onClick={props.closeOrder.bind(this)}>{t('backorder')}</span>
            <Table className="order" striped bordered hover responsive="md" style={{marginTop: "20px"}}>
                <thead>
                    <tr>
                        <th>{t('params.name')}</th>
                        <th>{t('params.length')}</th>
                        <th>{t('params.color')}</th>
                        <th>{t('params.quantity')}</th>
                        <th>{t('params.price')}</th>
                        <th>{t('params.totalSumm')}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.order[0].map((item,i)=>(
                    <tr key={i}>
                        <td>{item.product.name}</td>
                        <td>{item.product.height}</td>
                        <td>{item.product.color}</td>
                        <td>{item.unitsQuantity}</td>
                        <td>{item.unitPrice.toFixed(2)}</td>
                        <td>{item.totalPrice.toFixed(2)}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            <span style={{color: '#0d6efd'}}>&larr;</span> <span style={{color: '#0d6efd', cursor: 'pointer', textDecoration: 'underline'}} onClick={props.closeOrder.bind(this)}>{t('backorder')}</span>
            {props.order[1] ?
                <Button size="sm" variant="outline-primary" style={{float: 'right', borderRadius: '20px'}} onClick={downloadPdf}>{t('download')} pdf</Button>
                : null 
            }
        </div>
    )
}




  
const mapStateToProps = state => ({
    order: state.shop.order
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(shopActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(Order);
