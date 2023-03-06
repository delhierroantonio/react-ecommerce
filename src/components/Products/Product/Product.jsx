import { Typography, Card, CardMedia, CardContent, CardActions, IconButton, Divider } from "@mui/material"
// icons
import { AspectRatio, ShoppingBag } from "@mui/icons-material"
import FavoriteIcon from '@mui/icons-material/Favorite';
// css
import './product.scss'


const Product = ({ item }) => {
  return (
    <Card className="card" raised >
        <img className="card__img" src={item.image.url} alt={item.name} />
      {/* <CardMedia
        component='img'
        image={item.image.url}
        height='190'
        /> */}
      <CardContent>
        <Typography variant="h5" gutterBottom>{item.name}</Typography>
        <Typography className="card__price" variant="body">{item.price.formatted_with_symbol}</Typography>
        <Typography dangerouslySetInnerHTML={{__html: item.description}} variant="body2" color='textSecondary' />
      </CardContent>
      <CardActions>
        <div>
          <IconButton>
            <FavoriteIcon className="likeIcon" />
          </IconButton>
          <IconButton>
            <ShoppingBag className="addIcon" />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  )
}

export default Product