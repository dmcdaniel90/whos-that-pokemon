import { Box, Button, Container, TextField } from "@mui/material";
import PokemonImage from "./components/PokemonImage";
import UserMessage from "./components/UserMessage";
import SoundButton from "./components/SoundButton";
import { useState, useCallback } from "react";
import { Generation, Pokemon } from "../../types/types";
import { generateRandomId } from "../../utils/generateRandomID";
import GenerationSelector from "./components/PokemonGenerationSelector";
import { textFieldStyles, buttonStyles } from "./styles/muiStyles";


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
    //! BUG - pokemonID is stale on re-renders
    const defaultSound = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`

    // State variables
    const [userGuess, setUserGuess] = useState<string | null>(null);
    const [userMessage, setUserMessage] = useState<string>(
        defaultUserMessage
    );
    const [pokemonCry, setPokemonCry] = useState<string>(defaultSound)


    // Timeout ID - used to clear the timeout
    let timeoutId: number | null = null;

    const handleFetchNewPokemon = useCallback((): void => {
        // console.log('fetch function called')
        const newId = generateRandomId(min, max); // Max range of pokemon to fetch starting at 1
        setPokemonId(newId); // Trigger re-fetch by changing the ID
    }, [pokemonId, min, max, currentPokemon])

    const handleUpdateGeneration = useCallback((generation: Generation): void => {
        //console.log('update generation function called')

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
            //console.log('clear function called')

            hideImage();
            handleFetchNewPokemon();
            setPokemonCry(currentPokemon?.cries.latest as string)
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
        //console.log('check guess function called')

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
                    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2, height: '4.5rem' }}>
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            sx={{
                                ...buttonStyles
                            }}>
                            Submit Guess
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleShowHint}
                            sx={{ ...buttonStyles }}>
                            Need a Hint?
                        </Button>
                        <SoundButton soundFileName={pokemonCry} tooltipString={'Click to play the Pokemon cry'} />
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