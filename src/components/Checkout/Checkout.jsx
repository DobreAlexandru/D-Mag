import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container, Button } from "react-bootstrap";
import Payment from "./Payment";
import { commerce } from "../../lib/Commerce";
import Review from "./Review";
import Shipping from "./Shipping";
import ConfirmationScreen from "./ConfirmationScreen";

const Checkout = ({ cart, onCaptureCheckout }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [step, setStep] = useState(1);
  const [customerData, setCustomerData] = useState({});

  const next = () => setStep((prevActiveStep) => prevActiveStep + 1);
  const back = () => setStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  if (!checkoutToken)
    return (
      <div class="spinner d-flex justify-content-center">
        <div class="spinner-border mt-5 white" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );
  return (
    <Container>
      {step === 1 && checkoutToken && (
        <Shipping
          checkoutToken={checkoutToken}
          next={next}
          setCustomerData={setCustomerData}
        />
      )}
      {step === 2 && checkoutToken && (
        <Container className="checkout-box">
          <Review checkoutToken={checkoutToken} next={next} back={back} />
          <Payment
            checkoutToken={checkoutToken}
            next={next}
            back={back}
            customerData={customerData}
            onCaptureCheckout={onCaptureCheckout}
          />
        </Container>
      )}
      {step === 3 && checkoutToken && (
        <ConfirmationScreen customerData={customerData} />
      )}
    </Container>
  );
};

export default Checkout;
