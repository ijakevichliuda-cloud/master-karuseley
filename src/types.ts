// Supported languages (shared by UI and carousel content)
export type Lang = 'ru' | 'uk' | 'en' | 'pl'

export const LANGS: Lang[] = ['ru', 'uk', 'en', 'pl']

export const LANG_LABELS: Record<Lang, string> = {
  ru: 'Русский',
  uk: 'Українська',
  en: 'English',
  pl: 'Polski',
}

// Role of a slide within the carousel — controls which text templates are used.
export type SlideRole = 'intro' | 'point' | 'outro'

export interface Slide {
  id: string
  role: SlideRole
  title: string
  body: string
  // Index used for numbering "point" slides (1, 2, 3 ...). Recomputed on render.
  variantSeed: number
}

export interface Carousel {
  topic: string
  lang: Lang
  slides: Slide[]
}
