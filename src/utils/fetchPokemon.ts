import { Pokemon } from '../types/types';

export async function fetchPokemon(): Promise<Pokemon> {
  const randomId: number = Math.floor(Math.random() * 251) + 1; // Random ID between 1 and 898
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();

  return data;
}
