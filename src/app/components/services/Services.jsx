"use client";
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "./services-data";
import ServiceArtwork from "./ServiceArtwork";
gsap.registerPlugin(ScrollTrigger);
const tones = ["#ffffff", "#eee7f6", "#d3c1e7", "#80639f", "#2a1650"];
export default function Services() {
  const root = useRef(null);
  const scroll = useRef(null);
  useLayoutEffect(() => {
    const host = root.current;
    const panels = [...host.querySelectorAll(".service-panel")];
    const links = [...host.querySelectorAll(".services-index a")];
    const stage = host.querySelector(".services-stage");
    const runway = host.querySelector(".services-runway");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.dataset.visible = String(entry.isIntersecting);
    }), { threshold: .12 });
    panels.forEach(panel => observer.observe(panel));
    const media = gsap.matchMedia();
    media.add("(min-width: 1001px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)", () => {
      host.classList.add("services-sequential");
      gsap.set(panels.slice(1), { autoAlpha: 0 });
      let active = -1;
      const select = index => {
        if (active === index) return;
        active = index;
        panels.forEach((panel, i) => { panel.inert = i !== index; panel.dataset.active = String(i === index); });
        links.forEach((link, i) => {
          if (i === index) link.setAttribute("aria-current", "step");
          else link.removeAttribute("aria-current");
        });
      };
      const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: runway,
        start: () => runway.getBoundingClientRect().top + window.scrollY - Number(gsap.getProperty(host.closest(".services-plane"), "y")) - 100,
        end: "+=750",
        scrub: true, invalidateOnRefresh: true,
        onToggle: self => stage.classList.toggle("is-pinned", self.isActive),
        onUpdate: self => {
          select(Math.min(4, Math.floor(self.progress * 5)));
          links.forEach((link, i) => link.style.setProperty("--fill", Math.min(1, Math.max(0, self.progress * 5 - i))));
        },
      }});
      timeline.to({}, { duration: 5 });
      for (let i = 1; i < panels.length; i++) {
        timeline.to(panels[i - 1], { autoAlpha: 0, duration: .3 }, i - .3)
          .to(panels[i], { autoAlpha: 1, duration: .3 }, i - .3)
          .to(stage, { backgroundColor: tones[i], color: i >= 3 ? "#fbf7ff" : "#251438", "--detail": i >= 3 ? "#e5d9ee" : "#685279", "--service-title": i >= 3 ? "#ffffff" : "#63457e", duration: .45 }, i - .45);
      }
      scroll.current = timeline.scrollTrigger;
      select(Math.min(4, Math.floor(timeline.scrollTrigger.progress * 5)));
      return () => {
        scroll.current = null;
        stage.classList.remove("is-pinned");
        host.classList.remove("services-sequential");
        panels.forEach(panel => { panel.inert = false; delete panel.dataset.active; });
        links.forEach(link => { link.removeAttribute("aria-current"); link.style.removeProperty("--fill"); });
      };
    });
    return () => { observer.disconnect(); media.revert(); };
  }, []);
  const navigate = (event, index) => {
    if (!scroll.current) return;
    event.preventDefault();
    const trigger = scroll.current;
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * ((index + .45) / 5), behavior: "instant" });
    ScrollTrigger.update();
  };
  return <section className="services" id="services" ref={root} aria-labelledby="services-heading">
    <header className="services-heading-row">
      <h2 id="services-heading" tabIndex={-1}>Everything your brand<br /><span>needs to grow online.</span></h2>
    </header>
    <div className="services-runway"><div className="services-stage">
      <nav className="services-index" aria-label="Explore our five services">
        {services.map((service, i) => <a key={service.id} href={`#service-${service.id}`} onClick={event => navigate(event, i)}>
          <span className="index-number">0{i + 1}</span><span className="index-label">{service.short}</span><i className="index-liquid" aria-hidden="true" />
        </a>)}
      </nav>
      <div className="service-panels">
        {services.map((service, i) => <article className="service-panel" id={`service-${service.id}`} data-service={i} key={service.id} style={{ "--panel-tone": tones[i] }} aria-labelledby={`title-${service.id}`}>
          <div className="service-copy">
            <p className="service-chapter"><span>0{i + 1}</span> / 05</p>
            <h3 id={`title-${service.id}`} tabIndex={-1}>{service.title}</h3>
            <p className="service-lead">{service.line}</p>
            <p className="service-description">{service.description}</p>
            <ul className="service-capabilities">{service.capabilities.map(item => <li key={item}>{item}</li>)}</ul>
            <a className="service-contact" href="https://calendly.com/sayam-unnity/30min">Let’s talk about your project <ArrowUpRight size={17} /></a>
          </div>
          <figure className={`service-visual service-visual-${service.id}`}><ServiceArtwork id={service.id} /><figcaption><span>{service.visual}</span><span>Animated concept</span></figcaption></figure>
        </article>)}
      </div>
    </div></div>
  </section>;
}
