import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { UserContext } from "./UserProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SendEmailModal({ open, setOpen }) {
  const { user } = useContext(UserContext);
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const resetData = () => {
    setReceiver("");
    setSubject("");
    setBody("");
  };
  const handleClose = async () => {
    try {
      const response = await fetch(`http://localhost:3001/drafts/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ sender: user.email, receiver, subject, body }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setOpen(false);
    resetData();
  };
  const handleCancel = () => {
    setOpen(false);
    resetData();
  };
  const handleSend = async () => {
    try {
      const response = await fetch(`http://localhost:3001/emails/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          sender: user.email.trim(),
          receiver: receiver.trim(),
          subject: subject.trim(),
          body: body.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setOpen(false);
    resetData();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} gap={1}>
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={handleSend}>Send</Button>
            <Box>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Box>
          </Stack>
          <TextField
            id="receiver"
            label="receiver"
            type="email"
            value={receiver}
            onChange={(e) => {
              setReceiver(e.target.value);
            }}
            placeholder="receiver"
          />
          <TextField
            id="subject"
            label="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            placeholder="Enter a subject"
          />
          <TextField
            id="body"
            label="body"
            value={body}
            multiline
            rows={4}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </Stack>
      </Modal>
    </div>
  );
}
