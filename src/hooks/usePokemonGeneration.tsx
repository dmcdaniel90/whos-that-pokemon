import { Generation } from "../types/types";

export default function usePokemonGeneration(generation: Generation): { min: number; max: number } {
  console.log('use generation function called')

  switch (generation) {
    case 'I':
      return { min: 1, max: 151 };
      break;
    case 'II':
      return { min: 152, max: 251 };
      break;
    case 'III':
      return { min: 252, max: 386 };
      break;
    case 'IV':
      return { min: 387, max: 493 };
      break;
    case 'V':
      return { min: 494, max: 649 };
      break;
    case 'VI':
      return { min: 650, max: 721 };
      break;
    case 'VII':
      return { min: 722, max: 809 };
      break;
    case 'VIII':
      return { min: 810, max: 898 };
      break;
    default:
      return { min: 1, max: 1 };
      break;
  }
}