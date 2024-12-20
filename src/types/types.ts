import { PokemonList } from './pokemonList';

export type NumberInRange<T extends number, U extends number> = T | U;

interface SpeciesType {
  slot: number;
  type: {
    name: string;
  };
}

interface Sprite {
  front_default: string;
}
export interface Pokemon {
  name: keyof typeof PokemonList;
  types: SpeciesType[];
  sprites: Sprite;
}
