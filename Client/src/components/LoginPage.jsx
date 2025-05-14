import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user, updateUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
      if (response.status === 401)
        return setErrorMessage("email or password is incorrect.");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //const { token } = data;
      //if (token) {
      //updateToken(token);
      updateUser({
        email,
        //userDetails: data,
      });
      navigate("/supplier");
      //}
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "rgba(128, 128, 128, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 400, minHeight: 400, p: 5, boxShadow:5 , borderRadius:4}}>
        <Stack gap={1} sx={{ alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontFamily: "Rubik" }}>
            Welcome
          </Typography>
          <TextField
            id="email"
            label="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email"
            sx={{ bgcolor: "aliceblue" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            sx={{ bgcolor: "aliceblue" }}
          />
          <Stack direction="row" gap={1}>
            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{ borderRadius: 5 }}
            >
              Login
            </Button>
            <Typography fontSize={30}>/</Typography>
            <Button
              onClick={handleSignup}
              variant="contained"
              sx={{ borderRadius: 5 }}
            >
              Sign up
            </Button>
          </Stack>
          <Typography color="error">{errorMessage}</Typography>
        </Stack>
      </Card>
    </Box>
  );
};
export default LoginPage;
