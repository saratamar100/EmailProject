import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [firtstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerificaton, setPasswordVerificaton] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateData = () => {
    if (
      !firtstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordVerificaton.trim()
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== passwordVerificaton) {
      setErrorMessage("The passwords do not match.");
      return false;
    }
    return true;
  };
  const handleSignup = async () => {
    const isValid = validateData();
    if (!isValid) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify({
          firtstName: firtstName.trim(),
          lastName: lastName.trim(),
          password: password.trim(),
          email: email.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 400) {
        setErrorMessage("The email address already exists in the system.");
        return;
      }
      if (!response.ok) {
        setErrorMessage("An error occurred. Try again.");
        return;
      }
      alert("The user has successfully registered.");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLogin = () => {
    navigate("/login");
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
      <Card
        sx={{
          maxWidth: 500,
          minHeight: 400,
          p: 4,
          boxShadow: 5,
          borderRadius: 4,
        }}
      >
        <Stack
          gap={2}
          maxWidth="50%"
          mx="auto"
          mt={2}
          textAlign="center"
          alignItems="center"
        >
          <Button
            onClick={handleLogin}
            sx={{ color: "black", alignSelf: "start" }}
          >
            <UndoIcon />
          </Button>

          <Typography
            variant="h4"
            sx={{ fontFamily: "Rubik" }}
            textAlign="center"
          >
            Sign-Up
          </Typography>
          <Stack direction="row" gap={2}>
            <TextField
              id="firstname"
              label="First Name"
              value={firtstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First Name"
              sx={{ width: "70%", bgcolor: "white" }}
            />
            <TextField
              id="lastname"
              label="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last Name"
              sx={{ width: "70%", bgcolor: "white" }}
            />
          </Stack>
          <TextField
            id="email"
            label="Email"
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            sx={{ width: "100%", bgcolor: "white" }}
          />
          <TextField
            id="password"
            label="Password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            sx={{ width: "100%", bgcolor: "white" }}
          />
          <TextField
            id="passwordVerification"
            label="Password Verification"
            value={passwordVerificaton}
            type="password"
            onChange={(e) => {
              setPasswordVerificaton(e.target.value);
            }}
            placeholder="Password Verification"
            sx={{ width: "100%", bgcolor: "white" }}
          />
          <Typography
            mt={1}
            color="error"
            sx={{ visibility: errorMessage ? "visible" : "hidden" }}
          >
            {errorMessage || "error"}
          </Typography>

          <Button
            variant="contained"
            sx={{ borderRadius: 5 }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};
export default SignupPage;
