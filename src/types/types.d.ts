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
  id?: string;
  sprite?: Sprite | undefined;
  src?: string;
  name: string | undefined;
  isRevealed: boolean;
}

export interface Pokemon {
  name: keyof typeof PokemonList;
  types: SpeciesType[];
  sprites: Sprite;
  id: number;
  cries: {
    latest: string,
    legacy: string
  };
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
  isLoading: boolean;
}

export interface IHeadingProps {
  title: string;
  color: string;
  fontName?: string;
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  marginY?: number;
  marginX?: number;
}
