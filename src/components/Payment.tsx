import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { checkoutOrderAction, fetchOrders } from "../store/order/orderActions";
// import QueryString from "query-string";

interface QueryParams {
  success?: string;
  canceled?: string;
}

const Payment: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   const values = QueryString.parse(location.search) as QueryParams;

  //   if (values.success) {
  //     console.log("Order placed! You will receive an email confirmation.");
  //   }

  //   if (values.canceled) {
  //     console.log("Order canceled -- continue to shop around and checkout when you're ready.");
  //   }
  // }, [location.search]);
  const handleFormSubmit = () => {
    dispatch(checkoutOrderAction())
  }
  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
        <button className="checkout-button" onClick={() => handleFormSubmit()}>
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Payment;
