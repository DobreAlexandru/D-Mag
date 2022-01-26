import React from "react";
import { Container, Button, Col } from "react-bootstrap";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  CreditCard2BackFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({
  checkoutToken,
  next,
  back,
  customerData,
  onCaptureCheckout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: customerData.firstName,
          lastname: customerData.secondName,
          email: customerData.email,
        },
        shipping: {
          name: "International",
          street: customerData.address,
          town_city: customerData.city,
          county_state: customerData.region,
          postal_zip_code: customerData.zip,
          country: customerData.country,
        },
        fulfillment: { shipping_method: customerData.option },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      next();
    }
  };
  return (
    <>
      <h1 className="pt-3 pb-3">Payment</h1>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <Col sm={6}>
                <CardElement />
              </Col>

              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                }}
              >
                <Button
                  className="shadow-none"
                  variant="transparent"
                  onClick={back}
                >
                  <ArrowLeftCircleFill size="3em" />
                </Button>
                <Button
                  className="shadow-none"
                  variant="transparent"
                  type="submit"
                  disabled={!stripe}
                >
                  <CreditCard2BackFill size="3em" />
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default Payment;
