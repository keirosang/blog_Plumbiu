'use client'

import './index.css'
import { useState } from 'react'
import { MoonIcon, SunIcon } from '@/components/icons'

let anchor: HTMLElement

const HeaderToggle = () => {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  function toggleTheme() {
    const theme = mode === 'dark' ? 'light' : 'dark'
    if (!anchor) {
      anchor = document.documentElement
    }
    anchor.setAttribute('theme', theme)
    setMode(theme)
  }

  return (
    <div className="Header-Toggle Hover" onClick={toggleTheme}>
      {mode === 'light' ? <SunIcon /> : <MoonIcon />}
    </div>
  )
}

export default HeaderToggle
