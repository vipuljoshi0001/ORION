export const HeatmapLegend = () => (
  <div className="flex items-center gap-2 text-xs text-comet font-mono">
    <span>Less</span>
    {[
      'bg-space-600 border border-space-500/50',
      'bg-green-900', 'bg-green-700', 'bg-green-500', 'bg-green-400'
    ].map((c, i) => (
      <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
    ))}
    <span>More</span>
  </div>
);