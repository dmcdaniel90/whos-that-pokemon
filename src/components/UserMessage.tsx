import { Typography } from '@mui/material';

export default function UserMessage(props: { message: string }) {
  const { message } = props;
  return (
    <Typography variant="h4" sx={{ mt: 2 }}>
      {message}
    </Typography>
  );
}
