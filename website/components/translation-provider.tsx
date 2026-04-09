'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { SupportedLanguage } from '@/lib/translate'
import { translateText } from '@/lib/translate'

interface TranslationContextType {
  currentLanguage: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  translate: (text: string) => Promise<string>
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
)

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en')
  const [isLoading, setIsLoading] = useState(false)

  const translate = useCallback(
    async (text: string): Promise<string> => {
      if (currentLanguage === 'en') {
        return text
      }

      setIsLoading(true)
      try {
        const result = await translateText(text, currentLanguage)
        return result
      } finally {
        setIsLoading(false)
      }
    },
    [currentLanguage]
  )

  const handleSetLanguage = useCallback((lang: SupportedLanguage) => {
    setCurrentLanguage(lang)
  }, [])

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setLanguage: handleSetLanguage,
        translate,
        isLoading,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}
