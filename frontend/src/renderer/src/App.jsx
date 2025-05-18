'use client'
import React from 'react'
import { useState } from 'react'
import Sidebar from './components/sidebar'
import MainContent from './components/main-content'
import { AudioProvider } from './context/audio-context'

export default function Page () {
  const [selectedPlugin, setSelectedPlugin] = useState('melody')

  return (
    <AudioProvider>
      <div className='grid-container'>
        <MainContent selectedPlugin={selectedPlugin} />
      </div>
    </AudioProvider>
  )
}
