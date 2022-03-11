import React, { useEffect } from "react";
import CarouselComponent from "../components/Carousel/Carousel";
import Footer from "../components/Footer/Footer";
import Filter from "../components/Shop/FIlter/Filter";
import Pagination from "../components/Shop/Pagination/Pagination";
import ShopingCard from "../components/Shop/ShopingCard/ShopingCard";
import ShoppingCardPopup from "../components/Shop/ShoppingCardPopup/ShoppingCardPopup";
import * as shopactions from '../actions/shop'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Preloader from "../components/Preloader/Preloader";
import { useTranslation } from "react-i18next";
import InfiniteScroll from 'react-infinite-scroll-component';


const Shop = props => {

  const { t } = useTranslation()

  document.title = "Gudema e-shop";


  useEffect(() => {
    const { getFlowers, getColors, getGroups } = props;
    getFlowers({...props.filterParams, size: 5, page: 0 })
    getColors()
    getGroups()
    props.getContent('home')
    return () => {
      props.changeReady(false)
    }
  }, [])


  const getNext = () => {
    props.getFlowers({...props.filterParams, size: 5, page: Number(props.pageNumber) + 1 })
  }

  return (
    <>
      {!props.isReady
        ?
        <Preloader />
        :
        <CarouselComponent images={props.content} />
      }
      <Filter colors={props.colors}
        groups={props.groups}
        filterParams={props.filterParams}
        getFlowers={props.getFlowers}
      />
 

      {props.opened
        ? <ShoppingCardPopup {...props.card} />
        : null
      }

      <InfiniteScroll
        dataLength={props.flowers.length}
        next={getNext}
        hasMore={Math.ceil(props.itemsTotal / 5) > Number(props.pageNumber) + 1}
        loader={<h4>{t('loading')}</h4>}
        endMessage={''}

      >
        {props.flowers && props.flowers.length ?
          <div className="shopingCard-wrap">
            {props.flowers
              .map((fl, i) => {
                return (
                  <ShopingCard key={i} {...fl} />
                )
              })}
          </div>
          : null}
      </InfiniteScroll>
      {/* <Pagination 
                  getFlowers={props.getFlowers} 
                  page={props.page} 
                  pages={props.pages} 
                  setPage={props.setPage} 
                  setLimitOffset={props.setLimitOffset}  
                  data={props.flowers} 
                  setPages={props.setPages} 
                  filterParams={props.filterParams}
                /> */}
      <Footer hr={true} />
    </>
  )
}

const mapStateToProps = state => ({
  flowers: state.flowers.items,
  opened: state.shop.visible,
  card: state.shop.card,
  perPage: state.shop.perPage,
  page: state.shop.page,
  totalPages: state.shop.totalPages,
  pageNumber: state.shop.pageNumber,
  pages: state.shop.pages,
  isReady: state.shop.isReady,
  itemsTotal: state.shop.itemsTotal,
  filterParams: state.shop.filterParams,
  colors: state.shop.colors,
  groups: state.shop.groups,
  content: state.shop.content
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(shopactions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shop);