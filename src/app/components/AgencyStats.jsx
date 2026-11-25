"use client";

import { useEffect, useRef } from "react";
import "./AgencyStats.css";

export default function AgencyStats() {
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          strip.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  function followPointer(event) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <section
      className="agency-stats"
      aria-label="Unnity Media in numbers"
      ref={stripRef}
      onPointerMove={followPointer}
    >
      <div className="agency-stats-grid">
        <div className="agency-stat">
          <span className="agency-stat-kicker">Built on experience</span>
          <p className="agency-stat-number">
            8<span>+</span>
          </p>
          <p className="agency-stat-description">
            Years in performance marketing
          </p>
          <div
            className="agency-stat-timeline"
            aria-label="Agency timeline from 2018 to 2026"
          >
            <div className="agency-stat-track" aria-hidden="true">
              <span />
            </div>
            <div className="agency-stat-years">
              <span>2018</span>
              <span>Agency</span>
              <span>2026</span>
            </div>
          </div>
        </div>
        <div className="agency-stat">
          <span className="agency-stat-kicker">Trust, earned</span>
          <p className="agency-stat-number">
            100<span>+</span>
          </p>
          <p className="agency-stat-description">
            E-commerce &amp; lead-gen
            <br />
            brands worked with
          </p>
          <div className="agency-stat-footnote">
            <span className="agency-stat-dot" />
            Across industries. Built for growth.
          </div>
        </div>
        <div className="agency-stat">
          <span className="agency-stat-kicker">Scale with intent</span>
          <p className="agency-stat-number">
            <span className="agency-stat-currency">₹</span>2.5<span>Cr</span>
          </p>
          <p className="agency-stat-description">
            Monthly ad budgets
            <br />
            managed by our founder
          </p>
          <div className="agency-stat-footnote">
            <span className="agency-stat-bars" aria-hidden="true">
              {[4, 7, 5, 10, 8, 13, 11, 16].map((height, index) => (
                <i key={index} style={{ height }} />
              ))}
            </span>
            Every rupee. Accountable.
          </div>
        </div>
        <div className="agency-stat">
          <span className="agency-stat-kicker">One team. All in.</span>
          <p className="agency-stat-number">
            20
            <span className="agency-stat-location">
              <i />
              Delhi, IN
            </span>
          </p>
          <p className="agency-stat-description">
            In-house specialists,
            <br />
            one office in Delhi
          </p>
          <div className="agency-stat-skills">
            <span>Performance</span>
            <span>Creative</span>
            <span>Web dev</span>
            <span>Mobile App</span>
            <span>SEO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
