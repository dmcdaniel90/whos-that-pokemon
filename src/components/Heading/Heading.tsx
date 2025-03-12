import { Box, Typography } from '@mui/material';
import { Pokemon } from '../../types/types';
import { memo } from 'react';

function Heading(props: { currentPokemon: Pokemon | undefined, showHint: boolean }) {
  const { currentPokemon, showHint } = props;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h1" sx={{ mt: 2, color: 'white', mb: 2 }} fontFamily={'Knewave'}>
        Pokémon Guessing Game
      </Typography>
      <Typography variant="h5" sx={{ color: 'white' }} fontFamily={'Roboto'}>
        {/* TODO Conditionally display the name of the current pokemon if showHint is true */}
        {showHint && currentPokemon ? `Hint: ${currentPokemon.name.charAt(0).toUpperCase() + Array.from(currentPokemon.name.slice(1)).map((char) => char = '*').join('')}` : ''}
      </Typography>
    </Box>
  );
}

export default memo(Heading);
