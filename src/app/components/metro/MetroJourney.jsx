"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MousePointer2, TrendingUp, UserRoundX, ChartNoAxesCombined, ArrowDownRight } from "lucide-react";
import MetroArtwork from "./MetroArtwork";
import { routes } from "./metro-geometry";
import { carriagePoint, carriagePoses } from "./metro-motion";
import "./metro-journey.css";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  { icon: MousePointer2, title: "Clicks Without Leads", text: "Attention that never turns into intent." },
  { icon: TrendingUp, title: "Rising Ad Spend", text: "Bigger budgets. The same bottlenecks." },
  { icon: UserRoundX, title: "Leads Without Sales", text: "Enquiries come in. Customers don’t." },
  { icon: ChartNoAxesCombined, title: "No Clear Insights", text: "Numbers everywhere. Direction nowhere." },
];

export default function MetroJourney() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({ mobile: "(max-width: 700px)", desktop: "(min-width: 701px)", reduce: "(prefers-reduced-motion: reduce)" }, context => {
      const variant = context.conditions.mobile ? "mobile" : "desktop";
      const artwork = root.current.querySelector(`.metro-artwork-${variant}`);
      const route = routes[variant];
      const path = artwork.querySelector("[data-metro-route]");
      const length = path.getTotalLength();
      const cars = [...artwork.querySelectorAll("[data-metro-car]")];
      const couplings = [...artwork.querySelectorAll("[data-metro-coupling]")];
      const stations = [...artwork.querySelectorAll("[data-metro-station]")];
      const progress = { value: 0 };
      const end = length - 100 * route.trainScale;
      const start = route.initial - route.start;
      const draw = () => {
        const head = start + (end - start) * progress.value;
        const poses = carriagePoses(path, head, route);
        cars.forEach(car => {
          const pose = poses[Number(car.dataset.metroCar)];
          const angle = pose.radians * 180 / Math.PI;
          car.setAttribute("transform", `translate(${pose.x.toFixed(2)} ${pose.y.toFixed(2)}) rotate(${angle.toFixed(2)})`);
        });
        couplings.forEach(coupling => {
          const index = Number(coupling.dataset.metroCoupling);
          const point = (pose, x, y) => carriagePoint(pose, x, y, route.trainScale);
          const a = point(poses[index], 84, -55);
          const b = point(poses[index - 1], -85, -55);
          const c = point(poses[index - 1], -85, -11);
          const d = point(poses[index], 84, -11);
          const coordinates = p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
          coupling.querySelector('[data-gangway-body]').setAttribute('d', `M${coordinates(a)}L${coordinates(b)}L${coordinates(c)}L${coordinates(d)}Z`);
          const folds = [.2,.4,.6,.8].map(t => `M${coordinates({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })}L${coordinates({ x: d.x + (c.x - d.x) * t, y: d.y + (c.y - d.y) * t })}`).join('');
          coupling.querySelector('[data-gangway-folds]').setAttribute('d', folds);
        });
        stations.forEach(station => {
          station.dataset.reached = String(progress.value >= Number(station.dataset.at));
        });
      };
      if (context.conditions.reduce) {
        progress.value = .6;
        draw();
        stations.forEach(station => { station.dataset.reached = "true"; });
      } else {
        artwork.dataset.motion = "true";
        draw();
        gsap.to(progress, { value: 1, ease: "none", onUpdate: draw, scrollTrigger: {
          trigger: root.current, start: "top 65%", end: "clamp(bottom 75%)", scrub: .7, invalidateOnRefresh: true,
        } });
      }
      return () => {
        delete artwork.dataset.motion;
        stations.forEach(station => { delete station.dataset.reached; });
      };
    }, root);
    return () => media.revert();
  }, []);

  return <section className="metro-journey" ref={root} aria-labelledby="metro-heading">
    <div className="metro-inner">
      <header className="metro-heading">
        <p className="metro-eyebrow">The gap between spend &amp; growth</p>
        <h2 id="metro-heading">Your ads are moving.<br /><span>Is your revenue keeping up?</span></h2>
        <p className="metro-intro">The budget goes in. The clicks come through. But somewhere<br className="metro-desktop-break" /> between attention and action, the returns fall away.</p>
      </header>
      <figure className="metro-figure">
        <MetroArtwork variant="desktop" />
        <MetroArtwork variant="mobile" />
        <figcaption><span><ArrowDownRight size={14} aria-hidden="true" />A busy journey. A different destination.</span><span>Illustrative scenario · Monthly figures</span></figcaption>
      </figure>
      <ul className="metro-problems">
        {problems.map(({ icon: Icon, title, text }) => <li key={title}><Icon size={21} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></li>)}
      </ul>
    </div>
  </section>;
}
