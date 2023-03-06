import { Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"
// icons
import SportsBarIcon from '@mui/icons-material/SportsBar';
// css
import './cart.scss'


const Cart = () => {
  return (
    <Container className="cart" sx={{height: '90vh'}}>
      <Typography className="cart__title" variant="h5" align="center" color='textSecondary'>
        Your shopping cart is empty {' '}
        <Link className="cart__title--empty" to='/'>
          Start shopping now
          <SportsBarIcon className="beer-icon" />
        </Link>
      </Typography>
    </Container>
  )
}

export default Cart