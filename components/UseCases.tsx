'use client';

import { useState } from 'react';
import { useCases } from '@/lib/content';

export default function UseCases() {
  const [active, setActive] = useState(0);
  const area = useCases[active];

  return (
    <div className="uc reveal">
      <div className="uc-tabs" role="tablist" aria-label="Business functions">
        {useCases.map((u, i) => (
          <button
            key={u.code}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setActive((i + 1) % useCases.length);
              if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setActive((i - 1 + useCases.length) % useCases.length);
            }}
          >
            <span className="uc-code">{u.code}</span>
            <span className="uc-area">{u.area}</span>
            <span className="uc-count">{u.items.length}</span>
          </button>
        ))}
      </div>
      <div className="uc-panel" role="tabpanel" key={area.code}>
        <div className="uc-panel-head">
          <span className="uc-code">{area.code}</span>
          <h3>{area.area}</h3>
        </div>
        <div className="uc-grid">
          {area.items.map(([title, text], i) => (
            <div className="uc-card" key={title} style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="uc-num">0{i + 1}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
