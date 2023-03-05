import { AppBar, Toolbar, Typography, useMediaQuery, IconButton, Badge, CssBaseline } from "@mui/material"
import { Link } from "react-router-dom"
// icons
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import MenuIcon from '@mui/icons-material/Menu';

import DrawerComponent from "../DrawerComponent/DrawerComponent";
// css
import '../Navbar/navbar.scss'

const Navbar = () => {
  // const isMobile = useMediaQuery("md");
  return (
    <AppBar className="appbar" position="static" color="inherit">
      <CssBaseline />
      <Toolbar className="toolbar">
        {/* left */}
        {/* <IconButton>
          <MenuIcon />
        </IconButton> */}
        {/* middle */}
        <Link className="toolbar__logo" to='/'>
          <Typography color='textSecondary' variant="body">Headless Ecommerce</Typography>
        </Link>
        {/* right */}
        <div className="toolbar__right">
          <IconButton>
            <Badge className="toolbar__cart" badgeContent={2} color='info' component={Link} to='/cart'>
              <ShoppingCartRoundedIcon color="textSecondary" />
            </Badge>
          </IconButton>
            <DrawerComponent />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar