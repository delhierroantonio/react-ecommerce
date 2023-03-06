import { useState } from 'react'
import { Drawer, List, ListItem, ListItemText,IconButton, Divider } from "@mui/material"
import { Link } from "@mui/material"
import { useLocation } from 'react-router-dom'
// icons
import Menu from '@mui/icons-material/Menu'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
// css
import './drawerComponent.scss'


const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  return (
    <>
      <Drawer 
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List className='drawer'>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>Ale</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>Lager</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>Stout</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>Porter</Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>About Us</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>FAQ</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>Contact</Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <div className='drawer__icons'>
            <FacebookIcon />
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <Menu />
      </IconButton>
    </>
  )
}

export default DrawerComponent