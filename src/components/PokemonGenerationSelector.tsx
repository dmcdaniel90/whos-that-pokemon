import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Generation } from '../types/types';
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
      <FormControl fullWidth>
        <InputLabel id="generationSelectorLabel">
          Select Pokemon Generation
        </InputLabel>
        <Select
          labelId="generationSelector"
          id="generationSelector"
          value={generation}
          label="Select Pokemon Generation"
          onChange={handleChange}>
          <MenuItem value="I">I</MenuItem>
          <MenuItem value="II">II</MenuItem>
          <MenuItem value="III">III</MenuItem>
          <MenuItem value="IV">IV</MenuItem>
          <MenuItem value="V">V</MenuItem>
          <MenuItem value="VI">VI</MenuItem>
          <MenuItem value="VII">VII</MenuItem>
          <MenuItem value="VIII">VIII</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default memo(GenerationSelector);