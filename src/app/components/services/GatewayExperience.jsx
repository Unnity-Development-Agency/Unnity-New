"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./services.css";

gsap.registerPlugin(ScrollTrigger);

export default function GatewayExperience({ children, services }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const host = root.current;
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 1001px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions.motion) return;
      const desktop = context.conditions.desktop;
      const runway = host.querySelector(".page-turn-runway");
      const world = host.querySelector(".depth-world");
      const hero = host.querySelector(".hero-plane");
      const next = host.querySelector(".services-plane");
      let observer;
      if (desktop) {
        const distance = () => Math.round(Math.min(560, innerHeight * .58));
        const measure = () => {
          host.style.setProperty("--page-height", `${hero.offsetHeight}px`);
          host.style.setProperty("--turn-distance", `${distance()}px`);
        };
        measure();
        host.classList.add("has-page-turn");
        observer = new ResizeObserver(measure);
        observer.observe(hero);
        // Perspective gives the page a gentle inward taper; the side tint keeps
        // the revealed edges connected to the hero's lavender background.
        gsap.set(world, { perspective: 1800 });
        gsap.set(hero, { transformOrigin: "50% 0%", force3D: true });
        gsap.set(next, { opacity: 0 });
        // A single intact page, hinged at its top edge, folds away from the
        // viewer. A short native sticky interval keeps the reveal continuous.
        // Services counter the document movement only during this opening;
        // afterwards their transform is zero and ordinary scrolling resumes.
        const turn = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
          trigger: runway, start: "top top", end: () => `+=${distance()}`,
          scrub: true, invalidateOnRefresh: true, onRefreshInit: measure,
          onUpdate: self => {
            hero.inert = self.progress > .05;
            next.inert = self.progress === 0;
          },
          onToggle: self => { hero.style.willChange = self.isActive ? "transform, opacity" : "auto"; },
        } });
        next.inert = true;
        turn.to(hero, { rotationX: -88, z: -70, duration: 1 }, 0)
          .to(hero, { autoAlpha: 0, duration: .1 }, .9)
          .fromTo(next, { y: () => -distance(), force3D: false }, { y: 0, force3D: false, duration: 1 }, 0)
          .to(host.querySelector(".page-shade"), { opacity: .35, duration: 1 }, 0);
        turn.to(host.querySelector(".page-side-tint"), { opacity: 0, duration: .2 }, .8);
        // Reveal the section immediately through the opening, not as a late fade.
        turn.to(next, { opacity: 1, duration: .08 }, 0);
        hero.inert = turn.scrollTrigger.progress > .05;
        next.inert = turn.scrollTrigger.progress === 0;
      }
      return () => {
        observer?.disconnect();
        host.classList.remove("has-page-turn");
        host.style.removeProperty("--page-height");
        host.style.removeProperty("--turn-distance");
        hero.style.removeProperty("will-change");
        hero.inert = false;
        next.inert = false;
      };
    }, host);
    return () => media.revert();
  }, []);

  const skipOpening = event => {
    const host = root.current;
    if (!host.classList.contains("has-page-turn")) return;
    event.preventDefault();
    const runway = host.querySelector(".page-turn-runway");
    const distance = parseFloat(host.style.getPropertyValue("--turn-distance"));
    window.scrollTo({ top: runway.getBoundingClientRect().top + window.scrollY + distance + 1, behavior: "instant" });
    ScrollTrigger.update();
    host.querySelector("#services-heading")?.focus({ preventScroll: true });
  };

  return <div className="cinematic-experience" ref={root}>
    <a className="experience-skip" href="#services" onClick={skipOpening}>Skip to services</a>
    <div className="page-turn-runway">
      <div className="hero-gateway">
        <div className="page-side-tint" aria-hidden="true" />
        <div className="depth-world">
          <div className="hero-plane">{children}<div className="page-shade" aria-hidden="true" /></div>
        </div>
      </div>
    </div>
    <div className="services-plane">{services}</div>
  </div>;
}
