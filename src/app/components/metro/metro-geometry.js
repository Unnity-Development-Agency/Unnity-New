// One shared route definition drives the concrete deck, rails and carriage motion.
export const routes = {
  desktop: {
    width: 1280, height: 570, start: 24, bend: 620, end: 1256,
    high: 230, low: 448, curveEnd: 1040, control1: 800, control2: 810,
    trainScale: 1, carSpacing: 190, initial: 510,
    stations: [
      { x: 48, y: 55, width: 220, title: "Ad Spend", value: "₹2,00,000", detail: "/ month", foot: 230, at: 0 },
      { x: 360, y: 90, width: 142, title: "Clicks", value: "28,500", foot: 230, at: 0.08 },
      { x: 588, y: 88, width: 142, title: "Leads", value: "340", foot: 234, at: 0.35 },
      { x: 1026, y: 280, width: 222, title: "Revenue", value: "₹56,000", detail: "/ month", foot: 448, at: 0.87 },
    ],
    piers: [105, 340, 580, 790, 990, 1190],
  },
  mobile: {
    width: 720, height: 620, start: 20, bend: 330, end: 700,
    high: 235, low: 480, curveEnd: 580, control1: 450, control2: 450,
    trainScale: 0.62, carSpacing: 190, initial: 320,
    stations: [
      { x: 24, y: 70, width: 222, title: "Ad Spend", value: "₹2,00,000", detail: "/ month", foot: 235, at: 0 },
      { x: 269, y: 104, width: 142, title: "Clicks", value: "28,500", foot: 236, at: 0.08 },
      { x: 430, y: 173, width: 142, title: "Leads", value: "340", foot: 400, at: 0.36 },
      { x: 489, y: 285, width: 222, title: "Revenue", value: "₹56,000", detail: "/ month", foot: 480, at: 0.86 },
    ],
    piers: [74, 260, 425, 580, 670],
  },
};

export function routePath(route) {
  return `M${route.start} ${route.high}H${route.bend}C${route.control1} ${route.high} ${route.control2} ${route.low} ${route.curveEnd} ${route.low}H${route.end}`;
}

export function routePoints(route) {
  const points = [];
  for (let x = route.start; x < route.bend; x += 15) points.push({ x, y: route.high, angle: 0 });
  for (let i = 0; i <= 40; i++) {
    const t = i / 40, u = 1 - t;
    const x = u ** 3 * route.bend + 3 * u ** 2 * t * route.control1 + 3 * u * t ** 2 * route.control2 + t ** 3 * route.curveEnd;
    const y = route.high + (route.low - route.high) * (3 * t ** 2 - 2 * t ** 3);
    const dx = 3 * u ** 2 * (route.control1 - route.bend) + 6 * u * t * (route.control2 - route.control1) + 3 * t ** 2 * (route.curveEnd - route.control2);
    const dy = 6 * t * u * (route.low - route.high);
    points.push({ x, y, angle: Math.atan2(dy, dx) * 180 / Math.PI });
  }
  for (let x = route.curveEnd + 15; x <= route.end; x += 15) points.push({ x, y: route.low, angle: 0 });
  // Stabilize trigonometric rounding across server and browser SVG markup.
  return points.map(point => ({ x: Number(point.x.toFixed(3)), y: Number(point.y.toFixed(3)), angle: Number(point.angle.toFixed(3)) }));
}
