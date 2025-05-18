import React from 'react'
import { useState } from 'react'
import ComboBox from './combobox'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import logo from '../assets/neurallogo.jpg'
// Define singers and their associated prompts
const singers = [
  {
    id: 'martin-garrix',
    name: 'Martin Garrix',
    prompt:
      'Create a high-energy progressive house melody with Martin Garrix-style synth leads and uplifting chord progressions.'
  },
  {
    id: 'deadmau5',
    name: 'Deadmau5',
    prompt:
      'Generate a dark, atmospheric progressive house melody with complex layered synths and evolving textures.'
  },
  {
    id: 'daft-punk',
    name: 'Daft Punk',
    prompt:
      'Create a funky, electronic melody with vocoder-style effects and retro synthesizer sounds.'
  },
  {
    id: 'avicii',
    name: 'Avicii',
    prompt:
      'Generate an uplifting melodic house progression with folk-inspired elements and catchy lead synths.'
  }
]

const genres = [
  { label: 'Techno' },
  { label: 'House' },
  { label: 'Ambient' },
  { label: 'Drum & Bass' },
  { label: 'Trance' },
  { label: 'Deep House' },
  { label: 'Progressive House' },
  { label: 'Minimal' }
]

export default function Sidebar ({ onSingerSelect }) {
  const [genre, setGenre] = useState(genres[0])
  const [bpm, setBpm] = useState(128)

  const handleSingerClick = prompt => {
    onSingerSelect(prompt)
  }

  return (
    <aside className='sidebar'>
      <div className='sidebar-header'>
        <img src={logo} alt='logo' className='logo2' />

        <h1 className='logo'>NEURAL MIX</h1>
      </div>

      <div className='controls-grid'>
        <div className='select-wrapper'>
          <ComboBox />
          <h1>Genre</h1>
          <Autocomplete
            disablePortal
            options={genres}
            value={genre}
            onChange={(event, newValue) => {
              setGenre(newValue)
            }}
            sx={{
              width: '100%',
              '& .MuiAutocomplete-input': {
                color: 'white'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              },
              '& .MuiAutocomplete-popupIndicator': {
                color: 'white'
              },
              '& .MuiAutocomplete-clearIndicator': {
                color: 'white'
              }
            }}
            renderInput={params => (
              <TextField
                {...params}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'white'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white'
                    },
                    '&:hover fieldset': {
                      borderColor: 'white'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'skyblue'
                    }
                  }
                }}
              />
            )}
          />
        </div>

        <div className='slider-wrapper'>
          <h2>BPM: {bpm}</h2>
          <input
            type='range'
            id='bpm'
            min='60'
            max='200'
            value={bpm}
            onChange={e => setBpm(Number(e.target.value))}
            className='slider'
          />
        </div>
      </div>

      <div className='sidebar-section'>
        <h2 className='sidebar-section-title'>Artists</h2>
        <nav className='sidebar-nav'>
          {singers.map(singer => (
            <button
              key={singer.id}
              className='sidebar-nav-item'
              onClick={() => handleSingerClick(singer.prompt)}
            >
              <span className='sidebar-nav-text'>{singer.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .sidebar {
          width: 250px;
          background-color: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border);
          padding: 20px;
          color: white;
          height: 100%;
          overflow-y: auto;
        }
        .controls-grid {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar-section {
          margin-top: 20px;
        }
        .sidebar-section-title {
          font-size: 1.1em;
          color: var(--color-text-secondary);
          margin-bottom: 10px;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sidebar-nav-item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          background-color: transparent;
          cursor: pointer;
          transition: background-color 0.2s;
          color: var(--color-text-primary);
        }
        .sidebar-nav-item:hover {
          background-color: var(--color-button);
        }
        .sidebar-nav-text {
          margin-left: 8px;
        }
        .select-wrapper select {
          width: 100%;
          padding: 8px;
          margin-top: 8px;
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          color: var(--color-text-primary);
        }
        .slider {
          width: 100%;
          margin-top: 8px;
        }
      `}</style>
    </aside>
  )
}
