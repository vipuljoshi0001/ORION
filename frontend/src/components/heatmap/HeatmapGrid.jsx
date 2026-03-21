import { useMemo } from 'react';
import { HeatmapCell } from './HeatmapCell.jsx';
import dayjs from 'dayjs';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['S','M','T','W','T','F','S'];

export const HeatmapGrid = ({ heatmapData = {} }) => {
  const today = dayjs().format('YYYY-MM-DD');

  const weeks = useMemo(() => {
    const dates = Array.from({ length: 365 }, (_, i) =>
      dayjs().subtract(364 - i, 'day').format('YYYY-MM-DD')
    );
    const startDow = dayjs().subtract(364, 'day').day();
    const padded = [...Array(startDow).fill(null), ...dates];
    const w = [];
    for (let i = 0; i < Math.ceil(padded.length / 7); i++) {
      w.push(padded.slice(i * 7, i * 7 + 7));
    }
    return w.filter(wk => wk.some(d => d)).slice(-52);
  }, []);

  const monthLabels = useMemo(() => {
    const labels = [];
    let last = null;
    weeks.forEach((wk, i) => {
      const first = wk.find(d => d);
      if (!first) return;
      const m = dayjs(first).month();
      if (m !== last) { labels.push({ i, label: MONTHS[m] }); last = m; }
    });
    return labels;
  }, [weeks]);

  return (
  <div className="w-full overflow-x-auto pb-4">
    <div className="min-w-[600px]">
      <div className="relative h-5 mb-1 ml-7">
        {monthLabels.map(({ i, label }) => (
          <span key={`${label}-${i}`}
            className="absolute text-[10px] text-comet font-mono"
            style={{ left: `${i * 15}px` }}>
            {label}
          </span>
        ))}
      </div>
      <div className="flex">
        <div className="flex flex-col gap-[3px] mr-2">
          {DAYS.map((d, i) => (
            <div key={i} className="w-3 h-3 flex items-center justify-end">
              {i % 2 !== 0 && <span className="text-[8px] text-comet font-mono">{d}</span>}
            </div>
          ))}
        </div>
        <div className="flex gap-[3px]">
          {weeks.map((wk, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {wk.map((date, di) => (
                <HeatmapCell
                  key={date || `e-${wi}-${di}`}
                  date={date}
                  data={date ? heatmapData[date] : null}
                  isToday={date === today}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};