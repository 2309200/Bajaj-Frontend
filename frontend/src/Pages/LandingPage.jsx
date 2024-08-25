import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  'Alphabets',
  'Numbers',
  'Highest lowercase alphabet',
];

function getStyles(option, selectedOptions, theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const LandingPage = () => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState(null); // State for response data

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setSelectedOptions(newValue);
  };

  const handleDataChange = (event) => {
    try {
      const userInput = JSON.parse(event.target.value);
      if (Array.isArray(userInput)) {
        setData(userInput);
      } else {
        console.error("Input is not an array.");
      }
    } catch (error) {
      console.error("Invalid JSON input.");
    }
  };

  const handleButtonClick = async () => {
    const jsonPayload = {
      data: data,
      isNumber: selectedOptions.includes('Numbers'),
      isAlphabet: selectedOptions.includes('Alphabets'),
      highestLowerCaseAlphabet: selectedOptions.includes('Highest lowercase alphabet')
    };

    try {
      console.log(jsonPayload);
      const response = await axios.post('https://bajaj-finserv-qyfx.onrender.com/api/v1/bfhl', jsonPayload);
      console.log('Response:', response.data);
      setResponse(response.data); // Set response data to state
    } catch (error) {
      console.error('Error posting data:', error.message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Data Input
      </Typography>
      <TextField
        label="Enter data as JSON array"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        onChange={handleDataChange}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Options</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedOptions}
          onChange={handleSelectChange}
          input={<OutlinedInput id="select-multiple-chip" label="Options" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, selectedOptions, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Submit
      </Button>
      {/* Render the response data */}
      {response && (
        <Box sx={{ mt: 2, p: 2, border: '1px solid', borderRadius: 1, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" gutterBottom>
            Response Data
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1"><strong>Success:</strong> {response.is_success ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1"><strong>User ID:</strong> {response.user_id}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {response.email}</Typography>
          <Typography variant="body1"><strong>Roll Number:</strong> {response.roll_number}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><strong>Numbers:</strong></Typography>
            {response.numbers && response.numbers.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {response.numbers.map((number, index) => (
                  <Chip key={index} label={number} color="primary" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2">No numbers found</Typography>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><strong>Alphabets:</strong></Typography>
            {response.alphabets && response.alphabets.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {response.alphabets.map((alphabet, index) => (
                  <Chip key={index} label={alphabet} color="secondary" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2">No alphabets found</Typography>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><strong>Highest Lowercase Alphabet:</strong></Typography>
            {response.highest_lowercase_alphabet && response.highest_lowercase_alphabet.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1,alignItems:"center" }}>
                {response.highest_lowercase_alphabet.map((alphabet, index) => (
                  <Chip key={index} label={alphabet} color="warning" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2">No highest lowercase alphabet found</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LandingPage;
