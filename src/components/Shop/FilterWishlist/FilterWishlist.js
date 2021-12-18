import React from "react";
import { Form } from "react-bootstrap";
import "./FilterWishlist.scss"



const FilterWishlist = () => { 
    return(
        <div className="wishlist-filter">
            <Form.Group className="select-group">
                <Form.Select>
                    <option>RIKIUOTI PAGAL</option>
                    <option value="1">Žalia</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
        </div>
    )
}



  export default FilterWishlist