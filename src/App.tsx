import { useCallback, useLayoutEffect, useState } from 'react';
import { useFetchPokemon } from './hooks/useFetchPokemon';
import { generateRandomId } from './utils/generateRandomID';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import Heading from './components/Heading';
import PokemonImage from './components/PokemonImage';
import UserMessage from './components/UserMessage';
import GenerationSelector from './components/PokemonGenerationSelector';
import { Generation } from './types/types';
import usePokemonGeneration from './hooks/usePokemonGeneration';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export function App() {
  //   Get DOM elements
  const pokemonImageElement = document.getElementById(
    'pokemonImage'
  ) as HTMLImageElement

  const guessInputElement = document.getElementById(
    'guess'
  ) as HTMLInputElement;

  // State variables
  const [gen, setGen] = useState<Generation>('I');
  /* Set the range of pokemon to fetch. Must be placed here because 
  it depends on the generation and generateRandomId depends on the range
  */
  const { min, max } = usePokemonGeneration(gen);
  const initialId = generateRandomId(min, max);
  const [pokemonId, setPokemonId] = useState<number>(initialId);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState<string>(
    'Who is this Pokemon?'
  );
  const [showHint, setShowHint] = useState<boolean>(false);

  // Timeout ID - used to clear the timeout
  let timeoutId: number | null = null;

  // Initial fetch onLoad
  useLayoutEffect(() => {
    handleFetchNewPokemon();
  }, [])

  // This value will change when the pokemonId changes
  const currentPokemon = useFetchPokemon(pokemonId);


  const handleFetchNewPokemon = useCallback((): void => {
    const newId = generateRandomId(min, max); // Max range of pokemon to fetch starting at 1
    setPokemonId(newId); // Trigger re-fetch by changing the ID
    console.log(`Fetching new pokemon with ID: ${newId}`);
  }, [pokemonId, min, max])

  const handleUpdateGeneration = useCallback((generation: Generation): void => {
    setGen(generation);
  }, [gen])

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    checkGuess();
  };

  const handleShowHint = (e: React.MouseEvent): void => {
    e.preventDefault();
    setShowHint(true);
  }

  const hideImage = useCallback((): void => {
    pokemonImageElement.style.filter = 'blur(10px)';
  }, [pokemonImageElement]);

  const showImage = useCallback((): void => {
    pokemonImageElement.style.filter = 'blur(0px)';
  }, [pokemonImageElement]);

  /**
 * Resets the user interface for a new Pokémon guess.
 * - Sets the user message to prompt a new guess.
 * - Clears the user's current guess input.
 */

  const clear = useCallback(async () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Fetch a new Pokémon after 2 seconds
    timeoutId = setTimeout(() => {
      hideImage();
      handleFetchNewPokemon();
      setUserMessage('Who is this Pokemon?');
      setUserGuess('');
      setShowHint(false);
      guessInputElement.value = '';
    }, 2000) as unknown as number;
  }, [hideImage, handleFetchNewPokemon, setUserMessage, setUserGuess, setShowHint]);

  /**
 * Compares the user's guess with the name of the current Pokémon.
 * If correct, shows the Pokémon image and congratulates the user.
 * If incorrect, displays an error message.
 * Triggers a new Pokémon fetch after 2 seconds.
 */
  const checkGuess = useCallback((): void => {
    if (userGuess === currentPokemon?.name) {
      showImage();
      setUserMessage(
        'Correct! The Pokémon is ' +
        currentPokemon?.name.charAt(0).toUpperCase() +
        currentPokemon?.name.slice(1) +
        '!'
      );
    } else {
      showImage();
      setUserMessage('Incorrect! It was ' + currentPokemon?.name);
    }
    clear();
  }, [userGuess, currentPokemon]);

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

// App.whyDidYouRender = true;
export default App;
