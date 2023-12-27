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
import io from "socket.io-client";
import Message from "./message";

const drawerWidth = 240;

let socket;

const Chat = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const handleSendMessage = () => {
    if (message) {
      socket.emit("message", { message, socket_id: users[0].username });
      setMessage(""); 
    }
  };

  useEffect(() => {
    socket = io("http://localhost:8000");
    const fetchData = async () => {
      try {
        const response = await chatService.getUsers();
        setUsers(response.data.data);
      } catch (error) {
        console.log(error.message || "An error occurred while fetching users.");
      }
    };

    fetchData();

    socket.on("connect", () => {
      console.log("hello");
    });
    console.log("socket", socket);
    socket.emit("joined", users);

    
    return () => {
      socket.off("connect");
    };
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleTitle = (name) => {
    console.log(`Clicked ${name}`);
    setTitle(name);
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title ? title : "ChatApp"}
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
            <ListItemButton
              key={index}
              onClick={() => handleTitle(user.username)}
            >
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
        <StyledChatArea>
          <Message />
        </StyledChatArea>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "16px",
          }}
        >
          <StyledTextField
            label="Type your message"
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            style={{ marginRight: "8px" }}
          />

          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
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
