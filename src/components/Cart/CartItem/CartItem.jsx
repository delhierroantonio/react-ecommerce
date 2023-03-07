import { Typography, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import '../CartItem/cartItem.scss'

const CartItem = ({ item, removeFromCart, updateQty }) => {
  return (
    <Card className="cartItem">
      <CardMedia 
        className="cartItem__media"
        component='img' 
        image={item.image.url} 
        height={160} 
        alt={item.name} 
      
      />
      <CardContent>
        <Typography variant="h4" >{item.name}</Typography>
        <Typography variant="h6" gutterBottom color='textSecondary'>{item.price.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className="cartItem__actions">
        <div className="cartItem__actions--update">
          <Button type="button" variant="contained" size="small" color="info" onClick={() => updateQty(item.id, item.quantity - 1)}>-</Button>
          <Typography>{item.quantity}</Typography> 
          <Button type="button" variant="contained" size="small" color="info" onClick={() => updateQty(item.id, item.quantity + 1)}>+</Button> 
        </div>
          <Button type="button" variant="outlined" color="warning" size="small" onClick={() => removeFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem