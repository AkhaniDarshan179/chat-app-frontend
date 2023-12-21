import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import loginImage from "../../images/login.jpg";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import registerService from "../../services/register-service";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://www.simbanic.com/">
        Simbanic Services
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reqbody = {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      };
      const response = await registerService.register(reqbody);
      if (response.data.success === true) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                label="Username"
                id="username"
                name="username"
                value={registerData.username}
                onChange={handleChange}
                autoComplete="username"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
              <TextField
                label="Email Address"
                id="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                autoComplete="email"
                autoFocus
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                id="password"
                value={registerData.password}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
