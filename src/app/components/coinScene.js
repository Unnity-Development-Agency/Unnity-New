import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
const COIN_SPEED = 1;
const COIN_INTERVAL = 1.35;
const COIN_CONTACT_OFFSET = 64;
const SHOPIFY_PATH =
  "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z";
const META_PATH =
  "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z";

function enamel(color) {
  const pigment = new THREE.Color(color);
  pigment.multiplyScalar(color === "#f8faff" ? 0.65 : 0.18);
  return new THREE.MeshStandardMaterial({
    color: pigment,
    metalness: 0.25,
    roughness: 0.3,
    envMapIntensity: 0.3,
    transparent: true,
  });
}

const DESKTOP = {
  width: 1400,
  height: 820,
  emitter: [260, 190],
  start: [330, 505],
  ribbon:
    "M-100 440 C80 390 180 380 330 505 C450 640 560 690 700 680 C1080 680 1170 390 1510 340",
  motion: "M330 505 C450 640 560 690 700 680 C1080 680 1170 390 1510 340",
};
const MOBILE = {
  width: 700,
  height: 650,
  emitter: [160, 130],
  start: [230, 340],
  ribbon:
    "M-90 340 C40 270 130 260 230 340 C330 450 380 510 470 490 C580 465 650 340 800 300",
  motion: "M230 340 C330 450 380 510 470 490 C580 465 650 340 800 300",
};

function metal(color, roughness = 0.23) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.92,
    roughness,
    transparent: true,
  });
}

function ringShape(outer, inner) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
  if (inner) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  return shape;
}

function extrude(shape, depth, bevel = 1.5) {
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 64,
  });
}

function mesh(geometry, material, parent, z = 0) {
  const object = new THREE.Mesh(geometry, material);
  object.position.z = z;
  parent.add(object);
  return object;
}

