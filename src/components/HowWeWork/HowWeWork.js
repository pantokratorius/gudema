import React from "react";
import cls from './HowWeWork.module.scss'
import circle from '../../images/circle.png'
import flower from '../../images/flower.png'
import plane from '../../images/plane.png'
import location from '../../images/location.png'

  const HowWeWork = props => {



    return(
        <>
            <div className={cls.box}>
                <div>
                    <span>Order</span>
                    <img src={circle} />
                    <img src={flower} />
                </div>
                <div>
                    <span>Transit</span>
                    <img src={circle} />
                    <img src={plane} />
                </div>
                <div>
                    <span>Delivery</span>
                    <img src={circle} />
                    <img src={location} />
                </div>
            </div>
            <p className={cls.text}>Simple as one two three ...</p>
        </>
    )
}

  
  export default HowWeWork 