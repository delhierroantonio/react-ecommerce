import Product from './Product/Product'
import { Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"

const Products = ({ products }) => {
  return (
    <main>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>The Best Hand Crafted Beer in the market</Typography>
        <Grid container justifyContent='center' justifyItems='center' spacing={2}>
          {products.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Product item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  )
}

export default Products