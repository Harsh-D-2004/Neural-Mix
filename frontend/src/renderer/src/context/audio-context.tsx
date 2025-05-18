'use client'
import React from 'react'
import { createContext, useContext, useState, type ReactNode } from 'react'

interface AudioContextType {
  isPlaying: boolean
  togglePlayback: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlayback }}>{children}</AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
