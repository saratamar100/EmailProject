import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SendEmailModal from "./SendEmailModal";
const UserLayout = () => {
  const { updateUser } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
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
            sx={{ marginLeft: "auto" }}
            color="inherit"
            onClick={handleOpenModal}
          >
            New Email
          </Button>
          <Button
            sx={{ marginLeft: "auto" }}
            color="inherit"
            onClick={handleLeave}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <SendEmailModal open={openModal} setOpen={setOpenModal} />
      <Outlet />
    </Stack>
  );
};
export default UserLayout;
