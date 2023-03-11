import { useState, useEffect } from 'react';
import { Paper, Stepper, Step, Typography, CircularProgress, Divider, Button, StepLabel } from '@mui/material'
import { commerce } from '../../lib/commerce';
import AddressForm from './AddressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
// import AddressForm from '../AddressForm'
// import PaymentForm from '../PaymentForm'
// import { commerce } from '../../../lib/commerce'

const Checkout = ({ cart, handleCaptureCheckout, order }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState([]);
  const [shippingData, setShippingData] = useState({});
  
  const steps = ['Your Shipping Address', 'Your Payment Details'];

  useEffect(() => {
    if(cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          setCheckoutToken(token);
          // console.log(token);
        } catch (error) {
          console.log(`Tu error: ${error}`);
        }
      }
      generateToken();
    }
  }, [cart]);

  const backStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  }

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  }

  const next = (data) => {
    console.log(data);
    setShippingData(data);
    nextStep();
  }

  const Confirmation = () => (  
    <Typography variant='h4' align='center'>Thanks for your purshase, check your email to see your order details</Typography>
  )

  const Form = () => activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} next={next} />
  : <PaymentForm backStep={backStep} nextStep={nextStep} shippingData={shippingData} checkoutToken={checkoutToken} handleCaptureCheckout={handleCaptureCheckout} />

  return (
    <main>
      <Paper>
        <Typography variant='h4' align='center' gutterBottom>Checkout</Typography>
        <Stepper activeStep={0}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
      </Paper>
    </main>
  )
}

export default Checkout