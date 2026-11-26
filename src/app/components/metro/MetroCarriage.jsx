export default function MetroCarriage({ front, id, index }) {
  return (
    <g>
      <path d="M-84-10H78L83-3H-81Z" fill="#4e485a" />
      {[-60, 58].map((x) => (
        <g key={x}>
          <rect
            x={x - 15}
            y="-12"
            width="30"
            height="9"
            rx="2"
            fill="#484251"
          />
          <path d={`M${x - 11}-8h22`} stroke="#9d92a8" strokeWidth="1.5" />
          {[-8, 8].map((offset) => (
            <g key={offset}>
              <circle cx={x + offset} cy="-4" r="5" fill="#302a3b" />
              <circle cx={x + offset} cy="-4" r="2.7" fill="#9b95a3" />
              <circle cx={x + offset} cy="-4" r="1" fill="#4e485a" />
            </g>
          ))}
        </g>
      ))}
      <path
        d={
          front
            ? "M-88-52Q-88-58-82-58H62Q76-58 83-43L93-20Q96-9 83-9H-88Z"
            : "M-88-52Q-88-58-82-58H81Q88-58 88-50V-9H-88Z"
        }
        fill={`url(#${id}-metal)`}
        stroke="#9c96a6"
        strokeWidth=".7"
      />
      <path
        d={
          front
            ? "M-88-52L-97-63Q-96-69-88-69H52Q65-69 72-59L83-43Q76-58 62-58H-82Z"
            : "M-88-52L-97-63Q-97-69-88-69H74L87-58H-82Z"
        }
        fill={`url(#${id}-roof)`}
        stroke="#c0bac9"
        strokeWidth=".7"
      />
      <path d="M-78-64H56M-79-61H59" stroke="#fdfcfe" strokeWidth="1" />
      {[-57, 17].map((x) => (
        <g key={x}>
          <path
            d={`M${x}-64l-6-6h34l7 6Z`}
            fill="#c6c0cd"
            stroke="#a49bad"
            strokeWidth=".6"
          />
          {[0, 4, 8, 12, 16, 20].map((offset) => (
            <path
              key={offset}
              d={`M${x + offset}-69l5 4`}
              stroke="#8e8599"
              strokeWidth=".6"
            />
          ))}
        </g>
      ))}
      <rect
        x="-81"
        y="-50"
        width={front ? 145 : 162}
        height="24"
        rx="3"
        fill={`url(#${id}-glass)`}
      />
      {[-78, -7, 57]
        .filter((x) => !front || x < 57)
        .map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="-47"
              width="25"
              height="18"
              rx="1.5"
              fill="#c5b9d4"
              opacity=".14"
            />
            <path
              d={`M${x + 3}-46l11 15m-3-15 9 12`}
              stroke="#d5c9e4"
              opacity=".24"
              strokeWidth="2"
            />
            <path d={`M${x + 13}-47v18`} stroke="#c5b9d4" opacity=".3" />
            <path d={`M${x + 4}-31h17`} stroke="#b2a4c0" opacity=".35" />
          </g>
        ))}
      <path
        d={front ? "M-87-24H72L90-20" : "M-87-24H87"}
        fill="none"
        stroke="#806394"
        strokeWidth="3"
      />
      <path d="M-86-18H73M-86-15H74" stroke="#b0a8bb" strokeWidth=".6" />
      {[-45, 25].map((x) => (
        <g key={x} data-metro-door>
          <rect
            x={x}
            y="-51"
            width="26"
            height="39"
            rx="1.5"
            fill={`url(#${id}-metal)`}
            stroke="#8e849b"
            strokeWidth=".7"
          />
          <path d={`M${x + 13}-50v37`} stroke="#8e849b" strokeWidth=".8" />
          <rect
            x={x + 3}
            y="-46"
            width="8"
            height="18"
            rx="1.2"
            fill={`url(#${id}-glass)`}
          />
          <rect
            x={x + 15}
            y="-46"
            width="8"
            height="18"
            rx="1.2"
            fill={`url(#${id}-glass)`}
          />
          <path d={`M${x + 1}-24h24`} stroke="#806394" strokeWidth="3" />
          <path d={`M${x + 10}-21v4m6-4v4`} stroke="#82758f" strokeWidth=".8" />
          <path d={`M${x + 2}-12h22`} stroke="#66596f" strokeWidth="1.2" />
          <circle cx={x + 25} cy="-32" r="1" fill="#8b9a7b" />
        </g>
      ))}
      {/* Original DMRC artwork; source is kept in the downloaded local SVG. */}
      <image
        href="/images/metro/delhi-metro-symbol.png"
        x="0"
        y="-22"
        width="10"
        height="10"
      />
      {front ? (
        <g>
          <path
            d="M66-52Q74-49 78-40L86-27H67Z"
            fill={`url(#${id}-glass)`}
            stroke="#6a6076"
            strokeWidth=".7"
          />
          <path
            d="M70-48l11 17"
            stroke="#c9bed7"
            strokeWidth="2"
            opacity=".6"
          />
          <path d="M68-29l10-6" stroke="#383141" />
          <path d="M69-55h6l4 7h-7Z" fill="#2a1650" />
          <path d="M80-18h9" stroke="#fdfcfe" strokeWidth="2.5" />
          <path d="M82-12h7" stroke="#5d526b" strokeWidth="2" />
        </g>
      ) : null}
      {index === 1 && (
        <g fill="none" stroke="#756a84" strokeWidth="1.3">
          <path d="M-18-70l14-10 17 10M-4-80l-10-7H10M-17-87H13" />
          <path d="M-22-70H17" />
        </g>
      )}
    </g>
  );
}
