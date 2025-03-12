// import { useCallback, useEffect, useState } from 'react';

// import { Generation, Pokemon } from '../types/types';
// import { generateRandomId } from '../utils/generateRandomID';
// import { useQuery } from 'react-query';


// export default function usePokemon(): any {
  

//   return useQuery({
//     queryKey: ['pokemon', randomID],
//     queryFn: async (): Promise<any> => {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok')
//       }

//       const data = await response.json()
//       console.log(data)
//       return data
//     },
//     staleTime: 1000 * 60 * 60 // 60 minutes
//   })
// }



/**----------------------------------------------
 * !                  Pokemon Ranges
 *   // function setGenerationRange(generation: Generation): { min: number; max: number } {
  //   console.log('setGenerationRange function called')

  //   switch (generation) {
  //     case 'I':
  //       return { min: 1, max: 151 };
  //     case 'II':
  //       return { min: 152, max: 251 };
  //       break;
  //     case 'III':
  //       return { min: 252, max: 386 };
  //       break;
  //     case 'IV':
  //       return { min: 387, max: 493 };
  //       break;
  //     case 'V':
  //       return { min: 494, max: 649 };
  //       break;
  //     case 'VI':
  //       return { min: 650, max: 721 };
  //       break;
  //     case 'VII':
  //       return { min: 722, max: 809 };
  //       break;
  //     case 'VIII':
  //       return { min: 810, max: 898 };
  //       break;
  //     default:
  //       return { min: 1, max: 1 };
  //       break;
  //   }
 *   
 *   
 *
 *---------------------------------------------**/