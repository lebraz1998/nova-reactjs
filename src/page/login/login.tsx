import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setLogin } from "../../redux/loginSlice";
import LoginServices from "../../services/login.services";

export default function LoginComponent() {
  const dispatch = useDispatch(),
    loginServices = useMemo(() => new LoginServices(), []),
    [show, setShow] = useState(false),
    { replace } = useHistory(),
    [login, setlogin] = useState<{ username: string; password: string }>({
      username: "",
      password: "",
    }),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(false),
    handleInput = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setlogin((prev) => ({ ...prev, [`${e.target.name}`]: e.target.value }));
      },
      [],
    );

  return (
    <React.Fragment>
      {" "}
      {loading ? <LinearProgress /> : <></>}{" "}
      <Container maxWidth="xs">
        <Card>
          <Typography fontSize="30px" textAlign="center">
            Nova-Lab Login
          </Typography>

          <CardContent>
            <TextField
              onChange={handleInput}
              name="username"
              id="outlined-basic"
              fullWidth
              label="Username"
              variant="outlined"
            />
            <div style={{ marginTop: 10 }}></div>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={show ? "text" : "password"}
                onChange={handleInput}
                name="password"
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShow(!show)}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              disabled={
                loading || login.username === "" || login.password === ""
              }
              variant="contained"
              fullWidth
              style={{ marginTop: 10 }}
              onClick={() => {
                setError(false);
                setLoading(true);
                loginServices
                  .login(login)
                  .then((res) => {
                    setLoading(false);
                    dispatch(setLogin({ username: login.username }));
                    replace("/");
                  })
                  .catch((res) => {
                    setError(true);
                    setLoading(false);
                  });
              }}
            >
              Login
            </Button>
            {error ? (
              <Typography align="center" fontSize={18} color="red">
                Wrong username or password
              </Typography>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}
