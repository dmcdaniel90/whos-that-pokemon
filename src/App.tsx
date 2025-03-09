import { useCallback, useState } from 'react';
import { useFetchPokemon } from './hooks/useFetchPokemon';
import { generateRandomId } from './utils/generateRandomID';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import Heading from './components/Heading';
import PokemonImage from './components/PokemonImage';
import UserMessage from './components/UserMessage';
import GenerationSelector from './components/PokemonGenerationSelector';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Generation } from './types/types';
import usePokemonGeneration from './hooks/usePokemonGeneration';

export default function App() {
  //   Get DOM elements
  const pokemonImageElement = document.getElementById(
    'pokemonImage'
  ) as HTMLImageElement;
  //   const messageElement = document.getElementById('message') as HTMLDivElement;
  const guessInputElement = document.getElementById(
    'guess'
  ) as HTMLInputElement;

  const [gen, setGen] = useState<Generation>('I');
  const { min, max } = usePokemonGeneration(gen);
  const initialId = generateRandomId(min, max);
  const [pokemonId, setPokemonId] = useState<number>(initialId);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState<string>(
    'Who is this Pokemon?'
  );
  const [showHint, setShowHint] = useState<boolean>(false);

  // TODO Create state to track whether the image should be shown

  // This value will change when the pokemonId changes
  const currentPokemon = useFetchPokemon(pokemonId);

  function handleFetchNewPokemon(): void {
    const newId = generateRandomId(min, max); // Max range of pokemon to fetch starting at 1
    setPokemonId(newId); // Trigger re-fetch by changing the ID
  }

  function handleUpdateGeneration(generation: Generation): void {
    setGen(generation);
  }

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    checkGuess();
  }, []);

  const handleShowHint = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowHint(true);
  }, [])


  function handleKeyPress(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') {
      checkGuess();
    }
  }

  /**
   * Compares the user's guess with the name of the current Pokémon.
   * If correct, shows the Pokémon image and congratulates the user.
   * If incorrect, displays an error message.
   * Triggers a new Pokémon fetch after 2 seconds.
   */
  function checkGuess(): void {
    if (userGuess === currentPokemon?.name) {
      showImage();
      setUserMessage(
        'Correct! The Pokémon is ' +
        currentPokemon?.name.charAt(0).toUpperCase() +
        currentPokemon?.name.slice(1) +
        '!'
      );
    } else {
      setUserMessage('Incorrect! It was ' + currentPokemon?.name);
    }
    clear();
  }
  function hideImage(): void {
    pokemonImageElement.style.filter = 'blur(10px)';
  }

  function showImage(): void {
    pokemonImageElement.style.filter = 'blur(0px)';
  }

  // TODO create a handleShowHint function that toggles the showHint state

  /**
   * Resets the user interface for a new Pokémon guess.
   * - Sets the user message to prompt a new guess.
   * - Clears the user's current guess input.
   */

  async function clear(): Promise<void> {
    // Fetch a new Pokémon after 2 seconds
    setTimeout(() => {
      hideImage();
      handleFetchNewPokemon();
      setUserMessage('Who is this Pokemon?');
      setUserGuess('');
      setShowHint(false);
      guessInputElement.value = '';
    }, 2000);
  }

  // Listen for Enter key press
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      handleKeyPress(e as unknown as React.KeyboardEvent);
    }
  });

  return (
    <main id="main">
      <CssBaseline />
      <Container maxWidth="lg" >
        <Heading currentPokemon={currentPokemon} showHint={showHint} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'top',
            mt: 2,
          }}>
          <PokemonImage currentPokemon={currentPokemon} />
          <Box
            sx={{
              width: '50%',
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <UserMessage message={userMessage} />
            <Box
              sx={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <TextField
                type="text"
                id="guess"
                onChange={(e) => setUserGuess(e.target.value.toLowerCase())}
                variant="filled"
                label="Guess the Pokémon"
                sx={{ width: '100%', mb: 4 }}
              />
              <Container sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{ width: '50%' }}>
                  Submit Guess
                </Button>
                <Button
                  variant="contained"
                  onClick={handleShowHint}
                  sx={{ width: '50%' }}>
                  Need a Hint?
                </Button>
              </Container>
              <GenerationSelector
                handleUpdateGeneration={handleUpdateGeneration}
                generation={gen}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
}
