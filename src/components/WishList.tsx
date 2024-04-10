import React from "react";
import { Link } from "react-router-dom";
import WishListInterface from '../interfaces/WishList'
import Product from "../interfaces/Product";
import ClearIcon from '@mui/icons-material/Clear';
import WishListItem from "../interfaces/WishListItem";
import {selectWishList,selectWishListLoading} from "../store/wishList/wishListSlicer"
import {getWishListAction, removeWishListItemAction} from "../store/wishList/wishListAction"
import { addToCartAction } from "../store/cart/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Console } from "console";
import WishList from "../interfaces/WishList";
const WishListComponent: React.FC = () => {

    const wishList: WishList = useSelector(selectWishList);
    const loading : boolean = useSelector(selectWishListLoading);
    console.log(wishList)
    const dispatch: Dispatch<any> = useDispatch();

    React.useEffect(()=>{
        dispatch(getWishListAction());
        console.log(wishList)
    },[])
    const handleClearRemove = (id:number) => {
        dispatch(removeWishListItemAction(id))
      };
    const handleAddToCart = (id:number) => {
        dispatch(addToCartAction(id));
      };
    if(loading){
        return <div>loading</div>
    }

    return (
        <div className="cart-container">
            <h2>Shopping WishList</h2>
            {wishList?.wishlistItems?.length === 0 ? (
                <div className="cart-empty">
                    <p>Your WishList is currently empty</p>
                    <div className="start-shopping">
                        <Link to="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="wishlist-area pt-60 pb-60">
                    <div className="container">
                        <div className="address-wishlist">
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form action="#">
                                    <div className="table-content table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="li-product-remove">remove</th>
                                                    <th className="li-product-thumbnail">images</th>
                                                    <th className="cart-product-name">Product</th>
                                                    <th className="li-product-price">Unit Price</th>
                                                    <th className="li-product-stock-status">Stock Status</th>
                                                    <th className="li-product-add-cart">add to cart</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {wishList?.wishlistItems?.map((wishlistItem, index) => (
                                                    <tr key={index}>
                                                        <td className="li-product-remove"><a href="#"><ClearIcon onClick={() => handleClearRemove(wishlistItem?.id)}/></a></td>
                                                        <td className="li-product-thumbnail">
                                                            <a href="#">
                                                                <img src={wishlistItem?.image} alt="dd" style={{ width: '200px', height: '200px' }}/>
                                                            </a>
                                                        </td>
                                                        <td className="li-product-name">
                                                            <a href="#">{wishlistItem?.product?.name}</a>
                                                        </td>
                                                        <td className="li-product-price">
                                                            <span className="amount">${wishlistItem?.product?.price}</span>
                                                        </td>
                                                        <td className="li-product-stock-status">
                                                            <span className={wishlistItem?.product?.stock > 0 ? 'in-stock' : 'out-stock'}>
                                                                {wishlistItem?.product?.stock > 0 ? 'in stock' : 'out of stock'}
                                                            </span>
                                                        </td>
                                                        <td className="li-product-add-cart">
                                                          <button onClick={() => handleAddToCart(wishlistItem?.product?.id)}>add to cart</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishListComponent;