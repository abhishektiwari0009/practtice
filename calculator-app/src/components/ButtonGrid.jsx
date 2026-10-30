const buttons = [
  ['CE', '+/-', '%', '/'],
  ['7',  '8',   '9',  '*'],
  ['4',  '5',   '6',  '-'],
  ['1',  '2',   '3',  '+'],
  ['√',  '0',   '.',  '='],
  ['x²', 'C'],
]

const getStyle = (btn) => {
  if (btn === '=')
    return 'bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold shadow-md shadow-blue-200'
  if (['+', '-', '*', '/'].includes(btn))
    return 'bg-blue-100 hover:bg-blue-200 text-blue-600 text-xl font-bold'
  if (['C', 'CE'].includes(btn))
    return 'bg-red-100 hover:bg-red-200 text-red-600 font-semibold'
  if (['%', '+/-', '√', 'x²'].includes(btn))
    return 'bg-green-100 hover:bg-green-200 text-green-700 font-semibold'
  return 'bg-gray-100 hover:bg-gray-200 text-gray-800'
}

const ButtonGrid = ({ onButton }) => {
  return (
    <div className="flex flex-col gap-2.5">
      {buttons.map((row, ri) => (
        <div key={ri} className="flex gap-2.5">
          {row.map((btn) => (
            <button
              key={btn}
              onClick={() => onButton(btn)}
              className={`flex-1 h-13 rounded-xl text-base cursor-pointer transition-all duration-150 active:scale-95 ${getStyle(btn)}`}
            >
              {btn}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ButtonGrid
