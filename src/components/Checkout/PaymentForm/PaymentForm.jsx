import { loadStripe } from "@stripe/stripe-js"
import { Typography, Button, Divider } from "@mui/material"
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js"

import { commerce } from "../../../lib/commerce"
import Review from '../Review/Review'
import { useEffect } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);


const PaymentForm = ({ checkoutToken, backStep, nextStep, handleCaptureCheckout, shippingData }) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('Error =======>', error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: shippingData.firstName + ' ' + shippingData.lastName,
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption,
        },
        billing: {
          name: shippingData.firstName + ' ' + shippingData.lastName,
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  useEffect(() => {
    console.log(shippingData);
  }, []);


  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <div style={{margin: '1rem'}}>
        <Typography variant="h6" gutterBottom align="center">Payment Method</Typography>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', padding: '2rem 0'}}>
                  <Button type="button" variant="outlined" onClick={backStep}>Back</Button>
                  <Button type="submit" variant="contained">Pay Now ${checkoutToken.subtotal.formatted_with_code}</Button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </>
  )
}

export default PaymentForm