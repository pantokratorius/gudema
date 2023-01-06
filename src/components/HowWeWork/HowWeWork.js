import React from "react";
import cls from './HowWeWork.module.scss'
import circle from '../../images/circle.png'
import flower from '../../images/flower.png'
import plane from '../../images/plane.png'
import location from '../../images/location.png'

  const HowWeWork = props => {



    return(
        <>
            <table className={cls.box}>
                <tbody>
                    <tr>
                        <td>
                            <span>Order</span>
                            <img src={circle} />
                            <img src={flower} />
                        </td>
                        <td>
                            <span>Transit</span>
                            <img src={circle} />
                            <img src={plane} />
                        </td>
                        <td>
                            <span>Delivery</span>
                            <img src={circle} />
                            <img src={location} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <p className={cls.text}>Simple as one two three ...</p>
        </>
    )
}

  
  export default HowWeWork 