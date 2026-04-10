export function ColorLegend() {
  return (
    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
      <span>Less Sun</span>
      <div
        className="h-3 w-32 rounded-full"
        style={{
          background:
            "linear-gradient(to right, #67e8f9, #a5f3fc, #fde68a, #fbbf24, #f97316, #dc2626)",
        }}
      />
      <span>More Sun</span>
    </div>
  );
}
