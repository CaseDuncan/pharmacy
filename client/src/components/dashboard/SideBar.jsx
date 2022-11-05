import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import Products from '../products/Products';
import { useNavigate } from 'react-router-dom'
import Category from '../category/Category'
import TestCat from '../category/TestCat';
import Categories from '../category/Categories';

const drawerWidth = 240;

const SideBar = () => {

  let navigate = useNavigate()
  const menuItems = [
    {
      text: "Products",
      route: "/products",
      icon:<Inventory2OutlinedIcon />
    },
    {
      text: "Customers",
      route: "/customers",
      icon:<AccountCircleOutlinedIcon/>
    },
    {
      text: "Orders",
      route: "/orders",
      icon:<ShoppingCartCheckoutOutlinedIcon/>
    },
    {
      text: "Analytics",
      route: "/analytics",
      icon:<TimelineOutlinedIcon/>
    }
  ]
  return (
      <div>
           <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              her
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Typography>
            Dashboard
        </Typography>
        <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={()=>navigate(item.route)}
                button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            ))}
          </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
          <Products />
          <Category />
          <Categories/>
        
      </Box>
    </Box>
    </div>
  )
}

export default SideBar