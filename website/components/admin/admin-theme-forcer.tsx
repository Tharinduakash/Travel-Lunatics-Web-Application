'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function AdminThemeForcer() {
  const { setTheme } = useTheme()

  useEffect(() => {
    const previous = localStorage.getItem('theme') ?? 'light'

    // Tell next-themes to switch to light (updates localStorage + html class)
    setTheme('light')

    // Also do it directly on the DOM immediately, in case next-themes re-hydrates later
    const html = document.documentElement
    html.classList.remove('dark')
    html.classList.add('light')

    return () => {
      setTheme(previous)
      if (previous === 'dark') {
        html.classList.remove('light')
        html.classList.add('dark')
      }
    }
  }, [setTheme])

  return null
}
