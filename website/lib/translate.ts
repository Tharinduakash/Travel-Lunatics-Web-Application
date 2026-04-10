'use server'

import { cache } from 'react'

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || ''
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2'

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja'

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
  ja: '日本語',
}

export const LANGUAGE_CODES: Record<SupportedLanguage, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  zh: 'zh-CN',
  ja: 'ja',
}

// In-memory cache for translations
const translationCache: Map<string, string> = new Map()

export async function translateText(
  text: string,
  targetLanguage: SupportedLanguage
): Promise<string> {
  // Return original if target is English
  if (targetLanguage === 'en') {
    return text
  }

  // Check cache
  const cacheKey = `${text}:${targetLanguage}`
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  // If no API key, return original text
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.warn('GOOGLE_TRANSLATE_API_KEY not set, returning original text')
    return text
  }

  try {
    const response = await fetch(GOOGLE_TRANSLATE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: LANGUAGE_CODES[targetLanguage],
        key: GOOGLE_TRANSLATE_API_KEY,
      }),
    })

    if (!response.ok) {
      console.error('Translation API error:', response.statusText)
      return text
    }

    const data = await response.json()
    const translatedText = data.data.translations[0].translatedText

    // Cache the translation
    translationCache.set(cacheKey, translatedText)

    return translatedText
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

// Batch translate multiple texts
export async function translateTexts(
  texts: string[],
  targetLanguage: SupportedLanguage
): Promise<string[]> {
  if (targetLanguage === 'en') {
    return texts
  }

  return Promise.all(
    texts.map((text) => translateText(text, targetLanguage))
  )
}
