import { Box, Button, Container, TextField } from "@mui/material";
import PokemonImage from "./components/PokemonImage";
import UserMessage from "./components/UserMessage";
import SoundButton from "./components/SoundButton";
import { useState, useRef, useEffect } from "react";
import { IGameAreaProps } from "../../types/types";
// import GenerationSelector from "./components/PokemonGenerationSelector";
import { textFieldStyles, buttonStyles } from "./styles/muiStyles";
import { validateText } from "../../utils/validateText";

export default function GameArea({ setShowHint, handleShowHint, currentPokemon, handleGetNewPokemon }: IGameAreaProps) {

    // Default messages
    const defaultUserMessage = 'Who is that Pokemon?';
    const pokemonCry: string = currentPokemon?.cries.latest || 'none'

    // State variables
    const [userMessage, setUserMessage] = useState<string>(defaultUserMessage);
    const [isRevealed, setIsRevealed] = useState<boolean>(false)

    // User Input element
    const guessInputElement = useRef<HTMLInputElement | null>(null)

    // TODO - Fix Generation Selector
    // const handleUpdateGeneration = useCallback((generation: Generation): void => {
    //     //console.log('update generation function called')

    //     setGen(generation);
    // }, [gen])

    useEffect(() => {
        guessInputElement.current?.focus()
    }, [])


    const handleClick = (e: React.MouseEvent): void => {
        e.preventDefault();
        const userGuess = guessInputElement.current?.value
        const validatedAnswer = validateText(userGuess)

        checkGuess(validatedAnswer);
    };

    const clearInput = (): void => {
        if (guessInputElement.current) {
            guessInputElement.current.value = ''
        }
    }

    const clear = async () => {
        // Fetch a new Pokémon after 2 seconds
        setTimeout(() => {
            setIsRevealed(false);
            handleGetNewPokemon();
            setUserMessage(defaultUserMessage);
            setShowHint(false);
            clearInput()

        }, 2000) as unknown as number;
    };

    /**
    * Compares the user's guess with the name of the current Pokémon.
    * If correct, shows the Pokémon image and congratulates the user.
    * If incorrect, displays an error message.
    * Triggers a new Pokémon fetch after 2 seconds.
    */
    const checkGuess = (guess: string): void => {
        setIsRevealed(true)

        if (guess.toLowerCase().replace(' ', '-') === currentPokemon?.name) {
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
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'top',
                mt: 2,
            }}>
            <PokemonImage image={currentPokemon?.sprites} name={currentPokemon?.name} isRevealed={isRevealed} />
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
                        inputRef={guessInputElement}
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
                    {/* <GenerationSelector
                        handleUpdateGeneration={handleUpdateGeneration}
                        generation={gen}
                    /> */}
                </Box>
            </Box>
        </Box>
    );
}