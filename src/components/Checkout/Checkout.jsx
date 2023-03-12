import { useState, useEffect } from 'react';
import { Paper, Stepper, Step, Typography, CircularProgress, Divider, Button, StepLabel } from '@mui/material'
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import AddressForm from './AddressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
// css
import './checkout.scss'

const Checkout = ({ cart, handleCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState([]);
  const [shippingData, setShippingData] = useState({});
  
  const steps = ['Your Shipping Address', 'Your Payment Details'];

  useEffect(() => {
    if(cart?.id) {
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
    // console.log('cart not loaded');
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

  let Confirmation = () => order.customer ? (  
    <>
      <Typography variant='h4' align='center'>Thanks for your purshase, {order.customer.firstname} {order.customer.lastname} check your email to see your order details</Typography>
      <Divider />
      <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
      <br />
      <Button component={Link} to='/' type='button' variant='outlined'>Back to Home</Button>
    </>
  ) : (
    <div>
      <CircularProgress color='inherit' />
    </div>
  );

  if(error) (
    <>
      <Typography variant='h5'>Error: {error}</Typography>
      <br />
      <Button component={Link} to='/' type='button' variant='outlined'>Back to Home</Button>
    </>
  )

  const Form = () => activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} next={next} />
  : <PaymentForm backStep={backStep} nextStep={nextStep} shippingData={shippingData} checkoutToken={checkoutToken} handleCaptureCheckout={handleCaptureCheckout} />

  return (
    <main className='checkout'>
      <Paper sx={{margin: '0 .8rem'}}>
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