function makeCoin(color, symbolColor, variant) {
  const group = new THREE.Group();
  const body = variant === 2 ? metal(color) : enamel("#f8faff");
  const edge = metal(color, 0.16);
  const symbol = variant === 1 ? enamel("#0866ff") : metal(symbolColor, 0.25);
  mesh(extrude(ringShape(66), 9, 2.1), body, group, -4.5);
  mesh(extrude(ringShape(62, 59.5), 0.8, 0.45), edge, group, 7);
  mesh(extrude(ringShape(62, 59.5), 0.8, 0.45), edge, group, -8);
  // Sculpted Google-style G, Meta-style loop and dollar reliefs on both faces.
  const marks = new THREE.Group();
  if (variant === 0) {
    const segments = [
      [0.72, 2.45, "#EA4335"],
      [2.45, 3.9, "#FBBC05"],
      [3.9, 5.5, "#34A853"],
      [5.5, Math.PI * 2, "#4285F4"],
    ];
    segments.forEach(([start, end, color]) => {
      const g = new THREE.Shape();
      g.absarc(0, 0, 33, start, end, false);
      g.lineTo(Math.cos(end) * 22, Math.sin(end) * 22);
      g.absarc(0, 0, 22, end, start, true);
      g.closePath();
      mesh(extrude(g, 2, 0.15), enamel(color), marks);
    });
    const bar = mesh(
      new THREE.BoxGeometry(29, 10, 3),
      enamel("#4285F4"),
      marks,
      1,
    );
    bar.position.x = 18;
  } else if (variant === 1) {
    // Meta silhouette from Simple Icons (https://cdn.simpleicons.org/meta).
    const logo = new SVGLoader().parse(
      `<svg xmlns="http://www.w3.org/2000/svg"><path d="${META_PATH}"/></svg>`,
    );
    logo.paths.forEach((path) =>
      SVGLoader.createShapes(path).forEach((shape) => {
        const geometry = extrude(shape, 0.6, 0.08);
        geometry.translate(-12, -12, 0);
        geometry.scale(3.6, -3.6, -1);
        mesh(geometry, symbol, marks, 1);
      }),
    );
  } else if (variant === 3) {
    const logo = new SVGLoader().parse(
      `<svg xmlns="http://www.w3.org/2000/svg"><path d="${SHOPIFY_PATH}"/></svg>`,
    );
    const green = enamel("#7ab55c");
    logo.paths.forEach((path) =>
      SVGLoader.createShapes(path).forEach((shape) => {
        const geometry = extrude(shape, 0.7, 0.08);
        geometry.translate(-12, -12, 0);
        geometry.scale(3, -3, -1);
        mesh(geometry, green, marks, 1);
      }),
    );
  } else if (variant === 4) {
    // The three coloured pieces of the Google Ads mark, kept as raised geometry.
    const pieces = [
      [
        "M7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z",
        "#FBBC04",
      ],
      [
        "M23.4641 16.9287L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644z",
        "#4285F4",
      ],
      [
        "M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998z",
        "#34A853",
      ],
    ];
    pieces.forEach(([d, color]) => {
      const logo = new SVGLoader().parse(
        `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`,
      );
      logo.paths.forEach((path) =>
        SVGLoader.createShapes(path).forEach((shape) => {
          const geometry = extrude(shape, 0.7, 0.08);
          geometry.translate(-12, -12, 0);
          geometry.scale(3, -3, -1);
          mesh(geometry, enamel(color), marks, 1);
        }),
      );
    });
  } else {
    const s = new THREE.Shape();
    s.moveTo(23, 23);
    s.bezierCurveTo(9, 39, -24, 33, -24, 13);
    s.bezierCurveTo(-24, -2, -8, -6, 5, -9);
    s.bezierCurveTo(24, -14, 13, -28, -2, -26);
    s.bezierCurveTo(-11, -26, -19, -21, -24, -17);
    s.lineTo(-30, -26);
    s.bezierCurveTo(-8, -45, 27, -35, 27, -15);
    s.bezierCurveTo(27, 0, 12, 3, -2, 7);
    s.bezierCurveTo(-23, 13, -12, 28, 2, 25);
    s.bezierCurveTo(10, 25, 15, 21, 18, 18);
    s.closePath();
    mesh(extrude(s, 2, 0.7), symbol, marks);
    mesh(new THREE.BoxGeometry(4.5, 78, 3), symbol, marks, 1);
  }
  marks.position.z = 8;
  group.add(marks);
  const backMarks = marks.clone();
  backMarks.position.z = -8;
  backMarks.rotation.y = Math.PI;
  group.add(backMarks);
  // Fine milling is one instanced draw call, with physically modeled side edges.
  const grooves = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.65, 1.1, 7),
    edge,
    96,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 96; i++) {
    const angle = (i / 96) * Math.PI * 2;
    dummy.position.set(Math.cos(angle) * 66.4, Math.sin(angle) * 66.4, 0);
    dummy.rotation.z = angle;
    dummy.updateMatrix();
    grooves.setMatrixAt(i, dummy.matrix);
  }
  group.add(grooves);
  return group;
}

