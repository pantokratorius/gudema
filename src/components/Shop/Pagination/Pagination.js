import React from "react";
import { Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./Pagination.scss"
import { useTranslation } from "react-i18next";



const Pagination = ({pages, data, getFlowers, filterParams}) => {console.log(filterParams)

    
  const { t } = useTranslation();
    
   const pageHandler = event => {
        getFlowers( {...filterParams, page: event.selected}  )
    }
    
    const onChangeHandle = (data,e) => {
        getFlowers( {...filterParams, size: e.target.value, page: 0}  )
    }

    return(
        <div className="pagination">
            <div></div>
            {
            pages > 1
                ? <ReactPaginate 
                    previousLabel={'‹'}
                    nextLabel={'›'}
                    pageCount={pages}
                    marginPagesDisplayed={2}
                    onPageChange={pageHandler}
                    containerClassName={'pageNum'}
                    activeClassName={'active'}
                />
                : null 
            }
            <div className="filter-pagin">
            <span>{t('filters.show')}</span>
                <Form.Select onChange={onChangeHandle.bind(this,data)}>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </Form.Select>
            </div>
        </div>
    )
}



  export default Pagination 
 
 