import React from "react";
import CartIcon from "./Icons/CartIcon";
import QuantityButton from "./QuantityButton";

interface DescriptionProps {
  quant: number;
  addQuant: () => void;
  removeQuant: () => void;
  setOrderedQuant: (quant: number) => void;
}

const Description: React.FC<DescriptionProps> = ({
  quant,
  addQuant,
  removeQuant,
  setOrderedQuant,
}) => {
  return (
    <section className="description">
      <p className="pre">sneaker company</p>
      <h1>fall limited edition sneakers</h1>
      <p className="desc">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they’ll withstand everything the
        weather can offer
      </p>
      <div className="price">
        <div className="main-tag">
          <p>$125.00</p>
          <p>50%</p>
        </div>
        <s>$250.00</s>
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
    </section>
  );
};

export default Description;
