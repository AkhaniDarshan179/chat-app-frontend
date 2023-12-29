import {
  StyledMain,
  StyledChatArea,
  StyledTextField,
  StyledButton,
} from "./style";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import ChatArea from "./message";
import chatService from "../../services/chat-service";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import io from "socket.io-client";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import messagesService from "../../services/messages-service";
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

let socket;

const Chat = () => {
  const currentUser = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [socketId, setSocketId] = useState(null);
  const [chatUser, setChatUser] = useState(null);

  const handleSendMessage = () => {
    if (message) {
      socket.emit("sendMessage", {
        message,
        sender: currentUser,
        receiver: chatUser._id,
        to: socketId,
      });
      setMessage("");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleLogout = () => {
    const userId = currentUser;
    socket.emit("updateUserStatus", {
      userId,
      status: "Not Active",
    });

    localStorage.clear();
    navigate("/login");
  };

  const handleTitle = async (name, id) => {
    const user1 = id;
    const user2 = currentUser;
    if (user1 && user2) {
      const response = await messagesService.getMessages({
        user1,
        user2,
      });
      setAllMessages(response.data);
    }

    setTitle(name);
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

    const userId = currentUser;

    socket.emit("save_socket_id", {
      userId,
    });

    socket.on("sendMessage", (data) => {
      setAllMessages((prevAllMessages) => [...prevAllMessages, data]);
    });

    socket.on("messageReceived", (data) => {
      setAllMessages((prevAllMessages) => [...prevAllMessages, data]);
    });

    socket.on("user_updates", (data) => {
      fetchData();
    });

    fetchData();

    return () => {
      socket.off("disconnect");
    };
  }, []);

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
              onClick={() => {
                handleTitle(user.username, user._id);
                setSocketId(user.socketId);
                setChatUser(user);
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} secondary={user.status} />
              {user.status === "Active" ? (
                <Brightness1RoundedIcon color="success" fontSize="small" />
              ) : (
                <Brightness1RoundedIcon fontSize="small" />
              )}
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <StyledMain>
        <StyledChatArea>
          <ChatArea messages={allMessages} currentUser={currentUser} />
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
