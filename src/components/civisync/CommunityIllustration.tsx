export function CommunityIllustration() {
  return (
    <svg viewBox="0 0 480 360" className="w-full max-w-lg" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-info)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--color-background)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.10" />
          <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="480" height="360" fill="url(#sky)" rx="20" />

      {/* sun */}
      <circle cx="395" cy="70" r="26" fill="var(--color-accent)" opacity="0.55" />

      {/* hills */}
      <path d="M0 240 Q120 190 240 230 T 480 220 L480 360 L0 360 Z" fill="url(#ground)" />
      <path d="M0 270 Q140 230 280 265 T 480 260 L480 360 L0 360 Z" fill="var(--color-primary)" opacity="0.10" />

      {/* road */}
      <path d="M-10 330 Q240 270 490 330" stroke="var(--color-text-secondary)" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeDasharray="6 10" />

      {/* tree */}
      <g transform="translate(60 215)">
        <rect x="-3" y="20" width="6" height="22" fill="var(--color-secondary)" opacity="0.7" rx="2" />
        <circle cx="0" cy="10" r="22" fill="var(--color-primary)" opacity="0.7" />
        <circle cx="-12" cy="20" r="14" fill="var(--color-success)" opacity="0.6" />
        <circle cx="12" cy="20" r="14" fill="var(--color-success)" opacity="0.6" />
      </g>

      {/* buildings */}
      <g>
        <rect x="170" y="160" width="60" height="110" rx="6" fill="var(--color-card)" stroke="var(--color-border)" />
        <rect x="240" y="130" width="70" height="140" rx="6" fill="var(--color-card)" stroke="var(--color-border)" />
        <rect x="320" y="180" width="55" height="90" rx="6" fill="var(--color-card)" stroke="var(--color-border)" />
        {/* windows */}
        {[0,1,2,3].map(r => [0,1].map(c => (
          <rect key={`a${r}${c}`} x={180+c*22} y={172+r*22} width="14" height="12" rx="2" fill="var(--color-accent)" opacity={0.55 - r*0.08} />
        )))}
        {[0,1,2,3,4].map(r => [0,1,2].map(c => (
          <rect key={`b${r}${c}`} x={250+c*18} y={142+r*22} width="12" height="12" rx="2" fill="var(--color-info)" opacity={0.55 - r*0.07} />
        )))}
        {[0,1,2,3].map(r => (
          <rect key={`c${r}`} x={330} y={192+r*20} width="35" height="10" rx="2" fill="var(--color-primary)" opacity={0.5 - r*0.08} />
        ))}
      </g>

      {/* park bench */}
      <g transform="translate(395 265)">
        <rect x="0" y="0" width="40" height="4" rx="2" fill="var(--color-secondary)" />
        <rect x="2" y="6" width="3" height="12" fill="var(--color-secondary)" />
        <rect x="35" y="6" width="3" height="12" fill="var(--color-secondary)" />
      </g>

      {/* citizens */}
      <g>
        <Person x={110} y={295} color="var(--color-secondary)" />
        <Person x={150} y={300} color="var(--color-info)" />
        <Person x={300} y={300} color="var(--color-primary)" />
        <Person x={340} y={305} color="var(--color-accent)" />
      </g>

      {/* connection network overlay */}
      <g stroke="var(--color-primary)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 4">
        <line x1="200" y1="160" x2="275" y2="130" />
        <line x1="275" y1="130" x2="345" y2="180" />
        <line x1="110" y1="280" x2="200" y2="160" />
        <line x1="345" y1="180" x2="340" y2="290" />
        <line x1="200" y1="160" x2="300" y2="290" />
      </g>
      {[[200,160],[275,130],[345,180],[110,280],[300,290],[340,290]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="var(--color-primary)" opacity="0.85" />
      ))}
    </svg>
  );
}

function Person({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="-12" r="5" fill={color} />
      <path d={`M -7 6 Q 0 -6 7 6 L 5 14 L -5 14 Z`} fill={color} opacity="0.85" />
    </g>
  );
}
