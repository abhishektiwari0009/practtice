import { useState } from 'react'
import Display from './Display'
import ButtonGrid from './ButtonGrid'
import History from './History'

const Calculator = () => {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
  const [history, setHistory] = useState([])
  const [justEvaluated, setJustEvaluated] = useState(false)

  const handleButton = (value) => {
    if (value === 'C') {
      setExpression('')
      setResult('0')
      setJustEvaluated(false)
      return
    }

    if (value === 'CE') {
      setExpression(prev => {
        const trimmed = prev.trimEnd()
        const parts = trimmed.split(/([+\-*/])/)
        parts.pop()
        return parts.join('')
      })
      setJustEvaluated(false)
      return
    }

    if (value === '+/-') {
      setExpression(prev => {
        if (!prev) return '-'
        return prev.replace(/(-?\d+\.?\d*)$/, (match) =>
          match.startsWith('-') ? match.slice(1) : '-' + match
        )
      })
      return
    }

    if (value === '%') {
      setExpression(prev =>
        prev.replace(/(-?\d+\.?\d*)$/, (match) =>
          String(parseFloat(match) / 100)
        )
      )
      return
    }

    if (value === '√') {
      try {
        const num = parseFloat(expression || result)
        if (num < 0) { setResult('Error'); setExpression(''); return }
        const sqrtResult = String(parseFloat(Math.sqrt(num).toFixed(10)))
        addToHistory(`√(${num})`, sqrtResult)
        setResult(sqrtResult)
        setExpression('')
        setJustEvaluated(true)
      } catch { setResult('Error') }
      return
    }

    if (value === 'x²') {
      try {
        const num = parseFloat(expression || result)
        const sqResult = String(num * num)
        addToHistory(`(${num})²`, sqResult)
        setResult(sqResult)
        setExpression('')
        setJustEvaluated(true)
      } catch { setResult('Error') }
      return
    }

    if (value === '=') {
      if (!expression) return
      try {
        // eslint-disable-next-line no-new-func
        const evalResult = Function('"use strict"; return (' + expression + ')')()
        if (!isFinite(evalResult)) { setResult('Error'); setExpression(''); return }
        const finalResult = parseFloat(evalResult.toFixed(10)).toString()
        addToHistory(expression, finalResult)
        setResult(finalResult)
        setExpression('')
        setJustEvaluated(true)
      } catch { setResult('Error'); setExpression('') }
      return
    }

    const operators = ['+', '-', '*', '/']
    if (operators.includes(value)) {
      if (justEvaluated) {
        setExpression(result + value)
        setJustEvaluated(false)
        return
      }
      setExpression(prev => {
        if (!prev) return result + value
        return prev.replace(/[+\-*/]$/, '') + value
      })
      return
    }

    if (value === '.') {
      setExpression(prev => {
        const parts = prev.split(/[+\-*/]/)
        const lastPart = parts[parts.length - 1]
        if (lastPart.includes('.')) return prev
        if (justEvaluated) { setJustEvaluated(false); return '0.' }
        return prev + value
      })
      return
    }

    if (justEvaluated) {
      setExpression(value)
      setJustEvaluated(false)
      return
    }

    setExpression(prev => prev + value)
  }

  const addToHistory = (expr, res) => {
    setHistory(prev => [{ expr, res }, ...prev].slice(0, 10))
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-4 tracking-wide">
        Calculator
      </h2>
      <Display expression={expression} result={result} />
      <ButtonGrid onButton={handleButton} />
      <History
        history={history}
        onClear={() => setHistory([])}
        onReuse={(res) => { setExpression(res); setResult(res); setJustEvaluated(false) }}
      />
    </div>
  )
}

export default Calculator
