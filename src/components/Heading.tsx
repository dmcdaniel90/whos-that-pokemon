import { Box, Typography } from '@mui/material';
import { Pokemon } from '../types/types';

export default function Heading(props: { currentPokemon: Pokemon | null, showHint: boolean }) {
  const { currentPokemon, showHint } = props;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mt: 2 }}>
        Pokémon Guessing Game
      </Typography>
      <Typography variant="subtitle1">
        {/* TODO Conditionally display the name of the current pokemon if showHint is true */}
        {showHint && currentPokemon ? `Hint: ${currentPokemon.name.charAt(0).toUpperCase() + Array.from(currentPokemon.name.slice(1)).map((char) => char = '*').join('')}` : ''}
      </Typography>
    </Box>
  );
}
