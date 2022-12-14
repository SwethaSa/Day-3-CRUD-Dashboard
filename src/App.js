import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import {  Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Homepage from "./Home";
import CreateUser from "./Createuser";
const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

   const handleChange = () => {
    navigate("/Createuser");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ color:'#FF4500',background:'#000000', textAlign: "center" }}>
      <Button onClick={handleClick} variant="h6" sx={{ my: 2 
      }}>
        User List
      </Button>
      <Divider />
      
            
             <Button onClick={handleClick} sx={{ textAlign: "center", color:'#FF4500'}} >Dashboard</Button><br></br>
             <Divider />
               <Button onClick={handleChange}  sx={{ textAlign: "center",color:'#FF4500'}} >Create User</Button>
           
          
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ background: '#080808 ' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 5, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            
            sx={{ fontSize:'30px', color: "#FF4500", flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            User List 
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            
              <Button onClick={handleClick}  sx={{ color: "#FF4500",fontSize:'18px', }}>
                Dashboard
              </Button>
              <Button onClick={handleChange}  sx={{ color: "#FF4500", fontSize:'18px', }}>
                Create User
              </Button>
          
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: '#000000'
              
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      
        <Routes>
          <Route path="/" element={<Homepage />} />;
          <Route path="/Createuser" element={<CreateUser />} />;
          <Route path="/Createuser/:id/:isView" element={<CreateUser />} />;

        </Routes>
      </Box>
    </Box>
    
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func
};

export default DrawerAppBar;