function makeEmitter() {
  const group = new THREE.Group();
  const silver = metal("#d4cbe9", 0.19);
  const purple = metal("#7344ae", 0.17);
  const dark = metal("#211037", 0.3);
  mesh(extrude(ringShape(108, 77), 23, 3), silver, group, -10);
  mesh(extrude(ringShape(94, 78), 3, 1), purple, group, 16);
  mesh(extrude(ringShape(77, 63), 4, 1), dark, group, -5);
  mesh(extrude(ringShape(68, 57), 2, 0.8), purple, group, -3);
  mesh(extrude(ringShape(105, 102), 0.7, 0.4), silver, group, 17);
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 1024;
  labelCanvas.height = 192;
  const labelContext = labelCanvas.getContext("2d");
  labelContext.font = "500 72px Arial";
  labelContext.textAlign = "center";
  labelContext.textBaseline = "middle";
  labelContext.fillStyle = "#242427";
  labelContext.fillText("OFFICIAL PARTNERS", 512, 96);
  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = THREE.SRGBColorSpace;
  const labelMaterial = new THREE.MeshBasicMaterial({
    map: labelTexture,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  // Conform the ink to the outer cylindrical silver wall, rather than the inner lip.
  const labelPositions = [],
    labelUvs = [],
    labelIndices = [];
  for (let i = 0; i <= 64; i++) {
    const t = i / 64,
      angle = 2.21 - t * 1.28;
    const x = Math.cos(angle) * 111.15,
      y = Math.sin(angle) * 111.15;
    labelPositions.push(x, y, 10, x, y, -7);
    labelUvs.push(t, 0, t, 1);
    if (i < 64) {
      const n = i * 2;
      labelIndices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
    }
  }
  const labelGeometry = new THREE.BufferGeometry();
  labelGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(labelPositions, 3),
  );
  labelGeometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(labelUvs, 2),
  );
  labelGeometry.setIndex(labelIndices);
  mesh(labelGeometry, labelMaterial, group);
  // A continuously deforming liquid membrane; no rigid concentric rings.
  const gelGeometry = new THREE.RingGeometry(0, 76, 80, 20);
  const positions = gelGeometry.attributes.position;
  const colours = new THREE.BufferAttribute(
    new Float32Array(positions.count * 3),
    3,
  );
  gelGeometry.setAttribute("color", colours);
  positions.setUsage(THREE.DynamicDrawUsage);
  colours.setUsage(THREE.DynamicDrawUsage);
  const gelMaterial = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    metalness: 0.3,
    roughness: 0.13,
    transmission: 0.12,
    thickness: 18,
    ior: 1.38,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.94,
  });
  gelMaterial.userData.baseOpacity = 0.94;
  mesh(gelGeometry, gelMaterial, group, 5);
  const palette = ["#7741e2", "#f68bc9", "#65d8db", "#ae8bf5"].map((c) =>
    new THREE.Color(c).multiplyScalar(0.42),
  );
  const mixed = new THREE.Color();
  group.userData.updateJelly = (time, pulse) => {
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i) / 76,
        y = positions.getY(i) / 76;
      const falloff = Math.max(0, 1 - x * x - y * y);
      const wave = Math.sin(x * 7 + time * 1.8) * Math.cos(y * 5 - time * 1.3);
      const ripple = Math.sin(Math.hypot(x, y) * 15 - time * 2.8);
      positions.setZ(
        i,
        6 + falloff * (19 + wave * 7 + ripple * (2 + pulse * 7)),
      );
      const colourPhase =
        ((((x * 0.65 +
          y * 0.4 +
          Math.sin(y * 4 + time * 0.6) * 0.25 +
          time * 0.12) %
          1) +
          1) %
          1) *
        palette.length;
      const index = Math.floor(colourPhase);
      mixed
        .copy(palette[index])
        .lerp(palette[(index + 1) % palette.length], colourPhase - index);
      colours.setXYZ(i, mixed.r, mixed.g, mixed.b);
    }
    positions.needsUpdate = true;
    colours.needsUpdate = true;
    gelGeometry.computeVertexNormals();
  };
  group.rotation.set(1.08, -0.18, -0.25);
  return group;
}

function opacity(group, amount) {
  group.visible = amount > 0.002;
  group.traverse((object) => {
    if (object.material)
      object.material.opacity =
        amount * (object.material.userData.baseOpacity ?? 1);
  });
}

function drawRibbon(root, layout) {
  const svg = root.querySelector("svg");
  svg.setAttribute("viewBox", `0 0 ${layout.width} ${layout.height}`);
  const edge = root.querySelector("[data-ribbon-edge]");
  const motion = root.querySelector("[data-motion-path]");
  edge.setAttribute("d", layout.ribbon);
  motion.setAttribute("d", layout.motion);
  const length = edge.getTotalLength();
  const samples = Array.from({ length: 181 }, (_, i) => {
    const t = i / 180;
    const p = edge.getPointAtLength(t * length);
    // A single twist gives the transparent woven ribbon a front and back face.
    const width = 76 * Math.cos(t * Math.PI * 2.05 + 0.15);
    return { x: p.x, y: p.y, width };
  });
  let impact = 0;
  const displacement = (x) =>
    impact * 22 * Math.exp(-(((x - layout.start[0]) / 115) ** 2));
  const line = (fraction) =>
    samples
      .map(
        (p, i) =>
          `${i ? "L" : "M"}${p.x.toFixed(2)} ${(p.y + p.width * fraction + displacement(p.x)).toFixed(2)}`,
      )
      .join(" ");
  root.querySelector("[data-ribbon-surface]").setAttribute(
    "d",
    line(0) +
      samples
        .toReversed()
        .map((p) => `L${p.x.toFixed(2)} ${(p.y + p.width).toFixed(2)}`)
        .join(" ") +
      "Z",
  );
  const threads = root.querySelector("[data-ribbon-threads]");
  threads.replaceChildren();
  for (let i = 1; i <= 34; i++) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", line(i / 34));
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", i % 2 ? "#ffffff" : "#8d78ad");
    path.setAttribute("stroke-opacity", i % 2 ? ".62" : ".22");
    path.setAttribute("stroke-width", ".65");
    path.setAttribute("stroke-dasharray", "1 3");
    threads.append(path);
  }
  const threadPaths = [...threads.children];
  return {
    displacement,
    update(value) {
      if (value === impact || (value !== 0 && Math.abs(value - impact) < 0.002))
        return;
      impact = value;
      edge.setAttribute("d", value === 0 ? layout.ribbon : line(0));
      root.querySelector("[data-ribbon-surface]").setAttribute(
        "d",
        line(0) +
          samples
            .toReversed()
            .map(
              (p) =>
                `L${p.x.toFixed(2)} ${(p.y + p.width + displacement(p.x)).toFixed(2)}`,
            )
            .join(" ") +
          "Z",
      );
      threadPaths.forEach((path, i) =>
        path.setAttribute("d", line((i + 1) / 34)),
      );
    },
  };
}

