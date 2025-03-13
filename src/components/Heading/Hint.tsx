import { Typography } from '@mui/material';
import { Pokemon } from '../../types/types';
import { memo } from 'react';

function Hint(props: { currentPokemon: Pokemon | undefined, showHint: boolean }) {
    const { currentPokemon, showHint } = props;
    return (
        <Typography variant="h5" sx={{ color: 'white' }} fontFamily={'Roboto'}>
            {/* TODO Conditionally display the name of the current pokemon if showHint is true */}
            {showHint && currentPokemon ? `Hint: ${currentPokemon.name.charAt(0).toUpperCase() + Array.from(currentPokemon.name.slice(1)).map((letter) => letter = '*').join('')}` : ''}
        </Typography>
    );
}

export default memo(Hint);
