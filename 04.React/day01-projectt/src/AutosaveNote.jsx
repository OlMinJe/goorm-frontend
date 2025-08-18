import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export default function AutoSaveNote() {
  const [text, setText] = useState("")
  const [saving, setSaving] = useState(false)

  const timerRef = useRef(null)
  const fristRender = useRef(true)

  const onChange = useCallback((e) => setText(e.target.value), [])

  useEffect(() => {
    if (fristRender.current) {
      fristRender.current = false
      return
    }

    setSaving(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setSaving(false)
      timerRef.current = null
    })
  }, [text])

  const info = useMemo(() => {
    const len = text.trim().length
    return `${len} chars / ${saving ? "Saving_" : "Saved"}`
  }, [text, saving])
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
      <textarea
        value={text}
        onChange={onChange}
        rows={4}
        placeholder="메모를 입력하면 0.5초 뒤 자동 저장됩니다"
        style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
      />
      <small
        aria-live="polite"
        aria-atomic="true"
        style={{ color: saving ? "#d97706" : "#16a34a" }}
      >
        {info}
      </small>
    </div>
  )
}
