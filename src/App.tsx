import { Autocomplete, Avatar, styled, TextField, Typography } from '@mui/material'
import './App.css'
import { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import champions from './data/champions.json';

interface Campeon {
  name: string;
  img_url: string;
}



const filterOptions = createFilterOptions({
  matchFrom: 'start', // Solo filtrar si empieza con el término de búsqueda
  stringify: (option: Campeon) => option.name,
});

const AppContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '1rem',
  padding: '1rem',
});


function App() {
  const [selectedChampion, setSelectedChampion] = useState<Campeon | null>(null);
  const [value, setValue] = useState<Campeon | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.length > 0) {
      const selectedChampion: Campeon | undefined = champions.find((champion: Campeon) =>
        champion.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      if (selectedChampion) {
        setValue(selectedChampion);
        setInputValue(selectedChampion.name); // Para mostrar el nombre seleccionado en el input
      }
    }
  };

  useEffect(() => {
    if (value) {
      setInputValue("");
      setValue(null);
      setSelectedChampion(value);
    }
  }, [value]);

  return (
    <AppContainer>
      <Typography variant='h2'>You are out!: League Version</Typography>
      <Typography variant='h6'>Type a champion that uses Mana</Typography>
      <Autocomplete
        options={inputValue.length >= 1 ? champions : []} // Solo mostrar resultados si se ingresó un carácter
        getOptionLabel={(option) => option.name}
        filterOptions={filterOptions}
        value={value}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
        onChange={(_event, newValue) => setValue(newValue)}
        noOptionsText="No champion found" // Evita mostrar "No Options" cuando no hay resultados
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Champion"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: null // Oculta el ícono de la derecha
            }}
            onKeyDown={handleKeyDown} // Manejar evento de tecla
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props} style={{ backgroundColor: selected ? '#f0f0f0' : 'transparent' }}>
            <Avatar
              alt={option.name}
              src={option.img_url}
              sx={{ marginRight: 2 }}
            />
            {option.name}
          </li>
        )}
        sx={{ width: 300 }}
      />
      <Typography variant='h6'>Selected Champion: {selectedChampion?.name}</Typography>
    </AppContainer>
  )
}

export default App
