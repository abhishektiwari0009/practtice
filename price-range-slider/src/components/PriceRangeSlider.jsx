import { useState, useRef, useCallback, useEffect } from 'react'

const MIN_PRICE = 0
const MAX_PRICE = 10000
const STEP = 50
const GAP = 500 // minimum gap between min and max thumbs

export default function PriceRangeSlider() {
  const [minVal, setMinVal] = useState(1000)
  const [maxVal, setMaxVal] = useState(7500)
  const rangeRef = useRef(null)

  // Keep track of dragging state
  const dragging = useRef(null) // 'min' | 'max' | null

  const clamp = (val, lo, hi) => Math.min(Math.max(val, lo), hi)

  const toPercent = (val) => ((val - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  const fromPercent = (pct) =>
    Math.round((pct / 100) * (MAX_PRICE - MIN_PRICE) + MIN_PRICE)

  // Snap to nearest step
  const snap = (val) => Math.round(val / STEP) * STEP

  const getPercentFromPointer = useCallback((clientX) => {
    if (!rangeRef.current) return 0
    const rect = rangeRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    return clamp(pct, 0, 100)
  }, [])

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragging.current) return
      const pct = getPercentFromPointer(e.clientX)
      const raw = fromPercent(pct)
      const snapped = snap(clamp(raw, MIN_PRICE, MAX_PRICE))

      if (dragging.current === 'min') {
        setMinVal((prev) => {
          const next = clamp(snapped, MIN_PRICE, maxVal - GAP)
          return next !== prev ? next : prev
        })
      } else {
        setMaxVal((prev) => {
          const next = clamp(snapped, minVal + GAP, MAX_PRICE)
          return next !== prev ? next : prev
        })
      }
    },
    [getPercentFromPointer, minVal, maxVal]
  )

  const handlePointerUp = useCallback(() => {
    dragging.current = null
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }, [handlePointerMove])

  const startDrag = useCallback(
    (thumb) => (e) => {
      e.preventDefault()
      dragging.current = thumb
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    },
    [handlePointerMove, handlePointerUp]
  )

  // Touch support via pointer events (already handled above)

  const minPct = toPercent(minVal)
  const maxPct = toPercent(maxVal)

  const formatPrice = (val) =>
    val >= 1000
      ? `₹${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k`
      : `₹${val}`

  const presets = [
    { label: 'Under ₹1k', min: 0, max: 1000 },
    { label: '₹1k – ₹3k', min: 1000, max: 3000 },
    { label: '₹3k – ₹6k', min: 3000, max: 6000 },
    { label: '₹6k – ₹10k', min: 6000, max: 10000 },
  ]

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold tracking-tight">Price Range</h2>
          <p className="text-gray-400 text-sm mt-1">Filter products by price</p>
        </div>

        {/* Price badges */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-center min-w-[90px]">
            <p className="text-gray-500 text-xs mb-0.5 uppercase tracking-wider">Min</p>
            <p className="text-indigo-400 font-bold text-lg">{formatPrice(minVal)}</p>
          </div>
          <div className="flex-1 mx-4 flex items-center">
            <div className="h-px w-full bg-gray-700"></div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-center min-w-[90px]">
            <p className="text-gray-500 text-xs mb-0.5 uppercase tracking-wider">Max</p>
            <p className="text-indigo-400 font-bold text-lg">{formatPrice(maxVal)}</p>
          </div>
        </div>

        {/* Slider track */}
        <div className="relative mt-4 mb-8 select-none" ref={rangeRef}>
          {/* Base track */}
          <div className="h-2 rounded-full bg-gray-700 relative">
            {/* Active fill */}
            <div
              className="absolute h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
            />
          </div>

          {/* Min thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-indigo-500 shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-20 touch-none"
            style={{ left: `${minPct}%` }}
            onPointerDown={startDrag('min')}
            role="slider"
            aria-label="Minimum price"
            aria-valuemin={MIN_PRICE}
            aria-valuemax={maxVal - GAP}
            aria-valuenow={minVal}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                setMinVal((v) => snap(clamp(v + STEP, MIN_PRICE, maxVal - GAP)))
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                setMinVal((v) => snap(clamp(v - STEP, MIN_PRICE, maxVal - GAP)))
              }
            }}
          />

          {/* Max thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-violet-500 shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-20 touch-none"
            style={{ left: `${maxPct}%` }}
            onPointerDown={startDrag('max')}
            role="slider"
            aria-label="Maximum price"
            aria-valuemin={minVal + GAP}
            aria-valuemax={MAX_PRICE}
            aria-valuenow={maxVal}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                setMaxVal((v) => snap(clamp(v + STEP, minVal + GAP, MAX_PRICE)))
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                setMaxVal((v) => snap(clamp(v - STEP, minVal + GAP, MAX_PRICE)))
              }
            }}
          />
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-gray-600 text-xs mb-8 px-1">
          <span>₹0</span>
          <span>₹2.5k</span>
          <span>₹5k</span>
          <span>₹7.5k</span>
          <span>₹10k</span>
        </div>

        {/* Preset buttons */}
        <div className="mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Quick select</p>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p) => {
              const active = minVal === p.min && maxVal === p.max
              return (
                <button
                  key={p.label}
                  onClick={() => {
                    setMinVal(p.min)
                    setMaxVal(p.max)
                  }}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer
                    ${
                      active
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
                    }`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Apply button */}
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm tracking-wide hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-indigo-500/25 cursor-pointer"
          onClick={() => alert(`Filtering: ${formatPrice(minVal)} – ${formatPrice(maxVal)}`)}
        >
          Apply Filter
        </button>

        {/* Range summary */}
        <p className="text-center text-gray-600 text-xs mt-4">
          Showing results between{' '}
          <span className="text-gray-400">{formatPrice(minVal)}</span> and{' '}
          <span className="text-gray-400">{formatPrice(maxVal)}</span>
        </p>
      </div>
    </div>
  )
}
