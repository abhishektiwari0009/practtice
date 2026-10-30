const History = ({ history, onClear, onReuse }) => {
  if (history.length === 0) return null

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">History</span>
        <button
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-600 border border-gray-200 hover:bg-red-50 rounded-md px-2 py-0.5 transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>
      <ul className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
        {history.map((item, i) => (
          <li
            key={i}
            onClick={() => onReuse(item.res)}
            className="flex justify-between items-center px-3 py-1.5 bg-gray-50 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors text-sm"
          >
            <span className="text-gray-400 truncate mr-2">{item.expr}</span>
            <span className="text-blue-500 font-semibold whitespace-nowrap">= {item.res}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
