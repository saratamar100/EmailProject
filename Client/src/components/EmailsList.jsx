import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const EmailsList = ({ emails, onSelectEmail, selectedId }) => {
  return (
    <List>
      {emails.map((e) => (
        <ListItemButton
          key={e.id}
          onClick={() => onSelectEmail(e.id)}
          selected={selectedId === e.id}
        >
          <ListItemAvatar>
            <Avatar>{e.firstName[0] + e.lastName[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={e.subject}
            secondary={e.body.slice(0, 15) + (e.body.length > 15 ? "..." : "")}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
export default EmailsList;
