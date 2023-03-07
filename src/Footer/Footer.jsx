import { Box, Container, Grid, Typography } from "@mui/material"
// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
// css
import './footer.scss'

const Footer = () => {
  return (
    <Box className='container' sx={{marginTop: '2rem'}}>
      <Container maxWidth='lg'>
        <Grid className="footer" container direction='row'>
          <Grid item>
            <Typography className="footer__link" component={Link} to='/'>About</Typography>
          </Grid>
          <Grid item>
            <Typography component={Link} to='/' className="footer__brand" variant="body">Beer Co.<span>{' '}{new Date().getFullYear()}</span></Typography>
          </Grid>
          <Grid item>
            <Typography className="footer__link" component={Link} to='/'>Brands</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer