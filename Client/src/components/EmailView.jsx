import { Stack, Typography } from "@mui/material";

const EmailView = ({ sender, subject, body, firstName, lastName, time }) => {
  const formatTime = (time) => {
    const date = new Date(time);

    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    return `${weekday} ${month}/${day}/${year} ${hour12}:${minutes} ${ampm}`;
  };

  return (
    <Stack p={5} gap={1} width={"50%"}>
      <Typography variant="h7">
        From: {firstName} {lastName}: {sender}
      </Typography>
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Typography variant="h5">{subject || "No Subject"}</Typography>
        <Typography variant="h5" fontSize={15} color="blue">{time && formatTime(time)}</Typography>
      </Stack>
      <Typography color="gray"
        variant="body"
        sx={{
          border: "1px solid gray",
          padding: "15px",
          borderRadius: "4px",
          minHeight:"450px",
        }}
      >
        {body}
      </Typography>
    </Stack>
  );
};
export default EmailView;
