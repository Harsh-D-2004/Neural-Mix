import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import vst3Plugins from './top100films'

export default function ComboBox() {
  const [value, setValue] = React.useState('TAL-NoiseMaker')

  return (
    <Autocomplete
      className="combobox"
      disablePortal
      value={value as any}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      options={vst3Plugins}
      sx={{
        width: '100%',
        '& .MuiAutocomplete-input': {
          color: 'white',
          border: 'white' // Set selected text color to white
        }
      }}
      renderInput={(params) => (
        <TextField
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white' // Set label color to white
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white' // Set border color to white
              },
              '&:hover fieldset': {
                borderColor: 'white' // Set border color to white on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'skyblue' // Set border color to white when focused
              }
            }
          }}
          className="input"
          {...params}
          label="VS3 plugins"
        />
      )}
    />
  )
}
