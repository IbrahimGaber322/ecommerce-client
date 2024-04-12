import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QueryString from "query-string";

interface QueryParams {
  success?: string;
  canceled?: string;
}

const Payment: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const values = QueryString.parse(location.search) as QueryParams;

    if (values.success) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (values.canceled) {
      console.log("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, [location.search]);

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
      </div>
      <form action="http://localhost:8000/order/checkout" method="POST">
        <button className="checkout-button" type="submit">
          Checkout
        </button>
      </form>
    </section>
  );
};

export default Payment;
