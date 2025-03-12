import { PokemonList } from './pokemonList';

export type NumberInRange<T extends number, U extends number> = T | U;

export type Generation =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII';

interface SpeciesType {
  slot: number;
  type: {
    name: string;
  };
}

export interface Sprite {
  front_default: string;
}

export interface IPokemonImageProps {
  image: Sprite | undefined
  name: string | undefined
  isRevealed: boolean
}

export interface Pokemon {
  name: keyof typeof PokemonList;
  types: SpeciesType[];
  sprites: Sprite;
  id: number;
  cries: {
    latest: string,
    legacy: string
  }
}

export interface SoundButtonProps {
  soundFileName: string;
  tooltipString: string;
}

export interface IGameAreaProps {
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowHint: (e: React.MouseEvent) => void;
  handleGetNewPokemon: () => void;
  currentPokemon: Pokemon | undefined;
}
