import { useState } from 'react';
import { useFetchPokemon } from './hooks/useFetchPokemon';
import { generateRandomId } from './utils/generateRandomID';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  //   Get DOM elements
  const pokemonImageElement = document.getElementById(
    'pokemonImage'
  ) as HTMLImageElement;
  //   const messageElement = document.getElementById('message') as HTMLDivElement;
  const guessInputElement = document.getElementById(
    'guess'
  ) as HTMLInputElement;

  const min = 1;
  const max = 151;
  const initialId = generateRandomId(min, max);

  const [pokemonId, setPokemonId] = useState<number>(initialId);
  const [userMessage, setUserMessage] = useState<string>(
    'Who is this Pokemon?'
  );
  const [userGuess, setUserGuess] = useState<string | null>(null);

  // This value will change when the pokemonId changes
  const currentPokemon = useFetchPokemon(pokemonId);

  function handleFetchNewPokemon(): void {
    const newId = generateRandomId(min, max); // Max range of pokemon to fetch starting at 1
    setPokemonId(newId); // Trigger re-fetch by changing the ID
  }

  function handleClick(e: React.MouseEvent): void {
    e.preventDefault();

    checkGuess();
  }

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
      setUserMessage('Incorrect!');
    }

    // Fetch a new Pokémon after 2 seconds
    setTimeout(() => {
      hideImage();
      handleFetchNewPokemon();
      clear();
    }, 2000);
  }
  function hideImage(): void {
    pokemonImageElement.style.filter = 'blur(10px)';
  }

  function showImage(): void {
    pokemonImageElement.style.filter = 'blur(0px)';
  }

  /**
   * Resets the user interface for a new Pokémon guess.
   * - Sets the user message to prompt a new guess.
   * - Clears the user's current guess input.
   */

  function clear(): void {
    setUserMessage('Who is this Pokemon?');
    setUserGuess('');
    guessInputElement.value = '';
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
      <Container maxWidth="lg" sx={{ border: '1px solid red' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mt: 2 }}>
            Pokémon Guessing Game
          </Typography>
          <Typography variant="subtitle1">
            Hint: {currentPokemon?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'top',
            mt: 2,
          }}>
          <Box
            sx={{
              width: '50%',
              border: '1px solid red',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img
              id="pokemonImage"
              src={currentPokemon?.sprites.front_default}
              alt="Pokemon"
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Typography
              className="message"
              id="message"
              variant="h4"
              sx={{ mx: 2 }}>
              {userMessage}
            </Typography>
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
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{ width: '100%' }}>
                Submit Guess
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
}
