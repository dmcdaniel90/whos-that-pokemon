# Pokemon Guessing Game

## About

This is a simple pokemon guessing game built with React, TypeScript, and Material-UI. The game displays a random pokemon and the user has to guess its name. After submitting their guess, the game displays a message indicating whether the guess was correct or not. The game then waits for 2 seconds before displaying a new pokemon for the user to guess.

## How to play

1. The game displays a random pokemon.
2. Type the name of the pokemon in the text field.
3. Click the "Guess" button to submit your guess.
4. The game displays a message indicating whether the guess was correct or not.
5. Wait for 2 seconds and a new pokemon is displayed.
6. Click the Hint button to see at hint at the top of the display
7. Click the 🔊 icon to hear the Pokemon's cry

## Primary technologies used

  -React v18
  -Typescript
  -Material UI
  -Tanstack Query
  -Pokemon API

## Project objectives

My goal for this project was to create a simple guessing game that pushed me to work on a few key skills in React, without having any guides or templates to work from.

I started the project with a basic knowledge of React, and most of my recent work with it was on small class components using Microsoft Sharepoint's SPFX framework. While I understood how to work with functional components, I was less familiar with hooks outside of `useState` and `useEffect`, such as `useRef`, `useCallback`, and custom hooks.

To up the difficulty factor, I have been forcing myself to only use Typescript when working with React. In actuality, I find Typescript annoyingly satisfying and I appreciated its powerful type-checking and autocomplete features in my IDE (VSCode Insiders).

### Goals

 -Build a guessing game in React-Typescript
 -Implement React hooks, while avoiding uneccesary use of `useState` and `useEffect`
 -Implement an external API
 -Implement a popular design system

## Future improvements

I would like to add additional gamification features to the game, such as keeping score and implementing a two-player mode. Longer term, making this a fullstack application with users and leaderboard tracking would also be great additions.

The current UI is very simple; I would also like to redesign the UI from the ground up, and implement motion animations, along with additional audio feedback, such as when users answer correctly or incorrectly.
