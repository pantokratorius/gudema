import React from "react";
import { Form } from "react-bootstrap";
import "./Filter.scss"
import color from '../../../images/color.png'
import geles from '../../../images/geles.png'
import { useTranslation } from "react-i18next";



const Filter = ({colors, groups, getFlowers, filterParams}) => { 
      
    const { t } = useTranslation();


    const handleSearch = (key, e) =>{ 
        let value =  e.target.value !== '' ? e.target.value : null
        getFlowers( {...filterParams, [key]: value}, null, true  )
    }


    return(
        <div className="filter">
            <Form.Group className="select-group">
                <img src={color} alt="" />
                <Form.Select  onChange={handleSearch.bind(this, 'color')} style={{textTransform:'uppercase'}}> 
                    <option value="">{t('filters.color')}</option>
                    {colors.length && colors.map((item, i)=>(
                        <option key={i} value={item}>{item}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="select-group">
            <img src={geles} alt="" />
                <Form.Select onChange={handleSearch.bind(this, 'groupId')} style={{textTransform:'uppercase'}}>
                    <option value="">{t('filters.flowers')}</option>
                    {groups.length && groups.map((item, i)=>(
                        <option key={i} value={item.id}>{item.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1 search-query">
                        <Form.Control type="text" placeholder={t('filters.search')} 
                            onKeyUp={handleSearch.bind(this, 'search')}
                        />
            </Form.Group>
        </div>
    )
}



  export default Filter