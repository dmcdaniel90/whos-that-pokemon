import { Typography } from '@mui/material';
import { memo } from 'react';
import { IHeadingProps } from '../../types/types';

function Heading({ title = "Hello", color, fontName, size, marginY }: IHeadingProps) {
  return (
    <Typography variant={size} sx={{ mt: marginY, color: color, mb: marginY }} fontFamily={fontName}>
      {title}
    </Typography>
  );
}

export default memo(Heading);
