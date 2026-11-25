import { useId } from "react";
import Carriage from "./MetroCarriage";
import MetroStation from "./MetroStation";
import { routePath, routePoints, routes } from "./metro-geometry";

export default function MetroArtwork({ variant }) {
  const id = useId().replace(/:/g, "");
  const route = routes[variant];
  const d = routePath(route);
  const points = routePoints(route);
  const ground = variant === "mobile" ? 572 : 536;
  return <svg className={`metro-artwork metro-artwork-${variant}`} viewBox={`0 0 ${route.width} ${route.height}`} data-variant={variant} role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>The journey from ad spend to revenue</title>
    <desc id={`${id}-description`}>An illustrative Delhi Metro journey starts on an elevated track at ₹2,00,000 per month in ad spend, passes 28,500 clicks and 340 leads, then descends to ₹56,000 per month in revenue.</desc>
    <defs>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fbf9fc" /><stop offset=".2" stopColor="#e9e4ee" /><stop offset=".55" stopColor="#fdfcfe" /><stop offset=".75" stopColor="#ccc5d5" /><stop offset="1" stopColor="#a69bb5" /></linearGradient>
      <linearGradient id={`${id}-roof`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fdfcfe" /><stop offset=".5" stopColor="#e4ddea" /><stop offset="1" stopColor="#b5aabe" /></linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#60566e" /><stop offset=".35" stopColor="#30273e" /><stop offset=".7" stopColor="#42344f" /><stop offset="1" stopColor="#746281" /></linearGradient>
      <linearGradient id={`${id}-concrete`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#d6cedf" /><stop offset=".4" stopColor="#eee8f3" /><stop offset="1" stopColor="#bcb0c9" /></linearGradient>
      <linearGradient id={`${id}-girder`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d8cfdf" /><stop offset="1" stopColor="#a89ab7" /></linearGradient>
      <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fdfcfe" stopOpacity="0" /><stop offset="1" stopColor="#fdfcfe" /></linearGradient>
    </defs>
    <g aria-hidden="true">
      <g fill="#e7deed" opacity=".35">
        {[.12,.24,.35,.43,.56,.65,.75,.86].map((fraction, i) => <g key={fraction} transform={`translate(${route.width * fraction} ${ground})`}>
          <path d={`M0 0v-${55 + i % 3 * 22}l24-7 24 7V0Z`} />
          <path d={`M24-${62 + i % 3 * 22}V0`} stroke="#d2c5de" />
          {[8,16,32,40].map(x => <path key={x} d={`M${x}-${40 + i % 3 * 22}V-6`} stroke="#d2c5de" strokeWidth="2" />)}
        </g>)}
      </g>
      <path d={`M12 ${ground}H${route.width - 12}`} stroke="#e7deed" />
      <MetroStation route={route} id={id} mobile={variant === "mobile"} />
      {route.piers.map(x => {
        const p = points.reduce((best, point) => Math.abs(point.x - x) < Math.abs(best.x - x) ? point : best);
        const y = p.y + 20;
        return <g key={x}>
          <ellipse cx={x + 5} cy={ground + 2} rx="36" ry="5" fill="#2a165008" />
          <path d={`M${x - 10} ${y + 27}L${x - 12} ${ground}H${x + 13}L${x + 10} ${y + 27}Z`} fill={`url(#${id}-concrete)`} />
          <path d={`M${x + 10} ${y + 27}l10-5 2 ${ground - y - 22}h-9Z`} fill="#bfb2ce" opacity=".65" />
          <path d={`M${x - 34} ${y}h68v10l-19 9-5 15h-20l-6-15-18-9Z`} fill={`url(#${id}-concrete)`} />
          <path d={`M${x - 34} ${y}l-9-8h68l9 8Z`} fill="#f2edf6" />
          <path d={`M${x - 8} ${y + 42}v${Math.max(0, ground - y - 45)}`} stroke="#faf8fc" opacity=".6" />
        </g>;
      })}
      {/* Rear deck, deep concrete fascia and a separate top running surface. */}
      <path d={d} transform="translate(-10 12)" stroke="#c1b5cf" strokeWidth="29" fill="none" />
      <path d={d} transform="translate(0 16)" stroke={`url(#${id}-girder)`} strokeWidth="25" fill="none" />
      <path d={d} transform="translate(-5 -4)" stroke="#ede7f3" strokeWidth="27" fill="none" />
      <path d={d} transform="translate(0 2)" stroke="#9d8cab" strokeWidth="1.5" fill="none" />
      {points.filter((_, i) => i % 2 === 0).map((p, i) => <path key={i} d="M-10-17L7 1" transform={`translate(${p.x} ${p.y}) rotate(${p.angle})`} stroke="#b8a9c6" strokeWidth="3" />)}
      <path d={d} transform="translate(-9 -15)" stroke="#8d7b9d" strokeWidth="2.5" fill="none" />
      <path d={d} transform="translate(-9 -17)" stroke="#fdfcfe" strokeWidth="1" fill="none" />
      <path d={d} stroke="#796889" strokeWidth="2.5" fill="none" />
      <path d={d} transform="translate(0 -2)" stroke="#fdfcfe" strokeWidth="1" fill="none" />
      <path d={d} data-metro-route fill="none" stroke="none" />
      <g className="metro-stations">
        {route.stations.map((station, index) => {
          const height = station.detail ? 104 : 78;
          return <g key={station.title} data-metro-station={index} data-at={station.at}>
            {[station.x + 20, station.x + station.width - 20].map(x => <g key={x}><path d={`M${x} ${station.y + height}V${station.foot - 21}`} stroke="#b4a5c1" strokeWidth="5" /><path d={`M${x - 1} ${station.y + height}V${station.foot - 21}`} stroke="#f4eff8" strokeWidth="1.5" /></g>)}
            <path d={`M${station.x} ${station.y}l-7 5v${height}h${station.width}l7-5Z`} fill="#b1a2be" />
            <rect x={station.x} y={station.y} width={station.width} height={height} rx="2" fill="#faf8fc" stroke="#c1b3cd" />
            <rect x={station.x} y={station.y} width={station.width} height="5" fill="#2a1650" />
            <circle data-station-light cx={station.x + station.width - 15} cy={station.y + 21} r="3" fill="#806394" />
            <text x={station.x + 15} y={station.y + 30} className="metro-station-title">{station.title}</text>
            <text x={station.x + 15} y={station.y + 65} className="metro-station-value">{station.value}</text>
            {station.detail && <text x={station.x + 15} y={station.y + 87} className="metro-station-detail">{station.detail}</text>}
          </g>;
        })}
      </g>
      {[1,2].map(index => <g key={index} data-metro-coupling={index}>
        <path data-gangway-body fill="#62576f" stroke="#a197ad" strokeWidth=".7" />
        <path data-gangway-folds fill="none" stroke="#b3a8bf" strokeWidth=".7" />
      </g>)}
      {[2,1,0].map(index => <g key={index} data-metro-car={index} transform={`translate(${route.initial - index * route.carSpacing * route.trainScale} ${route.high})`}><g transform={`scale(${route.trainScale})`}><Carriage front={index === 0} id={id} index={index} /></g></g>)}
      {/* Low safety railing is in front of the train, preserving the track depth. */}
      {points.filter((_, i) => i % 2 === 0).map((p, i) => <path key={i} d="M0 8V-9" transform={`translate(${p.x + 8} ${p.y + 4})`} stroke="#a797b7" strokeWidth="1.2" />)}
      <path d={d} transform="translate(8 -5)" stroke="#b2a2c0" strokeWidth="1.4" fill="none" />
      <path d={d} transform="translate(8 2)" stroke="#c0b2cd" strokeWidth="1" fill="none" />
      <rect x="0" y={ground - 18} width={route.width} height="55" fill={`url(#${id}-fade)`} />
    </g>
  </svg>;
}
