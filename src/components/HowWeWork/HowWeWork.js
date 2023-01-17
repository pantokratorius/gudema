import React from "react";
import cls from './HowWeWork.module.scss'
import circle from '../../images/circle.png'
import flower from '../../images/flower.png'
import plane from '../../images/plane.png'
import location from '../../images/location.png'
import { useTranslation } from "react-i18next";

  const HowWeWork = props => {

    const { t } = useTranslation();

    return(
        <>
            <table className={cls.box}>
                <tbody>
                    <tr>
                        <td>
                            <span>{t('howWeDo.order')}</span>
                            <img src={circle} />
                            <img src={flower} />
                        </td>
                        <td>
                            <span>{t('howWeDo.transit')}</span>
                            <img src={circle} />
                            <img src={plane} />
                        </td>
                        <td>
                            <span>{t('howWeDo.delivery')}</span>
                            <img src={circle} />
                            <img src={location} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <p className={cls.text}>{t('howWeDo.simple')}</p>
        </>
    )
}

  
  export default HowWeWork 