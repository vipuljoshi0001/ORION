export const HeatmapLegend = () => (
  <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
    <span>Less</span>
    {[
      'bg-gray-900 border border-gray-800',
      'bg-emerald-900',
      'bg-emerald-700',
      'bg-emerald-500',
      'bg-emerald-400',
    ].map((c, i) => (
      <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
    ))}
    <span>More</span>
  </div>
);