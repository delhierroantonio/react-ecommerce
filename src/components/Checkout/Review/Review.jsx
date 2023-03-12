import { Typography, List, ListItem, ListItemText } from '@mui/material'
// css
import './review.scss'

const Review = ({ checkoutToken }) => {
  console.log(checkoutToken);
  return (
    <div className='review'>
      <Typography variant='h6' gutterBottom>Order Summary</Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem key={product.id}>
            <img className='review_img' src={product.image.url} />
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1'>${checkoutToken.subtotal.formatted_with_code}</Typography>
        </ListItem>
      </List>

    </div>
  )
}

export default Review