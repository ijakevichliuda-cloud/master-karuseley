import { useMemo, useState } from 'react'
import type { Carousel, Lang, Slide, SlideRole } from './types'
import { LANGS, LANG_LABELS } from './types'
import { UI } from './i18n'
import {
  buildSlideText,
  generateCarousel,
  newId,
  randomSeed,
} from './content'
import SlideCard from './components/SlideCard'

const ACCENT_PRESETS = [
  '#6d5efc',
  '#f4478f',
  '#ff7a45',
  '#12b886',
  '#2f7bff',
  '#111827',
]

// Recompute the 1-based number of a point slide from its position in the list.
function pointNumberOf(slides: Slide[], index: number): number {
  let n = 0
  for (let i = 0; i <= index; i++) {
    if (slides[i].role === 'point') n += 1
  }
  return n
}

export default function App() {
  const [uiLang, setUiLang] = useState<Lang>('ru')
  const [contentLang, setContentLang] = useState<Lang>('ru')
  const [topic, setTopic] = useState('')
  const [slideCount, setSlideCount] = useState(5)
  const [accent, setAccent] = useState(ACCENT_PRESETS[0])
  const [carousel, setCarousel] = useState<Carousel | null>(null)
  const [error, setError] = useState('')

  const t = UI[uiLang]

  const create = () => {
    if (!topic.trim()) {
      setError(t.topicRequired)
      return
    }
    setError('')
    setCarousel({
      topic: topic.trim(),
      lang: contentLang,
      slides: generateCarousel(topic, contentLang, slideCount),
    })
  }

  const regenerateAll = () => {
    if (!carousel) return
    setCarousel({
      ...carousel,
      slides: generateCarousel(carousel.topic, carousel.lang, carousel.slides.length),
    })
  }

  // --- per-slide operations ------------------------------------------------

  const updateSlide = (id: string, patch: Partial<Slide>) => {
    setCarousel((c) =>
      c ? { ...c, slides: c.slides.map((s) => (s.id === id ? { ...s, ...patch } : s)) } : c,
    )
  }

  const regenerateSlide = (id: string) => {
    setCarousel((c) => {
      if (!c) return c
      const index = c.slides.findIndex((s) => s.id === id)
      if (index < 0) return c
      const slide = c.slides[index]
      const pointNumber = pointNumberOf(c.slides, index)

      // Roll new seeds until the text actually differs from the current slide,
      // so "Regenerate" always feels like a fresh variant.
      let seed = randomSeed()
      let text = buildSlideText(slide.role, c.topic, c.lang, seed, pointNumber)
      for (let attempt = 0; attempt < 8; attempt++) {
        if (text.title !== slide.title || text.body !== slide.body) break
        seed = randomSeed()
        text = buildSlideText(slide.role, c.topic, c.lang, seed, pointNumber)
      }

      const slides = [...c.slides]
      slides[index] = { ...slide, title: text.title, body: text.body, variantSeed: seed }
      return { ...c, slides }
    })
  }

  const deleteSlide = (id: string) => {
    setCarousel((c) =>
      c && c.slides.length > 1
        ? { ...c, slides: c.slides.filter((s) => s.id !== id) }
        : c,
    )
  }

  const addSlideAfter = (id: string) => {
    setCarousel((c) => {
      if (!c) return c
      const index = c.slides.findIndex((s) => s.id === id)
      if (index < 0) return c
      const role: SlideRole = 'point'
      const seed = randomSeed()
      const pointNumber = pointNumberOf(c.slides, index) + 1
      const text = buildSlideText(role, c.topic, c.lang, seed, pointNumber)
      const newSlide: Slide = {
        id: newId(),
        role,
        title: text.title,
        body: text.body,
        variantSeed: seed,
      }
      const slides = [...c.slides]
      slides.splice(index + 1, 0, newSlide)
      return { ...c, slides }
    })
  }

  const moveSlide = (id: string, dir: -1 | 1) => {
    setCarousel((c) => {
      if (!c) return c
      const index = c.slides.findIndex((s) => s.id === id)
      const target = index + dir
      if (index < 0 || target < 0 || target >= c.slides.length) return c
      const slides = [...c.slides]
      ;[slides[index], slides[target]] = [slides[target], slides[index]]
      return { ...c, slides }
    })
  }

  const rootStyle = useMemo(
    () => ({ ['--accent' as string]: accent }),
    [accent],
  )

  return (
    <div className="app" style={rootStyle}>
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <div>
            <h1>{t.appTitle}</h1>
            <p>{t.appSubtitle}</p>
          </div>
        </div>
        <label className="ui-lang">
          <span>{t.uiLangLabel}</span>
          <select value={uiLang} onChange={(e) => setUiLang(e.target.value as Lang)}>
            {LANGS.map((l) => (
              <option key={l} value={l}>
                {LANG_LABELS[l]}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="controls">
        <div className="control control-topic">
          <label htmlFor="topic">{t.topicLabel}</label>
          <input
            id="topic"
            type="text"
            value={topic}
            placeholder={t.topicPlaceholder}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && create()}
          />
        </div>

        <div className="control">
          <label htmlFor="count">
            {t.slidesCountLabel}: <b>{slideCount}</b>
          </label>
          <input
            id="count"
            type="range"
            min={3}
            max={10}
            value={slideCount}
            onChange={(e) => setSlideCount(Number(e.target.value))}
          />
        </div>

        <div className="control">
          <label htmlFor="clang">{t.contentLangLabel}</label>
          <select
            id="clang"
            value={contentLang}
            onChange={(e) => setContentLang(e.target.value as Lang)}
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>
                {LANG_LABELS[l]}
              </option>
            ))}
          </select>
        </div>

        <div className="control">
          <label>{t.accentColorLabel}</label>
          <div className="accent-row">
            <div className="accent-presets">
              {ACCENT_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={'swatch' + (c === accent ? ' active' : '')}
                  style={{ background: c }}
                  onClick={() => setAccent(c)}
                  aria-label={c}
                />
              ))}
            </div>
            <input
              type="color"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              aria-label={t.accentColorLabel}
            />
          </div>
        </div>

        <div className="control control-actions">
          <button type="button" className="btn btn-primary" onClick={create}>
            {t.createButton}
          </button>
          {carousel && (
            <button type="button" className="btn btn-ghost" onClick={regenerateAll}>
              {t.regenerateAllButton}
            </button>
          )}
        </div>
      </section>

      {error && <p className="error">{error}</p>}

      {!carousel ? (
        <div className="empty">
          <div className="empty-card">
            <h2>{t.emptyTitle}</h2>
            <p>{t.emptyText}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="gallery-hint">{t.downloadAllHint}</p>
          <div className="gallery">
            {carousel.slides.map((slide, i) => (
              <SlideCard
                key={slide.id}
                slide={slide}
                index={i}
                total={carousel.slides.length}
                topic={carousel.topic}
                accent={accent}
                ui={t}
                canDelete={carousel.slides.length > 1}
                onChange={(patch) => updateSlide(slide.id, patch)}
                onRegenerate={() => regenerateSlide(slide.id)}
                onDelete={() => deleteSlide(slide.id)}
                onAddAfter={() => addSlideAfter(slide.id)}
                onMoveLeft={() => moveSlide(slide.id, -1)}
                onMoveRight={() => moveSlide(slide.id, 1)}
              />
            ))}
          </div>
        </>
      )}

      <footer className="app-footer">{t.footer}</footer>
    </div>
  )
}
