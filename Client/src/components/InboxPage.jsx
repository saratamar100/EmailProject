import { Stack } from "@mui/material";
import EmailsList from "./EmailsList";
import EmailView from "./EmailView";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";

const InboxPage = () => {
  const { user, updateUser } = useContext(UserContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState();
  const selectedEmail = emails.find((e) => e.id === selectedEmailId);
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/emails/inbox/" + user.email
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEmails();
  }, [user]);

  return (
    <Stack direction="row">
      <EmailsList
        emails={emails}
        selectedId={selectedEmailId}
        onSelectEmail={(id) => {
          setSelectedEmailId(id);
        }}
      />
      <EmailView {...selectedEmail} />
    </Stack>
  );
};
export default InboxPage;
