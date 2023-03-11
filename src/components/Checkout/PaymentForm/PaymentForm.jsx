import { loadStripe } from "@stripe/stripe-js"
import { Typography, Button, Divider } from "@mui/material"
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js"

const PaymentForm = ({ checkoutToken, backStep, nextStep, handleCaptureCheckout, shippingData }) => {
  return (
    <div>PaymentForm</div>
  )
}

export default PaymentForm