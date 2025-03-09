import { useState, useEffect } from 'react';
import { Generation } from '../types/types';

interface Range {
  min: number;
  max: number;
}

function usePokemonGeneration(generation: Generation): Range {
  const [range, setRange] = useState<Range>({ min: 1, max: 1 });

  useEffect(() => {
    switch (generation) {
      case 'I':
        setRange({ min: 1, max: 151 });
        break;
      case 'II':
        setRange({ min: 152, max: 251 });
        break;
      case 'III':
        setRange({ min: 252, max: 386 });
        break;
      case 'IV':
        setRange({ min: 387, max: 493 });
        break;
      case 'V':
        setRange({ min: 494, max: 649 });
        break;
      case 'VI':
        setRange({ min: 650, max: 721 });
        break;
      case 'VII':
        setRange({ min: 722, max: 809 });
        break;
      case 'VIII':
        setRange({ min: 810, max: 898 });
        break;
      default:
        setRange({ min: 1, max: 1 });
        break;
    }
  }, [generation]);

  return range;
}

export default usePokemonGeneration;
