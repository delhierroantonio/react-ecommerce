import { useState } from 'react'
import { Drawer, List, ListItem, ListItemText,IconButton } from "@mui/material"
import { Link } from "@mui/material"
import { useLocation } from 'react-router-dom'
// icons
import Menu from '@mui/icons-material/Menu'
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
              <Link to='/'>Featured</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>Trending</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to='/'>Deals Now</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <Menu />
      </IconButton>
    </>
  )
}

export default DrawerComponent