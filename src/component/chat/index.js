import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import chatService from "../../services/chat-service";
import Drawer from "@mui/material/Drawer";
import ImageIcon from "@mui/icons-material/Image";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

const drawerWidth = 240;

const StyledMain = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
}));

const StyledChatArea = styled("div")(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const Chat = () => {
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

  return (
    <div style={{ display: "flex" }}>
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
              <ListItemText primary={user.username} secondary="Jan 9, 2014" />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <StyledMain>
        <StyledChatArea>{/* Chat messages go here */}</StyledChatArea>

        <StyledTextField
          label="Type your message"
          id="username"
          name="username"
          value={message}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />

        <StyledButton variant="contained" color="primary">
          Send
        </StyledButton>
      </StyledMain>
    </div>
  );
};

export default Chat;
