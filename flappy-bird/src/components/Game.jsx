import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Constants ───────────────────────────────────────────────────────────────
const W = 400
const H = 600
const GRAVITY = 0.15
const JUMP = -5
const PIPE_W = 60
const PIPE_GAP = 180
const PIPE_SPEED = 1.6
const PIPE_INTERVAL = 2200
const BIRD_X = 80
const BIRD_SIZE = 30
const GROUND_H = 70

// ─── Draw helpers ─────────────────────────────────────────────────────────────
function drawBackground(ctx) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H - GROUND_H)
  skyGrad.addColorStop(0, '#87CEEB')
  skyGrad.addColorStop(1, '#c9eeff')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, W, H - GROUND_H)

  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  const clouds = [[60, 80, 50], [160, 50, 35], [280, 100, 45], [340, 60, 30]]
  clouds.forEach(([x, y, r]) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.arc(x + r * 0.6, y - r * 0.2, r * 0.7, 0, Math.PI * 2)
    ctx.arc(x - r * 0.6, y - r * 0.1, r * 0.6, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.fillStyle = '#8B6914'
  ctx.fillRect(0, H - GROUND_H, W, GROUND_H)
  ctx.fillStyle = '#5a8a00'
  ctx.fillRect(0, H - GROUND_H, W, 18)
  ctx.strokeStyle = '#4a7a00'
  ctx.lineWidth = 1
  for (let i = 0; i < W; i += 20) {
    ctx.beginPath()
    ctx.moveTo(i, H - GROUND_H + 5)
    ctx.lineTo(i + 10, H - GROUND_H + 16)
    ctx.stroke()
  }
}

function drawBird(ctx, y, vel) {
  const cx = BIRD_X + BIRD_SIZE / 2
  const cy = y + BIRD_SIZE / 2
  const angle = Math.min(Math.max(vel * 0.06, -0.4), 1.0)

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(angle)

  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.ellipse(0, 0, BIRD_SIZE / 2, BIRD_SIZE / 2 - 2, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#FFA500'
  ctx.beginPath()
  ctx.ellipse(-4, 2, 10, 6, -0.3, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(8, -5, 6, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#111'
  ctx.beginPath()
  ctx.arc(9, -5, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(10, -6.5, 1.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#FF6B00'
  ctx.beginPath()
  ctx.moveTo(13, -1)
  ctx.lineTo(22, 2)
  ctx.lineTo(13, 5)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

function drawPipe(ctx, pipe) {
  const grad = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_W, 0)
  grad.addColorStop(0, '#4CAF50')
  grad.addColorStop(0.4, '#66BB6A')
  grad.addColorStop(1, '#2E7D32')

  ctx.fillStyle = grad
  ctx.fillRect(pipe.x, 0, PIPE_W, pipe.top)
  ctx.fillStyle = '#388E3C'
  ctx.fillRect(pipe.x - 5, pipe.top - 28, PIPE_W + 10, 28)

  ctx.fillStyle = grad
  ctx.fillRect(pipe.x, pipe.top + PIPE_GAP, PIPE_W, H - GROUND_H - pipe.top - PIPE_GAP)
  ctx.fillStyle = '#388E3C'
  ctx.fillRect(pipe.x - 5, pipe.top + PIPE_GAP, PIPE_W + 10, 28)

  ctx.fillStyle = 'rgba(255,255,255,0.15)'
  ctx.fillRect(pipe.x + 8, 0, 10, pipe.top)
  ctx.fillRect(pipe.x + 8, pipe.top + PIPE_GAP, 10, H - GROUND_H - pipe.top - PIPE_GAP)
}

function drawScore(ctx, score) {
  ctx.fillStyle = 'white'
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 4
  ctx.font = 'bold 42px Arial'
  ctx.textAlign = 'center'
  ctx.strokeText(score, W / 2, 70)
  ctx.fillText(score, W / 2, 70)
}

// ─── Component ────────────────────────────────────────────────────────────────
const Game = () => {
  const canvasRef = useRef(null)

  const [phase, setPhase] = useState('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  const gameRef = useRef({
    birdY: H / 2 - 20,
    birdVel: 0,
    pipes: [],
    score: 0,
    best: 0,
    lastPipeTime: 0,
    scoredPipes: new Set(),
  })

  const phaseRef = useRef('idle')
  const updatePhase = (p) => {
    phaseRef.current = p
    setPhase(p)
  }

  const resetGame = useCallback(() => {
    const g = gameRef.current
    g.birdY = H / 2 - 20
    g.birdVel = 0
    g.pipes = []
    g.score = 0
    g.lastPipeTime = 0
    g.scoredPipes = new Set()
    setScore(0)
  }, [])

  const jump = useCallback(() => {
    const g = gameRef.current
    const currentPhase = phaseRef.current

    if (currentPhase === 'idle') {
      updatePhase('playing')
      g.birdVel = JUMP
    } else if (currentPhase === 'playing') {
      g.birdVel = JUMP
    } else if (currentPhase === 'dead') {
      const newBest = Math.max(g.best, g.score)
      g.best = newBest
      setBest(newBest)
      resetGame()
      updatePhase('playing')
      g.birdVel = JUMP
    }
  }, [resetGame])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const g = gameRef.current
    let rafId

    const spawnPipe = (now) => {
      const minTop = 60
      const maxTop = H - GROUND_H - PIPE_GAP - 60
      const top = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop
      g.pipes.push({ x: W, top, id: now })
    }

    const checkCollision = () => {
      const bx = BIRD_X
      const by = g.birdY
      const margin = 4

      if (by + BIRD_SIZE >= H - GROUND_H || by <= 0) return true

      for (const pipe of g.pipes) {
        const inX = bx + BIRD_SIZE - margin > pipe.x + margin &&
                    bx + margin < pipe.x + PIPE_W - margin
        if (inX) {
          const inTopPipe = by + margin < pipe.top
          const inBotPipe = by + BIRD_SIZE - margin > pipe.top + PIPE_GAP
          if (inTopPipe || inBotPipe) return true
        }
      }
      return false
    }

    const loop = (ts) => {
      ctx.clearRect(0, 0, W, H)
      drawBackground(ctx)

      if (phaseRef.current === 'playing') {
        g.birdVel += GRAVITY
        g.birdY += g.birdVel

        if (ts - g.lastPipeTime > PIPE_INTERVAL) {
          spawnPipe(ts)
          g.lastPipeTime = ts
        }

        g.pipes = g.pipes.filter(p => p.x + PIPE_W > 0)
        g.pipes.forEach(p => { p.x -= PIPE_SPEED })

        g.pipes.forEach(p => {
          if (!g.scoredPipes.has(p.id) && p.x + PIPE_W < BIRD_X) {
            g.score++
            g.scoredPipes.add(p.id)
            setScore(g.score)
          }
        })

        if (checkCollision()) {
          const newBest = Math.max(g.best, g.score)
          g.best = newBest
          setBest(newBest)
          updatePhase('dead')
        }
      }

      g.pipes.forEach(p => drawPipe(ctx, p))
      drawBird(ctx, g.birdY, g.birdVel)

      if (phaseRef.current === 'playing') {
        drawScore(ctx, g.score)
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [jump])

  return (
    <div className="relative select-none" style={{ width: W, height: H }}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={jump}
        className="block cursor-pointer rounded-2xl shadow-2xl"
      />

      {phase === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white/90 rounded-2xl px-10 py-8 flex flex-col items-center gap-4 shadow-xl">
            <div className="text-5xl">🐦</div>
            <h1 className="text-3xl font-extrabold text-yellow-500 tracking-wide drop-shadow">
              Flappy Bird
            </h1>
            <p className="text-gray-600 text-sm text-center">
              Press <kbd className="bg-gray-200 px-2 py-0.5 rounded font-mono text-xs">Space</kbd> or tap to flap
            </p>
            <button
              onClick={jump}
              className="mt-2 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-white font-bold text-lg px-8 py-3 rounded-full shadow-md transition-all duration-150 cursor-pointer"
            >
              ▶ Play
            </button>
          </div>
        </div>
      )}

      {phase === 'dead' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/40 backdrop-blur-[1px]">
          <div className="bg-white/95 rounded-2xl px-10 py-8 flex flex-col items-center gap-4 shadow-xl">
            <div className="text-4xl">💀</div>
            <h2 className="text-2xl font-extrabold text-red-500">Game Over</h2>
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Score</p>
                <p className="text-4xl font-black text-gray-800">{score}</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Best</p>
                <p className="text-4xl font-black text-yellow-500">{best}</p>
              </div>
            </div>
            <button
              onClick={jump}
              className="mt-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold text-lg px-8 py-3 rounded-full shadow-md transition-all duration-150 cursor-pointer"
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      )}

      {phase === 'playing' && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
          <span className="text-white/50 text-xs">Click or Space to flap</span>
        </div>
      )}
    </div>
  )
}

export default Game
