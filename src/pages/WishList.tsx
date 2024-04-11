import React from "react";
import { Link } from "react-router-dom";
import WishListItemComponent from "../components/WishListItem";
import {
  selectWishList,
  selectWishListLoading,
} from "../store/wishList/wishListSlicer";
import {
  getWishListAction,
  removeWishListItemAction,
} from "../store/wishList/wishListAction";
import { addToCartAction } from "../store/cart/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import WishList from "../interfaces/WishList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const WishListComponent: React.FC = () => {
  const wishList: WishList = useSelector(selectWishList);
  const loading: boolean = useSelector(selectWishListLoading);
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    dispatch(getWishListAction());
  }, [dispatch]);
  const handleClearRemove = (id: number) => {
    dispatch(removeWishListItemAction(id));
  };
  const handleAddToCart = (id: number) => {
    dispatch(addToCartAction(id));
  };
  if (loading) {
    return <div>loading</div>;
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
            <div className="address-wishlist"></div>
            <div className="row">
              <div className="col-12">
                <form action="#">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className="li-product-remove">
                            remove
                          </TableCell>
                          <TableCell className="li-product-thumbnail">
                            images
                          </TableCell>
                          <TableCell className="cart-product-name">
                            Product
                          </TableCell>
                          <TableCell className="li-product-price">
                            Unit Price
                          </TableCell>
                          <TableCell className="li-product-stock-status">
                            Stock Status
                          </TableCell>
                          <TableCell className="li-product-add-cart">
                            add to cart
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {wishList?.wishlistItems?.map((wishlistItem, index) => {
                          return (
                            <WishListItemComponent
                              key={index}
                              remove={handleClearRemove}
                              add={handleAddToCart}
                              item={wishlistItem}
                            />
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
