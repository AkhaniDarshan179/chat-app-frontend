// index.js
import {
  StyledMain,
  StyledChatArea,
  StyledTextField,
  StyledButton,
} from "./style";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import chatService from "../../services/chat-service";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";

const drawerWidth = 240;

const Chat = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await chatService.getUsers();
        setUsers(response.data.data);
      } catch (error) {
        console.log(error.message || "An error occurred while fetching users.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {users.map((user, index) => (
            <ListItemButton key={index}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} secondary="active" />
              <Brightness1RoundedIcon color="success" fontSize="small" />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <StyledMain>
        <StyledChatArea>{/* Chat messages go here */}</StyledChatArea>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "16px",
          }}
        >
          <StyledTextField
            label="Type your message"
            id="username"
            name="username"
            value={message}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            style={{ marginRight: "8px" }}
          />

          <StyledButton
            variant="contained"
            color="primary"
            style={{ marginBottom: "50px" }}
          >
            Send
          </StyledButton>
        </div>
      </StyledMain>
    </div>
  );
};

export default Chat;
