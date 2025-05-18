'use client'
import React, { useState } from 'react'
import { useAudio } from '../context/audio-context'
import Sidebar from './sidebar'

const musicalKeys = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
const scales = ['Major', 'Minor', 'Dorian', 'Mixolydian', 'Pentatonic']

export default function MainContent () {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState([])
  const [genre, setGenre] = useState('techno')
  const [key, setKey] = useState('C')
  const [scale, setScale] = useState('Major')
  const [bpm, setBpm] = useState(128)
  const { isPlaying, togglePlayback } = useAudio()

  const handleGenerate = async event => {
    event.preventDefault()
    setIsGenerating(true)

    setMessages(prevMessages => [...prevMessages, { type: 'user', text: prompt }])

    try {
      if (!window.electron || !window.electron.ipcRenderer) {
        throw new Error('Electron IPC not available')
      }

      const response = await window.electron.ipcRenderer.invoke('generate-midi', prompt)
      console.log('Full Response:', response)

      const formattedMessage = `Sound generation complete!✅`

      setMessages(prevMessages => [...prevMessages, { type: 'api', text: formattedMessage }])
    } catch (error) {
      console.error('Error generating MIDI:', error)
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'api', text: 'Error generating MIDI.' }
      ])
    } finally {
      setIsGenerating(false)
      setPrompt('')
    }
  }

  const handleSingerSelect = singerPrompt => {
    setPrompt(singerPrompt)
  }

  return (
    <div className='app'>
      <div className='sidebar-wrapper'>
        <Sidebar onSingerSelect={handleSingerSelect} />
      </div>
      <main className='main-content'>
        <div className='content-card'>
          <div className='chat-window'>
            {messages.length === 0 ? (
              <div className='empty-state'>What sound are you imagining today?</div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  {message.type === 'user' ? (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='12' cy='12' r='10' stroke='#007bff' strokeWidth='2' />
                      <circle cx='12' cy='10' r='3' fill='#007bff' />
                      <path
                        d='M6 18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18'
                        stroke='#007bff'
                        strokeWidth='2'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='3'
                        y='7'
                        width='18'
                        height='10'
                        rx='2'
                        stroke='#6c757d'
                        strokeWidth='2'
                      />
                      <circle cx='8' cy='12' r='1' fill='#6c757d' />
                      <circle cx='16' cy='12' r='1' fill='#6c757d' />
                      <path d='M12 2V6' stroke='#6c757d' strokeWidth='2' />
                      <path d='M9 22H15' stroke='#6c757d' strokeWidth='2' />
                    </svg>
                  )}
                  <span className='message-text'>{message.text}</span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleGenerate} className='input-form'>
            <div className='input-section'>
              <textarea
                className='prompt-input'
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder='Select an artist from the sidebar or type your own prompt...'
                rows={1}
              />
            </div>

            <button
              type='submit'
              className={`btn btn-primary ${isGenerating ? 'loading' : ''}`}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </form>
        </div>
      </main>

      <style jsx>{`
        .app {
          display: flex;
          width: 100vw;
          height: 100vh;
          background-color: var(--color-bg-primary);
          overflow: hidden;
        }

        .sidebar-wrapper {
          width: 250px;
          min-width: 250px;
          background-color: #666666;
          color: black;
          border-right: 1px solid var(--color-border);
          height: 100vh;
          overflow-y: auto;
        }

        .main-content {
          flex: 1;
          padding: var(--spacing-6);
          height: 100vh;
          overflow-y: auto;
        }

        .content-card {
          height: calc(100vh - 2 * var(--spacing-6));
          display: flex;
          flex-direction: column;
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius);
          border: 1px solid var(--color-border);
        }

        .chat-window {
          flex-grow: 1;
          padding: var(--spacing-4);
          overflow-y: auto;
          margin-bottom: var(--spacing-4);
        }

        .message {
          display: flex;
          align-items: center;
          margin: var(--spacing-2) 0;
          padding: var(--spacing-3);
          border-radius: var(--border-radius);
          max-width: 80%;
        }

        .message.user {
          margin-left: auto;
          background-color: var(--color-button);
          flex-direction: row-reverse;
        }

        .message.api {
          margin-right: auto;
          background-color: var(--color-bg-primary);
        }

        .message-text {
          margin: 0 var(--spacing-3);
          color: var(--color-text-primary);
        }

        .input-form {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px;
          background-color: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border);
          border-radius: 0 0 var(--border-radius) var(--border-radius);
        }

        .input-section {
          flex-grow: 1;
          margin-bottom: 0;
        }

        .prompt-input {
          width: 100%;
          min-height: 60px;
          max-height: 200px;
          padding: 8px 12px;
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          color: var(--color-text-primary);
          font-family: inherit;
          resize: none;
          overflow-y: auto;
        }

        .prompt-input:focus {
          outline: none;
          border-color: var(--color-accent);
        }

        .btn-primary {
          height: 55px;

          white-space: nowrap;
          background-color: var(--color-accent);
          color: var(--color-bg-primary);
          font-size: 20px;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: var(--color-accent-hover);
        }

        .btn-primary.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--color-text-secondary);
          font-size: 2.5rem;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
