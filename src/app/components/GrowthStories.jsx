"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SectionHeading from "./SectionHeading";
import "./GrowthStories.css";
import { createResultsRing, getResultsRingTop } from "./resultsRing";

const stories = [
  {
    name: "PowerMowers",
    title: "26x ROAS on 12,000+ SKUs",
    description:
      "Profitable scale for a highly seasonal catalogue on Google Shopping and Meta.",
    metrics: ["$386K+", "$14,865", "25.96"],
  },
  {
    name: "Cupid",
    logo: "/brands/cupid.webp",
    title: "₹15K to ₹1.5L in daily sales",
    description:
      "Full-stack growth for a plus-size fashion brand, with 40% repeat customers.",
    metrics: ["₹22L", "₹6.7L", "3.44"],
  },
  {
    name: "Kisaan",
    logo: "/images/kissansylogo.avif",
    title: "₹1.29 Cr in monthly sales",
    description:
      "Scaled a ₹34 Cr-funded brand on Meta and Google, cutting ₹6L in wasted spend.",
    metrics: ["₹1.29Cr", "₹46L", "2.7"],
  },
  {
    name: "Hubhawks",
    logo: "/brands/hub1.png",
    title: "₹52L in sales at 16.5x ROAS",
    description:
      "Premium author packages, starting at ₹1.8L, sold through branding and Meta and Google ads.",
    metrics: ["₹52L", "₹3L", "16.5"],
  },
  {
    name: "ETravelSim",
    logo: "/brands/e-travel.avif",
    title: "$2K to $100K in monthly sales",
    description:
      "Global Google Ads for an eSIM brand, converting at nearly 10% with sharp targeting.",
    metrics: ["₹2.82Cr", "₹1.02Cr", "2.76"],
  },
  {
    name: "Don Miller",
    logo: "/brands/donmiller1.png",
    title: "₹7.42L in sales in 3 months",
    description:
      "Scaled a men’s leather goods brand through aggressive creative and AI video testing.",
    metrics: ["₹7.42L", "₹3.08L", "2.4"],
  },
  {
    name: "Core",
    logo: "/brands/the_core1.png",
    title: "₹2.09L in sales in the first month",
    description:
      "Launched a postnatal fitness brand from scratch, then lifted landing-page conversion by 50%",
    metrics: ["₹7.42L", "₹3.08L", "2.4"],
    finalLabel: "Conversion rate",
  },
  {
    name: "Uberlyfe",
    logo: "/brands/uberlyfe1.png",
    title: "183% sales growth in 2 months",
    description:
      "Creatives built around next-day delivery scaled a sofa-bed brand to ₹53L.",
    metrics: ["₹53L", "₹3.78L", "14"],
  },
];

export default function GrowthStories() {
  const root = useRef(null);
  const stage = useRef(null);
  const canvas = useRef(null);
  const controls = useRef(null);
  const selected = useRef(1);
  const [active, setActive] = useState(1);

  const phase = useRef(1);
  useEffect(() => {
    const element = root.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const driver = { phase: phase.current };
    let tween;
    let visible = false;
    let frame = 0;
    const lighting = { value: getResultsRingTop(canvas.current) > 100 ? 1 : 0 };
    let lightTween;
    const ring = createResultsRing(canvas.current, stories, index => controls.current?.go(index));
    const paint = () => {
      phase.current = driver.phase;
      const nearest = ((Math.round(driver.phase) % stories.length) + stories.length) % stories.length;
      if (selected.current !== nearest) { selected.current = nearest; setActive(nearest); }
      ring?.render(driver.phase, lighting.value, media.matches);
    };
    const start = () => {
      tween?.kill();
      const moving = !media.matches && visible && !document.hidden;
      element.dataset.moving = String(moving);
      if (!moving) { paint(); return; }
      tween = gsap.to(driver, { phase: driver.phase + stories.length, duration: stories.length * 7, ease: "none", onUpdate: paint, onComplete: start });
    };
    const go = (index) => {
      tween?.kill();
      element.dataset.moving = "false";
      let delta = index - ((Math.round(driver.phase) % stories.length) + stories.length) % stories.length;
      if (delta > 4) delta -= 8;
      if (delta < -4) delta += 8;
      const target = Math.round(driver.phase) + delta;
      if (media.matches) { driver.phase = target; paint(); }
      else tween = gsap.to(driver, { phase: target, duration: .85, ease: "power2.inOut", onUpdate: paint, onComplete: start });
    };
    controls.current = { go };
    const checkLights = () => {
      frame = 0;
      const next = getResultsRingTop(canvas.current) <= 100 ? "off" : "on";
      if (element.dataset.lights === next) return;
      element.dataset.lights = next;
      lightTween?.kill();
      lightTween = gsap.to(lighting, { value: next === "on" ? 1 : 0, duration: media.matches ? 0 : .6, onUpdate: paint });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(checkLights); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }, { threshold: .05 });
    observer.observe(stage.current);
    const resize = new ResizeObserver(checkLights);
    resize.observe(stage.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", start);
    media.addEventListener("change", start);
    paint(); checkLights();
    return () => {
      tween?.kill(); lightTween?.kill(); ring?.dispose(); cancelAnimationFrame(frame);
      observer.disconnect(); resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", start);
      media.removeEventListener("change", start);
      controls.current = null;
    };
  }, []);

  return (
    <section
      className="growth-stories"
      ref={root}
      aria-labelledby="growth-heading"
    >
      <SectionHeading
        id="growth-heading"
        eyebrow="The work. The impact."
        title="Real Results. Real Growth."
        accent="Your brand could be next."
      />
      <div className="orbit-viewport">
        <div className="orbit-stage" ref={stage}>
          <canvas ref={canvas} className="results-ring-canvas" role="img" aria-label="Rotating metallic results ring. Select a card to bring its results to the front." />
          <div className="ring-accessible-data">
            {stories.map(story => <p key={story.name}>{story.name}: {story.metrics.map((value, i) => value + " " + ["Sales", "Spend", story.finalLabel || "ROAS"][i]).join(", ")}</p>)}
          </div>
        </div>
      </div>
      <div className="orbit-footer">
        <div
          className="orbit-story"
          key={active}
          aria-live="off"
        >
          <h3>{stories[active].title}</h3>
          <p>{stories[active].description}</p>
        </div>

      </div>
    </section>
  );
}
