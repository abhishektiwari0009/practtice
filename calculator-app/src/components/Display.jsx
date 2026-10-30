const Display = ({ expression, result }) => {
  return (
    <div className="bg-gray-900 rounded-xl px-5 py-4 mb-4 min-h-[90px] flex flex-col items-end justify-end gap-1">
      <div className="text-gray-400 text-sm min-h-5 text-right break-all">
        {expression || '\u00a0'}
      </div>
      <div className="text-white text-4xl font-bold text-right break-all tracking-tight">
        {result}
      </div>
    </div>
  )
}

export default Display
