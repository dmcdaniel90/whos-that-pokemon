import { useState } from 'react';
import { useFetchPokemon } from './hooks/useFetchPokemon';
import { generateRandomId } from './utils/generateRandomID';
import { Container, CssBaseline } from '@mui/material';
import Heading from './components/Heading/Heading';
import { Generation, Pokemon } from './types/types';
import usePokemonGeneration from './hooks/usePokemonGeneration';
import './App.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import "@fontsource/knewave/400.css"
import GameArea from './components/GameArea/GameArea';


export default function App() {
  // State variables and callbacks
  const [gen, setGen] = useState<Generation>('I');
  const { min, max } = usePokemonGeneration(gen);
  const initialId = generateRandomId(min, max);
  const [pokemonId, setPokemonId] = useState<number>(initialId);
  const [showHint, setShowHint] = useState<boolean>(false);

  // This value will change when the pokemonId changes
  const currentPokemon: Pokemon | null = useFetchPokemon(pokemonId);

  const handleShowHint = (e: React.MouseEvent): void => {
    e.preventDefault();
    setShowHint(true);
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" >
        <Heading currentPokemon={currentPokemon} showHint={showHint} />
        <GameArea setShowHint={setShowHint} handleShowHint={handleShowHint} gen={gen} setGen={setGen} min={min} max={max} pokemonId={pokemonId} setPokemonId={setPokemonId} currentPokemon={currentPokemon} />
      </Container>
    </>
  );
}