export function createCoinScene(root, onPausedChange) {
  const host = root.querySelector(".coin-canvas");
  const canvas = document.createElement("canvas");
  const attributes = {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  };
  let context;
  try {
    context = canvas.getContext("webgl2", attributes);
  } catch {
    return null;
  }
  // Do not construct Three's renderer when the browser disables WebGL.
  // Reuse this context so capability detection doesn't allocate a second one.
  if (!context) return null;
  const renderer = new THREE.WebGLRenderer({ canvas, context, ...attributes });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1400, 0, -820, 0.1, 2000);
  camera.position.z = 1000;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-200, 400, 600);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe4ccff, 2);
  fill.position.set(600, -300, 300);
  scene.add(fill);
  const emitter = makeEmitter();
  const emitterFrame = new THREE.Group();
  emitterFrame.add(emitter);
  scene.add(emitterFrame);
  const coins = [
    makeCoin("#c8d5ec", "#4285f4", 0),
    makeCoin("#0866ff", "#0866ff", 1),
    makeCoin("#185c42", "#efcf83", 2),
    makeCoin("#7ab55c", "#ffffff", 3),
    makeCoin("#c8d5ec", "#4285f4", 4),
  ];
  const coinFrames = coins.map((coin) => {
    const frame = new THREE.Group();
    frame.add(coin);
    scene.add(frame);
    return frame;
  });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let userPaused = reduced.matches;
  let inView = true;
  let timeline;
  let layout;
  let states = [];
  let ribbon;
  const emitterState = { alpha: 1 };
  const render = () => {
    emitterFrame.position.set(layout.emitter[0], -layout.emitter[1], 0);
    opacity(emitter, emitterState.alpha);
    const staticPose = reduced.matches && userPaused;
    const pulse = staticPose
      ? 0
      : states.reduce((sum, state) => sum + state.gel, 0);
    if (emitter.visible)
      emitter.userData.updateJelly(
        staticPose ? 2 : (timeline?.totalTime() ?? 0),
        pulse,
      );
    ribbon.update(
      staticPose ? 0 : states.reduce((sum, state) => sum + state.impact, 0),
    );
    coins.forEach((coin, i) => {
      const state = states[i];
      coinFrames[i].position.set(
        state.x,
        -(state.y + (state.riding ? ribbon.displacement(state.x) : 0)),
        35,
      );
      const rotation =
        reduced.matches && userPaused
          ? [-0.35, 0.35, -0.45, 0.25, -0.3][i]
          : state.rotation;
      coin.rotation.set(
        0.12 + Math.sin(rotation) * 0.12,
        rotation,
        -0.16 + (i % 3) * 0.1,
      );
      coin.scale.setScalar(state.scale);
      opacity(coin, state.alpha);
    });
    renderer.render(scene, camera);
  };
  function syncPlayback() {
    if (!timeline) return;
    timeline.paused(userPaused || !inView || document.hidden);
  }
  function resize() {
    // Layout dimensions remain stable while an ancestor moves through 3D space.
    const bounds = { width: root.clientWidth, height: root.clientHeight };
    const next = window.innerWidth <= 1000 ? MOBILE : DESKTOP;
    renderer.setSize(bounds.width, bounds.height);
    // Preserve circular geometry while the SVG coordinate space adapts to the viewport.
    const aspectCorrection =
      (bounds.height * next.width) / (bounds.width * next.height);
    emitterFrame.scale.x = aspectCorrection;
    coinFrames.forEach((frame) => {
      frame.scale.x = aspectCorrection;
    });
    camera.right = next.width;
    camera.bottom = -next.height;
    camera.updateProjectionMatrix();
    if (layout === next) {
      render();
      return;
    }
    const previousProgress = timeline?.progress();
    timeline?.kill();
    layout = next;
    ribbon = drawRibbon(root, layout);
    states = coins.map(() => ({
      x: layout.emitter[0],
      y: layout.emitter[1] + 12,
      alpha: 0,
      scale: 0.35,
      rotation: -0.65,
      gel: 0,
      impact: 0,
      riding: false,
    }));
    emitterState.alpha = 1;
    timeline = gsap.timeline({ repeat: -1, repeatDelay: 0, onUpdate: render });
    coins.forEach((coin, i) => {
      const state = states[i];
      const time = (0.55 + i * COIN_INTERVAL) / COIN_SPEED;
      const landing = time + 1.65 / COIN_SPEED;
      timeline
        .to(
          state,
          {
            alpha: 1,
            scale: 1,
            duration: 0.65 / COIN_SPEED,
            ease: "power2.out",
          },
          time,
        )
        .to(
          state,
          {
            x: layout.start[0],
            y: layout.start[1] - COIN_CONTACT_OFFSET,
            duration: 1.65 / COIN_SPEED,
            ease: "power1.in",
          },
          time,
        )
        .set(state, { riding: true }, landing)
        .to(
          state,
          {
            motionPath: {
              path: layout.motion,
              offsetY: -COIN_CONTACT_OFFSET,
              autoRotate: false,
            },
            duration: 6.5 / COIN_SPEED,
            ease: "none",
          },
          landing,
        )
        .to(
          state,
          {
            rotation: Math.PI * 2 - 0.4,
            duration: 8.15 / COIN_SPEED,
            ease: "none",
          },
          time,
        )
        .to(
          state,
          {
            alpha: 0,
            scale: 0.82,
            duration: 0.65 / COIN_SPEED,
            ease: "power1.in",
          },
          time + 7.5 / COIN_SPEED,
        )
        .to(state, { gel: 1, duration: 0.14, ease: "sine.out" }, time)
        .to(state, { gel: 0, duration: 0.55, ease: "sine.inOut" }, time + 0.14)
        .to(state, { impact: 1, duration: 0.075, ease: "power2.out" }, landing)
        .to(
          state,
          { impact: -0.12, duration: 0.26, ease: "sine.inOut" },
          landing + 0.075,
        )
        .to(
          state,
          { impact: 0, duration: 0.38, ease: "sine.out" },
          landing + 0.335,
        );
    });
    // The emitter stays visible throughout the loop; only the coins fade out.
    if (previousProgress !== undefined) timeline.progress(previousProgress);
    else if (reduced.matches) timeline.time(6.8 / COIN_SPEED);
    syncPlayback();
    render();
    root.dataset.ready = "true";
  }
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(root);
  const intersection = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
      syncPlayback();
    },
    { threshold: [0, 0.05] },
  );
  intersection.observe(root);
  const onMotionChange = () => {
    userPaused = reduced.matches;
    if (userPaused) timeline.time(6.8 / COIN_SPEED);
    syncPlayback();
    onPausedChange?.(userPaused);
    render();
  };
  reduced.addEventListener("change", onMotionChange);
  document.addEventListener("visibilitychange", syncPlayback);
  return {
    paused: userPaused,
    setPaused(value) {
      userPaused = value;
      syncPlayback();
    },
    dispose() {
      timeline.kill();
      observer.disconnect();
      intersection.disconnect();
      reduced.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", syncPlayback);
      const geometries = new Set(),
        materials = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) materials.add(object.material);
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      host.replaceChildren();
      delete root.dataset.ready;
    },
  };
}
