import React from "react";
import CartIcon from "./Icons/CartIcon";
import QuantityButton from "./QuantityButton";
import Product from "../interfaces/Product";
import { FaHeart, FaFacebook, FaTwitter, FaGooglePlus, FaInstagram } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

interface DescriptionProps {
  quant: number;
  addQuant: () => void;
  removeQuant: () => void;
  setOrderedQuant: (quant: number) => void;
  product:Product| null;
}

const Description: React.FC<DescriptionProps> = ({
  quant,
  addQuant,
  removeQuant,
  setOrderedQuant,
  product,
}) => {
  const addToWishlist=()=>{
    alert("addToWishlist")
  }
  const addToHeart=()=>{
    alert("addToHeart")
  }
  const buyNow =()=>{
    alert("buyNow")
  }
  const renderStockStatus = () => {
    if (product) {
      const { stock } = product;
      const stockText = stock > 0 ? "In stock" : "Out of stock";
      const stockColor = stock > 0 ? "rgba(41,98,255,255)" : "rgba(255, 0, 0, 0.5)";
      
      return (
        <div
          className="stock-circle"
          style={{ backgroundColor: stockColor }}
        >
          {stockText}
        </div>
      );
    }
    return null;
  };
  return (
    <section className="description">
    <div className="product-name">
      <h1>{product?.name}</h1>
    </div>
    <div className="category-and-stock">
        <p className="pre">{product?.categoryName}</p>
        {renderStockStatus()}
    </div>
    <p className="desc">{product?.description}</p>
    <div className="price">
      <div className="main-tag">
        <p>{product?.price} $</p>
      </div>
    </div>
    <div className="buttons">
      <QuantityButton onQuant={quant} onRemove={removeQuant} onAdd={addQuant} />
      <button
        className="add-to-cart"
        onClick={() => {
          setOrderedQuant(quant);
        }}
      >
        <CartIcon />
        add to cart
      </button>
    </div>
    <div className="product-additional-info pt-25">
      <a className="wishlist-btn" href="" id="icon-space">
        <FontAwesomeIcon icon={farHeart} className="icon-space" /> Add to wishlist
      </a>
      <div className="product-social-sharing pt-25">
        <ul>
          <li className="facebook">
            <a href="#" className="no-underline"><FaFacebook style={{ marginRight: '8px' }} />Facebook</a>
          </li>
          <li className="instagram">
            <a href="#" className="no-underline"><FaInstagram style={{ marginRight: '8px' }} />Instagram</a>
          </li>
          <li className="twitter">
            <a href="#" className="no-underline"><FaTwitter style={{ marginRight: '8px' }} />Twitter</a>
          </li>
          <li className="google-plus">
            <a href="#" className="no-underline"><FaGooglePlus style={{ marginRight: '8px' }} />Google</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
  );
};

export default Description;
