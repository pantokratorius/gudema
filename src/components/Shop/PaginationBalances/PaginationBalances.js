import React from "react";
import { Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./PaginationBalances.scss"
import { useTranslation } from "react-i18next";



const PaginationBalances = ({pagesBalance, data,  getBalance, filterParamsBalance}) => {
    
  const { t } = useTranslation();
    
   const pageHandler = event => {
    getBalance( {...filterParamsBalance, page: event.selected}  )
    }
    
    const onChangeHandleBalance = (data,e) => {
        getBalance( {...filterParamsBalance, size: e.target.value}, document.querySelector('.pageNum li:nth-child(2) a') )
        
       }
  

    return(
        <div className="pagination">
        <div></div>
        {
        pagesBalance > 1
            ? <ReactPaginate 
                previousLabel={'‹'} 
                nextLabel={'›'}
                pageCount={pagesBalance}
                marginPagesDisplayed={2}
                onPageChange={pageHandler}
                containerClassName={'pageNum'}
                activeClassName={'active'}
            />
            : null 
        }
        <div className="filter-pagin">
        <span>{t('filters.show')}</span>
            <Form.Select onChange={onChangeHandleBalance.bind(this,data)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Form.Select>
        </div>
    </div>
    )
}



  export default PaginationBalances 
 
 