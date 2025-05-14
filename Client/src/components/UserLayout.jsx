import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
const UserLayout = () => {
  const {  updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLeave = () => {
    updateUser(null);
    //updateToken(null); 
    navigate("/");
  };

  return (
    <Stack
      flexDirection="column"
      sx={{
        minHeight: "100vh",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ m: 3 }}>
            <Link to="inbox">Inbox</Link>
          </Typography>
          <Button
            color="inherit"
            onClick={handleLeave}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
};
export default UserLayout;
