import { AppBar, Toolbar, Typography, useMediaQuery, IconButton, Badge, CssBaseline } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
// icons
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';

import DrawerComponent from "../DrawerComponent/DrawerComponent";
// css
import '../Navbar/navbar.scss'

const Navbar = ({ totalItems }) => {
  const location = useLocation();
  return (
    <AppBar className="appbar" position="sticky" color="inherit">
      <CssBaseline />
      <Toolbar className="toolbar">
        <Link className="toolbar__logo" to='/'>
          <Typography color='textSecondary' variant="body">Beer Co.</Typography>
        </Link>
        <div className="toolbar__right">
          <IconButton>
            <FavoriteIcon color="textSecondary" />
          </IconButton>
          {location.pathname !== '/cart' && (
            <IconButton>
              <Badge
                className="toolbar__cart"
                component={Link}
                to='/cart'
                sx={{ "& .MuiBadge-badge": { color: 'white', backgroundColor: '#79caee' } }}
                badgeContent={totalItems}>
                <ShoppingCartRoundedIcon color="textSecondary" />
              </Badge>
            </IconButton>
          )}
          <DrawerComponent />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar