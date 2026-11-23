"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVisual() {
  const root = useRef(null);
  const controller = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let disposed = false;
    let cleanup;
    import("./coinScene").then(({ createCoinScene }) => {
      if (disposed) return;
      const scene = createCoinScene(root.current, setPaused);
      controller.current = scene;
      cleanup = scene.dispose;
      setPaused(scene.paused);
    }).catch(() => {
      root.current?.setAttribute("data-unavailable", "true");
    });
    return () => { disposed = true; cleanup?.(); controller.current = null; };
  }, []);
  return (
    <div className="hero-visual" ref={root}>
      <svg className="ribbon-svg" viewBox="0 0 1400 820" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ribbon-fill" x1="0" y1="0" x2="1" y2=".4">
            <stop offset="0" stopColor="#83729f" stopOpacity=".45" />
            <stop offset=".25" stopColor="#e9e0fa" stopOpacity=".18" />
            <stop offset=".5" stopColor="#c5b5df" stopOpacity=".4" />
            <stop offset=".72" stopColor="#b9a9d0" stopOpacity=".23" />
            <stop offset="1" stopColor="#74618f" stopOpacity=".5" />
          </linearGradient>
          <linearGradient id="ribbon-edge"><stop stopColor="#a79aba" /><stop offset=".45" stopColor="#e9e2f0" /><stop offset=".7" stopColor="#9683b2" /><stop offset="1" stopColor="#77618f" /></linearGradient>
        </defs>
        <path data-ribbon-surface fill="url(#ribbon-fill)" d="M-100 440 C80 390 180 380 330 505 C450 640 560 690 700 680 C1080 680 1170 390 1510 340 L1510 430 C1170 480 1080 750 700 700 C560 710 450 580 330 455 C180 330 80 470-100 530Z" />
        <g data-ribbon-threads />
        <path data-ribbon-edge fill="none" stroke="url(#ribbon-edge)" strokeWidth="2" d="M-100 440 C80 390 180 380 330 505 C450 640 560 690 700 680 C1080 680 1170 390 1510 340" />
        <path data-motion-path fill="none" stroke="none" d="M330 505 C450 640 560 690 700 680 C1080 680 1170 390 1510 340" />
      </svg>
      <div className="coin-canvas" aria-hidden="true" />
      <button className="motion-toggle" type="button" aria-label={paused ? "Play animation" : "Pause animation"} aria-pressed={paused} onClick={() => {
        if (!controller.current) return;
        const next = !paused;
        controller.current.setPaused(next);
        setPaused(next);
      }}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
    </div>
  );
}
