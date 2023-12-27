import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const StyledMain = styled("main")(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Set minimum height to fill the viewport
  marginTop: theme.spacing(8), // Adjusted spacing to account for the app bar
  background: "white", // Set background color
}));

export const StyledChatArea = styled("div")(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing(3),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  position: "sticky",
  top: 0,
  zIndex: 1, // Ensure it's above other elements
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  position: "sticky",
  top: 0,
  zIndex: 1, // Ensure it's above other elements
}));
