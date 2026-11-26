"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useId } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import SectionHeading from "./SectionHeading";
import "./GrowthStories.css";

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

function BrandMark({ story }) {
  return story.logo ? (
    <Image src={story.logo} alt="" width={160} height={64} unoptimized />
  ) : (
    <span className="orbit-wordmark">{story.name}</span>
  );
}

function OrbitPlatform() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="orbit-platform"
      viewBox="0 0 1280 560"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id + "-edge"} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#d8cfdf" />
          <stop offset=".3" stopColor="#c6bbd1" />
          <stop offset="1" stopColor="#a69bb5" />
        </linearGradient>
        <linearGradient id={id + "-floor"} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fdfcfe" />
          <stop offset=".5" stopColor="#eee8f3" />
          <stop offset="1" stopColor="#d6cedf" />
        </linearGradient>
      </defs>
      <ellipse
        cx="640"
        cy="381"
        rx="592"
        ry="167"
        fill="#2a1650"
        opacity=".06"
      />
      {/* Three concentric solid levels form the raised circular stage. */}
      <path
        d="M50 330a590 175 0 0 0 1180 0v32a590 175 0 0 1-1180 0Z"
        fill={"url(#" + id + "-edge)"}
      />
      <ellipse
        cx="640"
        cy="330"
        rx="590"
        ry="175"
        fill="#e4dcea"
        stroke="#bcb0c9"
      />
      <path
        d="M88 307a552 163 0 0 0 1104 0v25a552 163 0 0 1-1104 0Z"
        fill={"url(#" + id + "-edge)"}
      />
      <ellipse
        cx="640"
        cy="307"
        rx="552"
        ry="163"
        fill="#eee8f3"
        stroke="#cdbbdc"
      />
      <path
        d="M124 284a516 151 0 0 0 1032 0v24a516 151 0 0 1-1032 0Z"
        fill={"url(#" + id + "-edge)"}
      />
      <ellipse
        cx="640"
        cy="284"
        rx="516"
        ry="151"
        fill={"url(#" + id + "-floor)"}
        stroke="#fdfcfe"
        strokeWidth="2"
      />
      <ellipse
        cx="640"
        cy="284"
        rx="480"
        ry="132"
        fill="none"
        stroke="#c1b3ce"
        strokeWidth="9"
      />
      <ellipse
        cx="640"
        cy="282"
        rx="480"
        ry="132"
        fill="none"
        stroke="#fdfcfe"
        strokeWidth="2"
      />
      <path
        d="M160 284a480 132 0 0 0 960 0"
        fill="none"
        stroke="#8968a6"
        strokeWidth="2"
      />
      <ellipse
        cx="640"
        cy="284"
        rx="394"
        ry="100"
        fill="none"
        stroke="#d9cbe3"
        strokeWidth="1"
      />
      <path
        d="M640 435v24m-276-46-16 24m568-24 16 24M640 470v24m-295-43-17 24m607-24 17 24"
        stroke="#a69bb5"
        strokeOpacity=".45"
      />
    </svg>
  );
}

export default function GrowthStories() {
  const root = useRef(null);
  const stage = useRef(null);
  const cards = useRef([]);
  const controls = useRef(null);
  const selected = useRef(1);
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const driver = { phase: selected.current };
    let tween;
    let interval;
    let visible = false;
    let width = stage.current.clientWidth;
    let height = stage.current.clientHeight;
    const paint = () => {
      cards.current.forEach((card, i) => {
        const angle = ((i - driver.phase) * Math.PI * 2) / stories.length;
        const depth = (Math.cos(angle) + 1) / 2;
        const x = Math.sin(angle) * width * 0.355;
        const y = height * 0.46 + Math.cos(angle) * height * 0.26;
        card.style.transform =
          "translate(-50%, -50%) translate3d(" +
          x +
          "px," +
          y +
          "px,0) scale(" +
          (0.52 + depth * depth * 0.48) +
          ") rotateY(" +
          -Math.sin(angle) * 24 +
          "deg)";
        card.style.zIndex = String(Math.round(depth * 100) + 10);
        card.style.setProperty("--card-ink", String(0.68 + depth * 0.32));
      });
    };
    const go = (index, forward = false) => {
      const current =
        ((Math.round(driver.phase) % stories.length) + stories.length) %
        stories.length;
      let delta = index - current;
      if (forward) delta = 1;
      else if (delta > 4) delta -= 8;
      else if (delta < -4) delta += 8;
      const target = Math.round(driver.phase) + delta;
      selected.current = index;
      setActive(index);
      tween?.kill();
      if (media.matches) {
        driver.phase = target;
        paint();
      } else
        tween = gsap.to(driver, {
          phase: target,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: paint,
        });
      schedule();
    };
    function schedule() {
      clearInterval(interval);
      if (!visible || document.hidden) {
        tween?.pause();
        return;
      }
      if (paused || media.matches) return;
      tween?.resume();
      interval = setInterval(
        () => go((selected.current + 1) % stories.length, true),
        5000,
      );
    }
    controls.current = { go };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      },
      { threshold: 0.15 },
    );
    observer.observe(root.current);
    const resize = new ResizeObserver(() => {
      width = stage.current.clientWidth;
      height = stage.current.clientHeight;
      paint();
    });
    resize.observe(stage.current);
    document.addEventListener("visibilitychange", schedule);
    media.addEventListener("change", schedule);
    paint();
    return () => {
      clearInterval(interval);
      tween?.kill();
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      media.removeEventListener("change", schedule);
      controls.current = null;
    };
  }, [paused]);

  function choose(index) {
    controls.current?.go((index + stories.length) % stories.length);
  }

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
          <OrbitPlatform />
          <div className="orbit-hub" aria-hidden="true">
            <span>u.</span>
            <i />
          </div>
          {stories.map((story, index) => (
            <button
              key={story.name}
              type="button"
              className="orbit-card"
              ref={(node) => {
                cards.current[index] = node;
              }}
              aria-label={"View " + story.name + " results"}
              aria-pressed={active === index}
              onClick={() => choose(index)}
            >
              <span className="orbit-card-logo">
                <BrandMark story={story} />
              </span>
              <span className="orbit-card-metrics">
                {story.metrics.map((value, i) => (
                  <span key={i}>
                    <strong>{value}</strong>
                    <span>
                      {["Sales", "Spend", story.finalLabel || "ROAS"][i]}
                    </span>
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="orbit-footer">
        <div
          className="orbit-story"
          key={active}
          aria-live={paused ? "polite" : "off"}
        >
          <h3>{stories[active].title}</h3>
          <p>{stories[active].description}</p>
        </div>
        <div className="orbit-controls" aria-label="Result carousel controls">
          <button
            type="button"
            aria-label="Previous brand"
            onClick={() => choose(active - 1)}
          >
            <ArrowLeft size={17} />
          </button>
          <div className="orbit-pagination">
            {stories.map((story, i) => (
              <button
                key={story.name}
                type="button"
                aria-label={"Show " + story.name}
                aria-current={i === active ? "true" : undefined}
                onClick={() => choose(i)}
              >
                <span />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next brand"
            onClick={() => choose(active + 1)}
          >
            <ArrowRight size={17} />
          </button>
          <button
            type="button"
            aria-label={paused ? "Play rotation" : "Pause rotation"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
