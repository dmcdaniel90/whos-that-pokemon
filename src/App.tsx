import { useState } from 'react';
// import usePokemon from './hooks/usePokemon';
// import { generateRandomId } from './utils/generateRandomID';
import { Container, CssBaseline } from '@mui/material';
import Heading from './components/Heading/Heading';
import { Pokemon } from './types/types';
// import usePokemonGeneration from './hooks/usePokemonGeneration';
import './App.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import "@fontsource/knewave/400.css"
import pokeball from "./assets/pokeball.gif"
import GameArea from './components/GameArea/GameArea';
import { useQuery } from 'react-query';
import { generateRandomId } from './utils/generateRandomID';

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
      console.log(data)
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

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" >
        {data && <><Heading currentPokemon={data} showHint={showHint} />
          <GameArea setShowHint={setShowHint} handleShowHint={handleShowHint} currentPokemon={data} handleGetNewPokemon={handleGetNewPokemon} /></>}
      </Container>
    </>
  );
}
