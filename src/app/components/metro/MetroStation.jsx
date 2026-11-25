// A quiet architectural layer behind the train: roof ribs, columns, glazing,
// platform paving and tactile edge. It shares the illustration's material palette.
export default function MetroStation({ route, id, mobile }) {
  const left = 26;
  const right = route.bend - (mobile ? 30 : 48);
  const platform = route.high - 20;
  const roof = route.high - (mobile ? 105 : 118);
  const posts = mobile ? [54, 175, 280] : [65, 230, 395, 550];
  return <g>
    <g opacity=".65">
      <path d={`M${left} ${platform - 9}H${right}l-16-14H${left - 12}Z`} fill="#ebe5f1" stroke="#e0d6e9" />
      <path d={`M${left} ${platform - 9}H${right}v9H${left}Z`} fill="#cbbfd7" />
      <path d={`M${left + 5} ${platform - 12}H${right - 7}`} stroke="#b6a3c7" strokeWidth="2" strokeDasharray="2 2" />
      <path d={`M${left + 7} ${platform - 22}H${right - 22}`} stroke="#d1c5dc" />
      <rect x={left + 5} y={roof + 27} width={right - left - 22} height={platform - roof - 54} fill="#eee9f4" fillOpacity=".65" />
      {posts.map(x => <g key={x}>
        <path d={`M${x - 2} ${roof + 8}V${platform - 9}`} stroke="#baacc9" strokeWidth="5" />
        <path d={`M${x - 4} ${roof + 8}V${platform - 9}`} stroke="#fdfcfe" strokeWidth="1.5" />
        <path d={`M${x - 2} ${roof + 34}l-17-20m17 20 17-20`} stroke="#b9abc7" strokeWidth="2" fill="none" />
      </g>)}
      <path d={`M${left - 12} ${roof + 6}Q${(left + right) / 2} ${roof - 19} ${right - 9} ${roof + 6}l22 10Q${(left + right) / 2} ${roof - 8} ${left - 2} ${roof + 16}Z`} fill={`url(#${id}-roof)`} stroke="#c6b9d2" />
      <path d={`M${left - 2} ${roof + 16}Q${(left + right) / 2} ${roof - 8} ${right + 13} ${roof + 16}v5Q${(left + right) / 2} ${roof - 3} ${left - 2} ${roof + 21}Z`} fill="#c1b2ce" />
      {Array.from({ length: mobile ? 7 : 14 }, (_, i) => {
        const x = left + i * (right - left) / (mobile ? 7 : 14);
        return <path key={i} d={`M${x.toFixed(2)} ${roof + 3}l14 10`} stroke="#d0c4dd" strokeWidth=".8" />;
      })}
      {posts.slice(0,-1).map(x => <path key={x} d={`M${x + 21} ${roof + 21}h28`} stroke="#fdfcfe" strokeWidth="2" />)}
      <g transform={`translate(${mobile ? 88 : 285} ${platform - 14})`} stroke="#b4a4c2" fill="none" strokeWidth="2">
        <path d="M0-7h36M3-15h30M3-7v7m27-7v7" /><path d="M3-15v8m27-8v8" strokeWidth="1" />
      </g>
    </g>
    {!mobile && <g opacity=".35">
      <path d={`M169 ${route.high + 26}h39v${536 - route.high - 26}h-39Z`} fill="#ede7f3" stroke="#cbbdd7" />
      <path d={`M188 ${route.high + 28}V536`} stroke="#c0b0cd" />
      {[300,355,410,465,520].map(y => <path key={y} d={`M170 ${y}h37`} stroke="#c0b0cd" />)}
      <path d="M173 296l28-24m-28 79 28-24m-28 79 28-24m-28 79 28-24" stroke="#fdfcfe" strokeWidth="3" />
    </g>}
  </g>;
}
