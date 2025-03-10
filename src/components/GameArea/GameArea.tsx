import { Box, Button, Container, TextField } from "@mui/material";
import PokemonImage from "./components/PokemonImage";
import UserMessage from "./components/UserMessage";
import { useState, useLayoutEffect, useCallback } from "react";
import { Generation, Pokemon } from "../../types/types";
import { generateRandomId } from "../../utils/generateRandomID";
import GenerationSelector from "./components/PokemonGenerationSelector";
import { textFieldStyles } from "./styles/textFieldStyles";

interface IGameAreaProps {
    setShowHint: React.Dispatch<React.SetStateAction<boolean>>
    handleShowHint: (e: React.MouseEvent) => void
    gen: Generation
    setGen: React.Dispatch<React.SetStateAction<Generation>>
    min: number
    max: number
    pokemonId: number
    setPokemonId: React.Dispatch<React.SetStateAction<number>>
    currentPokemon: Pokemon | null
}

export default function GameArea({ setShowHint, handleShowHint, gen, setGen, min, max, pokemonId, setPokemonId, currentPokemon }: IGameAreaProps) {
    //   Get DOM elements
    const pokemonImageElement = document.getElementById(
        'pokemonImage'
    ) as HTMLImageElement

    const guessInputElement = document.getElementById(
        'guess'
    ) as HTMLInputElement;

    // Default messages
    const defaultUserMessage = 'Who is that Pokemon?';

    // State variables
    const [userGuess, setUserGuess] = useState<string | null>(null);
    const [userMessage, setUserMessage] = useState<string>(
        defaultUserMessage
    );

    // Timeout ID - used to clear the timeout
    let timeoutId: number | null = null;

    // Initial fetch onLoad
    useLayoutEffect(() => {
        handleFetchNewPokemon();
    }, [])

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
            setUserMessage(defaultUserMessage);
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
                        sx={{ width: '100%', mb: 4, ...textFieldStyles }}
                        required
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
    );
}