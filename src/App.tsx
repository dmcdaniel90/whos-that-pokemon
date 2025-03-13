import { useState } from 'react';
// import usePokemon from './hooks/usePokemon';
// import { generateRandomId } from './utils/generateRandomID';
import { Box, Container, CssBaseline } from '@mui/material';
import Heading from './components/Heading/Heading';
import { Pokemon } from './types/types';
// import usePokemonGeneration from './hooks/usePokemonGeneration';
import './App.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import "@fontsource/knewave/400.css"
import GameArea from './components/GameArea/GameArea';
import { useQuery } from 'react-query';
import { generateRandomId } from './utils/generateRandomID';
import Hint from './components/Heading/Hint';
import PokeSpinner from './components/PokeSpinner/PokeSpinner';

// TODO Remove this as hard coded value eventually
const { min, max } = { min: 1, max: 151 };

export default function App() {
  // State variables and callbacks
  const [showHint, setShowHint] = useState<boolean>(false);
  const [pokemonId, setPokemonId] = useState<number>(generateRandomId(min, max))

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: async (): Promise<Pokemon> => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      return data
    },
    staleTime: 1000 * 60 * 60 // 60 minutes
  })

  const handleShowHint = (e: React.MouseEvent): void => {
    e.preventDefault();
    setShowHint(true);
  }

  const handleGetNewPokemon = (): void => {
    const newId = generateRandomId(min, max); // Max range of pokemon to fetch starting at 1
    setPokemonId(newId); // Trigger re-fetch by changing the ID
  }

  // TODO Add error animations
  if (isError) return <p>Error</p>

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" >
        <Box sx={{ textAlign: "center", position: "absolute", top: "1rem", margin: "auto" }}>
          <Heading title='Pokemon Guessing Game' color='white' size='h1' fontName='Knewave' marginY={2} />
          <Hint currentPokemon={data} showHint={showHint} />
        </Box>
        {isLoading ?
          <PokeSpinner />
          :
          <GameArea setShowHint={setShowHint} handleShowHint={handleShowHint} currentPokemon={data} handleGetNewPokemon={handleGetNewPokemon} isLoading={isLoading} />
        }
      </Container>
    </>
  );
}
