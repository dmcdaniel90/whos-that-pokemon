import { useEffect, useState } from 'react';

import { Pokemon } from '../types/types';

export function useFetchPokemon(pokemonId: number): Pokemon | null {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchPokemon(): Promise<void> {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
        }
        const data = await response.json();

        setPokemon(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPokemon();
  }, [pokemonId]);

  return pokemon;
}
