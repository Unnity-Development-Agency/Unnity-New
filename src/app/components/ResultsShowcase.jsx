"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./ResultsShowcase.css";

const screenshots = [
  { file: "gp3", title: "Sales over time", category: "E-commerce" },
  { file: "gp6", title: "Store performance", category: "E-commerce" },
  { file: "gp7", title: "Ad performance", category: "Meta Ads" },
  { file: "gp8", title: "Campaign overview", category: "Google Ads" },
  { file: "gp9", title: "Conversions at a glance", category: "Google Ads" },
];

export default function ResultsShowcase() {
  const trackRef = useRef(null);
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(screenshots[0]);

  useEffect(() => {
    const track = trackRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    track.dataset.animate = "true";
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            entry.target.style.setProperty("--open-delay", `${index * 0.5}s`);
            entry.target.dataset.open = "true";
            observer.unobserve(entry.target);
          });
      },
      { threshold: 0.4 },
    );
    track
      .querySelectorAll(".results-card")
      .forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  function scroll(direction) {
    const track = trackRef.current;
    const card = track.querySelector(".results-card");
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 20),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function preview(screenshot) {
    setSelected(screenshot);
    dialogRef.current.showModal();
  }

  return (
    <section className="results-showcase" aria-labelledby="results-heading">
      <div className="results-header">
        <h2 id="results-heading">A closer look at performance</h2>
      </div>
      <div
        className="results-track"
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Five performance screenshots. Scroll horizontally to explore."
      >
        {screenshots.map((screenshot, index) => (
          <article className="results-card" key={screenshot.file}>
            <button
              className="results-laptop"
              onClick={() => preview(screenshot)}
              aria-label={`Enlarge ${screenshot.title} screenshot`}
            >
              <span className="results-lid">
                <span className="results-camera" />
                <span className="results-screen">
                  <Image
                    src={`/Screenshots/${screenshot.file}.webp`}
                    alt={`${screenshot.category}: ${screenshot.title}`}
                    fill
                    sizes="(max-width: 700px) 86vw, (max-width: 900px) 46vw, (max-width: 1440px) 31vw, 420px"
                  />
                  <span className="results-enlarge">
                    <Maximize2 size={13} />
                  </span>
                </span>
                <span className="results-device-label">MacBook Pro</span>
              </span>
              <span className="results-base">
                <span />
              </span>
            </button>
            <div className="results-caption">
              <span className="results-index">0{index + 1}</span>
              <div>
                <h3>{screenshot.title}</h3>
                <p>{screenshot.category}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="results-footer">
        <div className="results-controls">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous screenshot"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next screenshot"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <dialog
        className="results-dialog"
        ref={dialogRef}
        aria-label={`${selected.title} screenshot preview`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="results-dialog-heading">
          <span>{selected.title}</span>
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Close screenshot preview"
            autoFocus
          >
            <X size={20} />
          </button>
        </div>
        <Image
          src={`/Screenshots/${selected.file}.webp`}
          alt={`${selected.category}: ${selected.title}`}
          width={640}
          height={640}
          sizes="(max-width: 700px) 90vw, 640px"
        />
      </dialog>
    </section>
  );
}
