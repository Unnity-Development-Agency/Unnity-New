"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import "./GrowthStories.css";

const stories = [
  {
    name: "PowerMowers",
    photo: "/images/powermowers.webp",
    title: "26x ROAS on 12,000+ SKUs",
    description:
      "Profitable scale for a highly seasonal catalogue on Google Shopping and Meta.",
    metrics: ["$386K+", "$14,865", "25.96"],
  },
  {
    name: "Cupid",
    photo: "/images/Cupid-use.webp",
    logo: "/brands/cupid.webp",
    title: "₹15K to ₹1.5L in daily sales",
    description:
      "Full-stack growth for a plus-size fashion brand, with 40% repeat customers.",
    metrics: ["₹22L", "₹6.7L", "3.44"],
  },
  {
    name: "Kisaan",
    logo: "/images/kissansylogo.avif",
    photo: "/images/Kissansy.webp",
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
    photo: "/images/donmiller.webp",
    logo: "/brands/donmiller1.png",
    title: "₹7.42L in sales in 3 months",
    description:
      "Scaled a men’s leather goods brand through aggressive creative and AI video testing.",
    metrics: ["₹7.42L", "₹3.08L", "2.4"],
  },
  {
    name: "Core",
    photo: "/images/Core-use.webp",
    logo: "/brands/the_core1.png",
    title: "₹2.09L in sales in the first month",
    description:
      "Launched a postnatal fitness brand from scratch, then lifted landing-page conversion by 50%",
    metrics: ["₹7.42L", "₹3.08L", "2.4"],
    finalLabel: "Conversion rate",
  },
  {
    name: "Uberlyfe",
    photo: "/images/uberlife.webp",
    logo: "/brands/uberlyfe1.png",
    title: "183% sales growth in 2 months",
    description:
      "Creatives built around next-day delivery scaled a sofa-bed brand to ₹53L.",
    metrics: ["₹53L", "₹3.78L", "14"],
  },
];


const atmospheres = [
  "linear-gradient(115deg, #606660, #b82c36)",
  "linear-gradient(115deg, #e46583, #49b8bc)",
  "linear-gradient(115deg, #407947, #d3ac49)",
  "linear-gradient(115deg, #782b36, #db414b)",
  "linear-gradient(115deg, #23995d, #318bc2)",
  "linear-gradient(115deg, #62564d, #222222)",
  "linear-gradient(115deg, #173f2d, #397a52)",
  "linear-gradient(115deg, #2877b7, #d9ad48)",
];

function BrandMark({ story }) {
  return story.logo ? (
    <Image src={story.logo} alt="" width={160} height={80} unoptimized />
  ) : <span className="growth-wordmark">{story.name}</span>;
}

function StoryImage({ story }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return <div className="growth-photo-fallback"><BrandMark story={story} /></div>;

  return (
    <>
      {!loaded && (
        <div className="growth-image-loading" role="status" aria-label="Loading brand image">
          <span /><span /><span />
        </div>
      )}
      <Image className="growth-photo" data-loaded={loaded} src={story.photo}
        alt={story.name + " featured brand creative"} fill
        sizes="(max-width: 700px) 90vw, 38vw"
        onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
    </>
  );
}

export default function GrowthStories() {
  const root = useRef(null);
  const reel = useRef(null);
  const [active, setActive] = useState(1);
  const [previous, setPrevious] = useState(1);
  const story = stories[active];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let visible = false;
    function schedule() {
      window.clearTimeout(timer);
      if (!visible || document.hidden || preference.matches) return;
      timer = window.setTimeout(() => {
        setPrevious(active);
        setActive((active + 1) % stories.length);
      }, 5000);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }, { threshold: 0.2 });
    observer.observe(root.current);
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, [active]);

  useEffect(() => {
    const container = reel.current;
    const selected = container.children[active];
    const horizontal = container.scrollWidth > container.clientWidth;
    container.scrollTo({
      left: horizontal ? selected.offsetLeft - container.offsetLeft - (container.clientWidth - selected.clientWidth) / 2 : 0,
      top: horizontal ? 0 : selected.offsetTop - container.offsetTop - (container.clientHeight - selected.clientHeight) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [active]);

  function select(index) {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
  }

  return (
    <section className="growth-stories" ref={root} aria-labelledby="growth-heading">
      <div className="growth-tint" aria-hidden="true">
        <div className="growth-atmosphere" style={{ background: atmospheres[previous] }} />
        <div className="growth-atmosphere growth-atmosphere-current" key={active} style={{ background: atmospheres[active] }} />
      </div>
      <SectionHeading id="growth-heading" eyebrow="The work. The impact."
        title="Real Results. Real Growth." accent="Your brand could be next." />
      <div className="growth-experience">
        <div className="growth-story" aria-live="polite" aria-atomic="true">
          <article className="growth-story-content" key={active}>
            <div className="growth-result-logo" aria-label={story.name}><BrandMark story={story} /></div>
            <h3>{story.title}</h3>
            <p className="growth-description">{story.description}</p>
            <dl className="growth-metrics">
              {story.metrics.map((value, i) => (
                <div key={i}>
                  <dt>{["Sales", "Spend", story.finalLabel || "ROAS"][i]}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
        <figure className="growth-visual" key={"photo-" + active}>
          {story.photo ? (
            <StoryImage story={story} />
          ) : (
            <div className="growth-photo-fallback"><BrandMark story={story} /></div>
          )}
        </figure>
        <nav className="growth-reel" ref={reel} aria-label="Choose a brand to view its results">
          {stories.map((item, index) => (
            <button type="button" className="growth-reel-brand" key={item.name}
              aria-label={"View " + item.name + " results"} aria-pressed={active === index}
              onClick={() => select(index)}>
              <BrandMark story={item} />
              <span className="growth-selection-dot" aria-hidden="true" />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
