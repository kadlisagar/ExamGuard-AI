import React from 'react';

// 1. LineChart Component using premium styled SVGs
export function LineChart({ data, height = 200 }: { data: { label: string; value: number }[]; height?: number }) {
  const maxVal = Math.max(...data.map(d => d.value), 40);
  const width = 500;
  
  // Calculate SVG points
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 40) + 20;
    const y = height - ((d.value / maxVal) * (height - 40) + 20);
    return { x, y };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - 20} L ${points[0].x} ${height - 20} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        {/* Gradients */}
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
          const y = (height - 40) * p + 20;
          return (
            <line
              key={idx}
              x1="20"
              y1={y}
              x2={width - 20}
              y2={y}
              stroke="currentColor"
              className="text-slate-100 dark:text-slate-800"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Area segment */}
        <path d={areaD} fill="url(#lineGrad)" />

        {/* Main Line path */}
        <path
          d={pathD}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-indigo-600 dark:text-sky-400"
        />

        {/* Data points */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle
              cx={p.x}
              cy={p.y}
              r="6.5"
              className="fill-indigo-600 stroke-white dark:stroke-slate-900"
              strokeWidth="2.5"
            />
            {/* Value tooltip label displayed subtly */}
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300"
            >
              {data[idx].value}%
            </text>
          </g>
        ))}

        {/* Labels bar */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * (width - 40) + 20;
          return (
            <text
              key={i}
              x={x}
              y={height - 2}
              textAnchor="middle"
              className="text-[10px] font-medium fill-slate-400 font-sans"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// 2. BarChart Component
export function BarChart({ data, height = 200 }: { data: { label: string; value: number; average?: number }[]; height?: number }) {
  const maxVal = Math.max(...data.map(d => Math.max(d.value, d.average || 0)), 100);
  const width = 450;
  const barWidth = 32;
  const gap = 44;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        {/* Y Axis Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
          const y = (height - 40) * p + 15;
          return (
            <line
              key={idx}
              x1="10"
              y1={y}
              x2={width - 10}
              y2={y}
              stroke="currentColor"
              className="text-slate-100 dark:text-slate-800"
            />
          );
        })}

        {/* Grouped Bars */}
        {data.map((d, i) => {
          const x = i * (barWidth * 2 + gap) + 30;
          
          // Scores
          const userBarH = (d.value / maxVal) * (height - 50);
          const userY = height - 30 - userBarH;

          const avgBarH = ((d.average || 0) / maxVal) * (height - 50);
          const avgY = height - 30 - avgBarH;

          return (
            <g key={i}>
              {/* User Bar */}
              <rect
                x={x}
                y={userY}
                width={barWidth}
                height={userBarH}
                rx="4"
                className="fill-indigo-600 dark:fill-indigo-500"
              />
              <text x={x + barWidth / 2} y={userY - 6} textAnchor="middle" className="text-[10px] font-bold font-mono fill-indigo-600 dark:fill-sky-450">
                {d.value}%
              </text>

              {/* Class Average Bar */}
              {d.average !== undefined && (
                <>
                  <rect
                    x={x + barWidth + 4}
                    y={avgY}
                    width={barWidth}
                    height={avgBarH}
                    rx="4"
                    className="fill-slate-300 dark:fill-slate-700"
                  />
                  <text x={x + barWidth + 4 + barWidth / 2} y={avgY - 6} textAnchor="middle" className="text-[9px] font-mono fill-slate-400">
                    {d.average}%
                  </text>
                </>
              )}

              {/* Text Label */}
              <text
                x={x + barWidth + 2}
                y={height - 8}
                textAnchor="middle"
                className="text-[9px] font-semibold fill-slate-500 dark:fill-slate-450 max-w-[80px] break-all"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// 3. Mini Donut Pie Chart Component
export function PieChart({ data, size = 160 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let accumulatedAngle = 0;

  // Render segments
  const segments = data.map((d, idx) => {
    const angle = (d.value / total) * 360;
    const startAngle = accumulatedAngle;
    accumulatedAngle += angle;

    const radStart = (startAngle - 90) * (Math.PI / 180);
    const radEnd = (accumulatedAngle - 90) * (Math.PI / 180);

    const radius = size / 2 - 12;
    const center = size / 2;

    const x1 = center + radius * Math.cos(radStart);
    const y1 = center + radius * Math.sin(radStart);
    const x2 = center + radius * Math.cos(radEnd);
    const y2 = center + radius * Math.sin(radEnd);

    const largeArc = angle > 180 ? 1 : 0;
    const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return {
      pathData,
      color: d.color,
      label: d.label,
      percentage: Math.round((d.value / total) * 100),
      count: d.value
    };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {segments.map((seg, idx) => (
          <path
            key={idx}
            d={seg.pathData}
            fill={seg.color}
            className="hover:opacity-90 transition-opacity"
            stroke="white"
            strokeWidth="1.5"
          />
        ))}
        {/* Donut cover to look premium */}
        <circle cx={size / 2} cy={size / 2} r={size / 4} fill="currentColor" className="text-white dark:text-slate-900" />
      </svg>

      <div className="space-y-2">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="font-semibold text-slate-700 dark:text-slate-300">{seg.label}:</span>
            <span className="text-slate-500 font-mono">({seg.count}) {seg.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Activity Heatmap Grid (alerts risk map)
export function HeatmapChart() {
  const weeks = 4;
  const days = 7;
  // risk levels: 0 = clear, 1 = low alert, 2 = medium warning, 3 = high risk
  const grid = [
    [0, 1, 0, 0, 0, 2, 0],
    [0, 0, 3, 0, 1, 0, 0],
    [1, 0, 0, 2, 0, 0, 1],
    [0, 0, 0, 0, 3, 0, 0]
  ];

  const getColor = (level: number) => {
    switch (level) {
      case 3: return 'bg-rose-500 dark:bg-rose-600';
      case 2: return 'bg-amber-400 dark:bg-amber-500';
      case 1: return 'bg-indigo-300 dark:bg-indigo-500/50';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-50/50 dark:bg-slate-850 rounded-2xl border border-slate-200/40 dark:border-slate-800">
      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Monthly Proctored Risk Incidence Matrix</p>
      <div className="flex gap-2 text-[10px] font-medium text-slate-400 self-end">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-slate-100 dark:bg-slate-800" /> Clear</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-indigo-300" /> Low</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-amber-400" /> Med</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-rose-500" /> Critical</span>
      </div>
      <div className="flex gap-4 items-center justify-between overflow-x-auto">
        <div className="flex flex-col gap-1 text-[9px] font-bold text-slate-400 uppercase select-none">
          {['M', 'W', 'F'].map((day, idx) => (
            <span key={idx} className="h-4 flex items-center">{day}</span>
          ))}
        </div>
        <div id="heatmap-grid" className="flex gap-1.5 flex-1 justify-around">
          {grid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((cell, dIdx) => (
                <div
                  key={dIdx}
                  className={`h-4.5 w-4.5 rounded-sm transition-colors cursor-help ${getColor(cell)}`}
                  title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Alert Index ${cell}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default { LineChart, BarChart, PieChart, HeatmapChart };
