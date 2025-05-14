import {
  AppBar,
  Avatar,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SendEmailModal from "./SendEmailModal";
const UserLayout = () => {
  const { user, updateUser } = useContext(UserContext);
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
          <Button
            color="white"
            onClick={() => {
              navigate("/inbox");
            }}
          >
            Inbox
          </Button>
          <Button
            sx={{ marginLeft: "auto" }}
            color="white"
            onClick={handleOpenModal}
          >
            New Email
          </Button>
          <Button
            sx={{ marginLeft: "auto" }}
            color="white"
            onClick={handleLeave}
          >
            Log Out
          </Button>
          <Avatar>
            {user.firstName &&
              user.lastName &&
              user.firstName[0] + user.lastName[0]}
          </Avatar>
        </Toolbar>
      </AppBar>
      <SendEmailModal open={openModal} setOpen={setOpenModal} />
      <Outlet />
    </Stack>
  );
};
export default UserLayout;
