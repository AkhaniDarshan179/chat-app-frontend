import {
  StyledMain,
  StyledChatArea,
  StyledTextField,
  StyledButton,
} from "./style";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import messagesService from "../../services/messages-service";

const drawerWidth = 240;

let socket;

const Chat = () => {
  // const history = useHistory();
  const currentUser = localStorage.getItem("user");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [socketId, setSocketId] = useState(null);

  // const [searchParams, setSearchParams] = useSearchParams();

  const handleSendMessage = () => {
    if (message) {
      socket.emit("sendMessage", { message, currentUser, to: socketId });
      setMessage("");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleTitle = (name) => {
    // const user1 = 'Darshan'; // replace with actual user1
    // const user2 = name; // replace with actual user2

    // // Set or update query parameters
    // setSearchParams({
    //   user1,
    //   user2,
    // });
    // console.log(`Clicked ${name}`);

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

    const userId= localStorage.getItem("userId");

    socket.emit("save_socket_id", {
      userId
    });

     socket.on("messageReceived", (data) => {
        setAllMessages(data)
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
                handleTitle(user.username);
                setSocketId(user.socketId)
              }}
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
          <ChatArea messages={allMessages} />
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
