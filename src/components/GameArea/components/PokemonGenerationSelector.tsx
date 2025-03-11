import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { selectInputStyles } from '../styles/muiStyles';
import { Generation } from '../../../types/types';
import { memo } from 'react';

interface GenerationSelectorProps {
  handleUpdateGeneration: (generation: Generation) => void;
  generation: Generation;
}

function GenerationSelector(props: GenerationSelectorProps) {
  const { handleUpdateGeneration, generation } = props;

  const handleChange = (event: SelectChangeEvent) => {
    handleUpdateGeneration(event.target.value as Generation);
  };

  return (
    <Box sx={{ minWidth: 200, mt: 4 }}>
      <FormControl fullWidth >
        <InputLabel id="generationSelectorLabel" sx={{ color: 'white', '&.Mui-focused': { color: 'white' }, '&.Mui-hover': { border: '1px solid white' } }}>
          Select Pokemon Generation
        </InputLabel>
        <Select
          labelId="generationSelector"
          id="generationSelector"
          value={generation}
          label="Select Pokemon Generation"
          onChange={handleChange}
          sx={{ ...selectInputStyles }}
        >
          <MenuItem value="I">I</MenuItem>
          <MenuItem value="II">I - II</MenuItem>
          <MenuItem value="III">I - III</MenuItem>
          <MenuItem value="IV">I - IV</MenuItem>
          <MenuItem value="V">I - V</MenuItem>
          <MenuItem value="VI">I - VI</MenuItem>
          <MenuItem value="VII">I - VII</MenuItem>
          <MenuItem value="VIII">I - VIII</MenuItem>
        </Select>
      </FormControl>
    </Box >
  );
}

export default memo(GenerationSelector);