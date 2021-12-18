import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FilterWishlist from "../components/Shop/FilterWishlist/FilterWishlist";
import Pagination from "../components/Shop/Pagination/Pagination";
import ShopingCard from "../components/Shop/ShopingCard/ShopingCard";
import Shop from "./Shop";

const Wishlist = () => {
    return(
        <>
            <FilterWishlist />
            <div className="shopingCard-wrap">
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
                <ShopingCard />
            </div>
            <Pagination />
            <Footer />
        </>
    )
}

export default Wishlist