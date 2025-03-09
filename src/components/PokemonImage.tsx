import { Box } from '@mui/material';
import { Pokemon } from '../types/types';

export default function PokemonImage(props: {
  currentPokemon: Pokemon | null;
}) {
  const { currentPokemon } = props;

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
        src={currentPokemon?.sprites.front_default}
        alt={currentPokemon?.name}
      />
    </Box>
  );
}
