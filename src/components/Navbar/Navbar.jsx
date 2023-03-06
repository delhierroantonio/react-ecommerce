import { AppBar, Toolbar, Typography, useMediaQuery, IconButton, Badge, CssBaseline } from "@mui/material"
import { Link } from "react-router-dom"
// icons
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
          <Typography color='textSecondary' variant="body">Beer Co.</Typography>
        </Link>
        {/* right */}
        <div className="toolbar__right">
          <IconButton>
            <FavoriteIcon color="textSecondary" />
          </IconButton>
          <IconButton>
            <Badge 
              className="toolbar__cart" 
              component={Link} 
              to='/cart' 
              sx={{"& .MuiBadge-badge": {color: 'white', backgroundColor: '#79caee'}}}
              badgeContent={2}>
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