'use client'
import React, { useEffect, useState } from 'react'
import { Menu as MenuIcon } from '@mui/icons-material'
import MenuList from './MenuList'
import './HeaderMenu.css'

const HeaderMenu = () => {
  const [open, setOpen] = useState(false)
  function listener(e: any) {
    if (!e.target?.id?.startsWith('Header-Anchor-')) {
      if (e.target?.parentNode?.id?.startsWith('Header-Anchor-')) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    } else {
      setOpen(true)
    }
  }
  useEffect(() => {
    window.addEventListener('click', listener)
    return () => {
      window.removeEventListener('click', listener)
    }
  }, [])

  return (
    <div id="Header-Anchor-Menu">
      <MenuIcon id="Header-Anchor-Icon" />
      <div style={{ maxWidth: '100%', padding: '0 4px' }}>
        {open && (
          <div className="Hader-Menu-List">
            <MenuList />
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderMenu
