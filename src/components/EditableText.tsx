import { useEffect, useRef } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  className?: string
  placeholder?: string
  ariaLabel?: string
}

// A contentEditable text node that stays in sync with external state
// (e.g. after "Regenerate") without moving the caret while the user types.
export default function EditableText({
  value,
  onChange,
  className,
  placeholder,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el && el.innerText !== value) {
      el.innerText = value
    }
  }, [value])

  return (
    <div
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline="true"
      aria-label={ariaLabel}
      data-placeholder={placeholder}
      onInput={(e) => onChange((e.currentTarget as HTMLDivElement).innerText)}
    />
  )
}
