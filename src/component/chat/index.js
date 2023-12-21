import React from "react";
import { styled } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
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
        <List>
          <ListItem button>Contact 1</ListItem>
          <ListItem button>Contact 2</ListItem>
          {/* Add more contacts as needed */}
        </List>
      </Drawer>

      {/* Chat Area */}
      <StyledMain>
        <StyledChatArea>
          {/* Chat messages go here */}
        </StyledChatArea>

        {/* Text Field for Typing Message */}
        <StyledTextField
          label="Type your message"
          variant="outlined"
          fullWidth
        />

        {/* Send Button */}
        <StyledButton variant="contained" color="primary">
          Send
        </StyledButton>
      </StyledMain>
    </div>
  );
};

export default Chat;
