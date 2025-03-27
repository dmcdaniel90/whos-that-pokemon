# Pokemon Guessing Game

## About

This simple Pokemon guessing game was built with React, TypeScript, and Material-UI. The game displays a random Pokemon, and the user has to guess its name. After a user submits a guess, the game displays a message indicating whether the guess was correct. The game waits 2 seconds before displaying a new pokemon for the user to guess.

## How to play

1. The game displays a random pokemon.
2. Type the name of the Pokemon in the text field.
3. Click the "Guess" button to submit your guess.
4. The game displays a message indicating whether the guess was correct.
5. Wait for 2 seconds, and a new Pokemon will appear.
6. Click the Hint button to see a hint at the top of the display
7. Click the 🔊 icon to hear the Pokemon's cry

## Primary technologies used

- React v18
- Typescript
- Material UI
- Tanstack Query
- Pokemon API
- Docker

## Project objectives

My goal for this project was to create a simple guessing game that pushed me to work on a few key skills in React without having any guides or templates to work from.

I started the project with a basic knowledge of React, and most of my recent work with it was on small class components using Microsoft Sharepoint's SPFX framework. While I understood how to work with functional components, I was less familiar with hooks outside of `useState` and `useEffect`, such as `useRef`, `useCallback`, and custom hooks.

To up the difficulty factor, I have been forcing myself to only use Typescript when working with React. I find Typescript annoyingly satisfying, and I appreciate its powerful type-checking and autocomplete features in my IDE (VSCode Insiders).


### Goals

- Build a guessing game in React-Typescript
- Implement React hooks while avoiding unnecessary use of `useState` and `useEffect`
- Implement an external API
- Implement a popular design system

## Future improvements

I would like to add gamification features to the game, such as keeping score and implementing a two-player mode. In the long term, making this a full-stack application with users and leaderboard tracking would also be a great addition.

The current UI is very simple; I would also like to redesign the UI from the ground up and implement motion animations, along with additional audio feedback, such as when users answer correctly or incorrectly.

## Using Docker

_update 27/03/25_ The application can now be launched using Docker. I learned the basics in a tutorial some time ago but decided to challenge myself and see if I could Dockerize an application independently.

Run `docker-compose up` to run the application on port 3000



