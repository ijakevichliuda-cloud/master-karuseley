import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import type { Slide } from '../types'
import type { UIStrings } from '../i18n'
import EditableText from './EditableText'

interface Props {
  slide: Slide
  index: number
  total: number
  topic: string
  accent: string
  ui: UIStrings
  canDelete: boolean
  onChange: (patch: Partial<Slide>) => void
  onRegenerate: () => void
  onDelete: () => void
  onAddAfter: () => void
  onMoveLeft: () => void
  onMoveRight: () => void
}

export default function SlideCard({
  slide,
  index,
  total,
  topic,
  accent,
  ui,
  canDelete,
  onChange,
  onRegenerate,
  onDelete,
  onAddAfter,
  onMoveLeft,
  onMoveRight,
}: Props) {
  const slideRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  const download = async () => {
    const node = slideRef.current
    if (!node) return
    setBusy(true)
    try {
      // Export at ~1080px wide (Instagram 4:5 => 1080x1350) regardless of preview size.
      const ratio = 1080 / node.clientWidth
      const dataUrl = await toPng(node, {
        pixelRatio: ratio,
        cacheBust: true,
        backgroundColor: '#ffffff',
      })
      const link = document.createElement('a')
      link.download = `slide-${index + 1}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('PNG export failed', err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="slide-card">
      <div
        ref={slideRef}
        className={`slide slide-${slide.role}`}
        style={{ ['--accent' as string]: accent }}
      >
        <div className="slide-deco" aria-hidden="true" />
        <div className="slide-top">
          <span className="slide-badge">
            {index + 1}
            <i>/{total}</i>
          </span>
        </div>

        <div className="slide-content">
          <EditableText
            className="slide-title"
            value={slide.title}
            placeholder={ui.titlePlaceholder}
            ariaLabel={ui.titlePlaceholder}
            onChange={(v) => onChange({ title: v })}
          />
          <EditableText
            className="slide-body"
            value={slide.body}
            placeholder={ui.bodyPlaceholder}
            ariaLabel={ui.bodyPlaceholder}
            onChange={(v) => onChange({ body: v })}
          />
        </div>

        <div className="slide-foot">
          <span className="slide-dots" aria-hidden="true">
            {Array.from({ length: total }).map((_, i) => (
              <i key={i} className={i === index ? 'on' : ''} />
            ))}
          </span>
          <span className="slide-topic">{topic}</span>
        </div>
      </div>

      <div className="slide-meta">
        <span className="slide-label">
          {ui.slideWord} {index + 1} {ui.ofWord} {total}
        </span>
        <span className="slide-edit-hint">{ui.editHint}</span>
      </div>

      <div className="slide-toolbar">
        <button
          type="button"
          className="btn btn-accent"
          onClick={onRegenerate}
          title={ui.regenerate}
        >
          ↻ {ui.regenerate}
        </button>
        <button
          type="button"
          className="btn btn-soft"
          onClick={download}
          disabled={busy}
          title={ui.download}
        >
          ⬇ {ui.download}
        </button>
      </div>

      <div className="slide-toolbar slide-toolbar-secondary">
        <button type="button" className="icon-btn" onClick={onMoveLeft} title={ui.moveLeft} disabled={index === 0}>
          ←
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={onMoveRight}
          title={ui.moveRight}
          disabled={index === total - 1}
        >
          →
        </button>
        <button type="button" className="icon-btn" onClick={onAddAfter} title={ui.addSlide}>
          +
        </button>
        <button
          type="button"
          className="icon-btn icon-danger"
          onClick={onDelete}
          title={ui.deleteSlide}
          disabled={!canDelete}
        >
          🗑
        </button>
      </div>
    </div>
  )
}
