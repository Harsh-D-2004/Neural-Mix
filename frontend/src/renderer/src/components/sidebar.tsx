import React from 'react'
import { useState } from 'react'
import ComboBox from './combobox'
// import {
//   IconGraphEq,
//   IconPiano,
//   IconLayers,
//   IconWand,
//   IconHistory,
//   IconMusic,
//   IconSettings,
//   IconFile
// } from './icons'

const productionTools = [
  { id: 'melody', name: 'Melody Generator' },
  { id: 'stems', name: 'Stem Separator' },
  { id: 'master', name: 'AI Mastering' },
  { id: 'enhance', name: 'Audio Enhancer' }
]

const library = [
  { id: 'samples', name: 'Generated Samples' },
  { id: 'projects', name: 'My Projects' },
  { id: 'history', name: 'History' }
]

interface SidebarProps {
  selectedPlugin: string
  onPluginChange: (plugin: string) => void
}

export default function Sidebar({ selectedPlugin, onPluginChange }: SidebarProps) {
  const [genre, setGenre] = useState('techno')
  const [key, setKey] = useState('C')
  const [scale, setScale] = useState('Major')
  const [bpm, setBpm] = useState(128)
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">NEURAL MIX</h1>
        </div>

        <div className="controls-grid">
          <ComboBox />
          <div className="select-wrapper">
            <h1>Genre</h1>
            <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="techno">Techno</option>
              <option value="house">House</option>
              <option value="ambient">Ambient</option>
              <option value="dnb">Drum & Bass</option>
            </select>
          </div>

          <div className="slider-wrapper">
            <h2>BPM: {bpm}</h2>
            <input
              type="range"
              id="bpm"
              min="60"
              max="200"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        {/* <div className="sidebar-content">
          <div className="sidebar-section">
            <h2 className="sidebar-section-title">Production Tools</h2>
            <nav className="sidebar-nav">
              {productionTools.map((tool) => (
                <button
                  key={tool.id}
                  className={`sidebar-nav-item ${selectedPlugin === tool.id ? 'active' : ''}`}
                  onClick={() => onPluginChange(tool.id)}
                >
                  <span className="sidebar-nav-text">{tool.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="sidebar-section">
            <h2 className="sidebar-section-title">Library</h2>
            <nav className="sidebar-nav">
              {library.map((item) => (
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${selectedPlugin === item.id ? 'active' : ''}`}
                  onClick={() => onPluginChange(item.id)}
                >
                  <span className="sidebar-nav-text">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div> */}

        {/* <div className="sidebar-footer">
          <button className="sidebar-nav-item">
            <span className="sidebar-nav-icon"></span>
            <span className="sidebar-nav-text">Settings</span>
          </button> 
        </div>*/}
      </aside>
    </>
  )
}
