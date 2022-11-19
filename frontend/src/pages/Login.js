import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import useAlert from '../components/Alerts/useAlert';

function Login(props) {
  document.title = "Login - Task Planner";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const snackbar = useAlert()


  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(username, password).then(
      (response) => {
        navigate("/");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        snackbar.showError(resMessage)
      }
    );
  };

  return (
    <Container>
      <Grid container spacing={0} justifyContent="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in to your account
                </Typography>
                <br />
              </Grid>
              <Grid item>
                <form onSubmit={handleLogin}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        label="Email"
                        fullWidth
                        required
                        autoFocus
                        name="username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        label="Password"
                        fullWidth
                        required
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
