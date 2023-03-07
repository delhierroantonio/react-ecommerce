import CartItem from "./CartItem/CartItem";
import { CircularProgress, Grid, Container, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import Spinner from "../Spinner/Spinner";
// icons
import SportsBarIcon from '@mui/icons-material/SportsBar';
// css
import './cart.scss'


const Cart = ({ cart, removeFromCart, updateQty, emptyCart }) => {

  const EmptyCart = () => (  
    <Typography variant="h6" align="center" color='textSecondary' gutterBottom>
      Your shopping cart is empty,{' '}
      <Link className="empty__link" to='/'>Start shopping now</Link>
    </Typography>
  )

  const FilledCart = () => (  
    <>
      <Grid container spacing={4}>
        {cart.line_items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <CartItem 
              item={item} 
              removeFromCart={removeFromCart} 
              updateQty={updateQty} 
            />
          </Grid>
        ))}
      </Grid>
      <Container sx={{margin: '2rem 0'}}>
        <Typography variant="h5" gutterBottom color='textSecondary'>Subtotal: ${cart.subtotal.formatted_with_code}</Typography>
        <div style={{display: 'flex', gap: '2rem'}}>
          <Button type="button" variant="contained" size="large" color="inherit" onClick={emptyCart}>Empty Cart</Button>
          <Button className="checkout__button" type="button" component={Link} to='/checkout' variant="contained" size="large">Checkout</Button>
        </div>
      </Container>
    </>
  )

  if(!cart.line_items) return (  
    <>
      <Spinner />
    </>
    )

  return (
    <Container className="cart">
      <Typography variant="h4" align="center" gutterBottom>Your shopping cart</Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart