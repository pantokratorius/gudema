import React from "react";
import "./TotalSum.scss"
import { useTranslation } from "react-i18next";




const TotalSum = props => {

  const { t } = useTranslation();
   
    const getSum = () => (
      Object.values(props.cart).reduce(
        (sum, curr)=>(sum + curr.totalPrice),0) 
    )

    
    return(
        <div className="total_sum">
            <h3>{t('params.totalAmount')}: {props.cart.length} {t('params.totalSumm')}: {getSum().toFixed(2)} &euro;</h3>
        </div>
    )
} 



    
export default TotalSum