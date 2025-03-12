import { Box } from '@mui/material';
import { IPokemonImageProps } from '../../../types/types';


export default function PokemonImage({ image, name, isRevealed }: IPokemonImageProps) {
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
        id="pokemonImage"
        src={image?.front_default}
        alt={name}
        style={
          isRevealed ? { filter: 'blur(0px)' } : { filter: 'blur(10px)' }
        }
      />
    </Box>
  );
}
