import { Box } from '@mui/material';
import { IPokemonImageProps } from '../../../types/types';

export default function Image({ sprite, name, isRevealed, id }: IPokemonImageProps) {
  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <img
        id={id}
        src={sprite?.front_default}
        alt={name}
        style={
          isRevealed ? { filter: 'blur(0px)' } : { filter: 'blur(20px)' }
        }
      />
    </Box>
  );
}
