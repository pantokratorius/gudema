import React from "react";
import './EmptyCartPop.scss';
import { useTranslation } from "react-i18next";

const EmptyCartPop = props => {

  const { t } = useTranslation()
    
    return(
        <div className={props.cls}>
            <div className="popup">
            <div className="inner">{t('cart')}</div>
            </div>
      </div>
    )
}

  
  export default EmptyCartPop
