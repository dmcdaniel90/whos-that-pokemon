import { Typography } from '@mui/material';
import { memo } from 'react';

function UserMessage(props: { message: string }) {
  const { message } = props;
  return (
    <Typography variant="h4" sx={{ mt: 2, color: 'white' }}>
      {message}
    </Typography>
  );
}

export default memo(UserMessage);
