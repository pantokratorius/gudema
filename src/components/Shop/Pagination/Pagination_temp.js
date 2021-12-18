import React from "react";
import { Form } from "react-bootstrap";
import "./Pagination.scss"



const Pagination = () => { 
    return(
        <div className="pagination">
            <div></div>
            <div className="pageNum">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
            </div>
            <div className="filter-pagin">
            <Form.Select>
                    <option>Rodyti po</option>
                    <option value="1">Žalia</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </div>
        </div>
    )
}



  export default Pagination