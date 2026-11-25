const routeCache = new WeakMap();

function sampledRoute(path) {
  if (routeCache.has(path)) return routeCache.get(path);
  const length = path.getTotalLength();
  const samples = Array.from({ length: 513 }, (_, index) => path.getPointAtLength(length * index / 512));
  const route = { length, pointAt(distance) {
    const position = Math.max(0, Math.min(512, distance / length * 512));
    const index = Math.min(511, Math.floor(position));
    const fraction = position - index;
    return { x: samples[index].x + (samples[index + 1].x - samples[index].x) * fraction, y: samples[index].y + (samples[index + 1].y - samples[index].y) * fraction };
  } };
  routeCache.set(path, route);
  return route;
}

export function carriagePoint(pose, x, y, scale) {
  return {
    x: pose.x + scale * (x * Math.cos(pose.radians) - y * Math.sin(pose.radians)),
    y: pose.y + scale * (x * Math.sin(pose.radians) + y * Math.cos(pose.radians)),
  };
}

export function carriagePoses(path, head, route) {
  // Sample the static SVG once; animation updates use only cached arithmetic.
  const sampled = sampledRoute(path);
  const length = sampled.length;
  const scale = route.trainScale;
  function poseAt(distance) {
    const back = sampled.pointAt(Math.max(0, distance - 60 * scale));
    const front = sampled.pointAt(Math.min(length, distance + 58 * scale));
    const radians = Math.atan2(front.y - back.y, front.x - back.x);
    // The body rests on the chord between its bogies, rather than floating
    // above or sinking into the curved rail at its centre.
    return { distance, x: (back.x + front.x) / 2 + scale * Math.cos(radians), y: (back.y + front.y) / 2 + scale * Math.sin(radians), radians };
  }
  const poses = [poseAt(head)];
  for (let index = 1; index < 3; index++) {
    const previous = poses[index - 1];
    const target = carriagePoint(previous, -88, -30, scale);
    const cost = distance => {
      const point = carriagePoint(poseAt(distance), 88, -30, scale);
      return (point.x - target.x) ** 2 + (point.y - target.y) ** 2;
    };
    // Solve the following coach's position against the previous gangway.
    // Fixed arc-length spacing opens up large gaps when the track bends.
    let low = Math.max(60 * scale, previous.distance - 205 * scale);
    let high = Math.max(low, previous.distance - 166 * scale);
    for (let step = 0; step < 12; step++) {
      const a = low + (high - low) / 3;
      const b = high - (high - low) / 3;
      if (cost(a) < cost(b)) high = b;
      else low = a;
    }
    poses.push(poseAt((low + high) / 2 - 4 * scale));
  }
  return poses;
}
