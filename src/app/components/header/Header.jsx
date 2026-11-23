"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "./navigation";
import "./header-motion.css";

export default function Header() {
  const pathname = usePathname();
  const root = useRef(null);
  const workButton = useRef(null);
  const menuButton = useRef(null);
  const menuIsOpen = useRef(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  function closeMenus() {
    menuIsOpen.current = false;
    setMobileOpen(false);
    setWorkOpen(false);
  }

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY),
      direction = 0,
      distance = 0,
      frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(
        0,
        Math.min(
          window.scrollY,
          document.documentElement.scrollHeight - innerHeight,
        ),
      );
      const delta = y - lastY;
      lastY = y;
      if (y <= 4) {
        setHidden(false);
        distance = 0;
        return;
      }
      if (!delta) return;
      const nextDirection = Math.sign(delta);
      distance =
        nextDirection === direction
          ? distance + Math.abs(delta)
          : Math.abs(delta);
      direction = nextDirection;
      // Down dissolves the header; a small upward movement brings it back.
      if (distance >= (direction < 0 ? 2 : 6)) {
        if (
          direction < 0 ||
          menuIsOpen.current ||
          root.current?.contains(document.activeElement)
        )
          setHidden(false);
        else setHidden(true);
        distance = 0;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const outside = (event) => {
      if (!root.current?.contains(event.target)) {
        menuIsOpen.current = false;
        setMobileOpen(false);
        setWorkOpen(false);
      }
    };
    const escape = (event) => {
      if (event.key !== "Escape" || !menuIsOpen.current) return;
      const mobile = window.matchMedia("(max-width: 1099px)").matches;
      menuIsOpen.current = false;
      setMobileOpen(false);
      setWorkOpen(false);
      (mobile ? menuButton : workButton).current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onBreakpoint = () => {
      menuIsOpen.current = false;
      setMobileOpen(false);
      setWorkOpen(false);
      setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, []);

  const linkClass =
    "wind-item block rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-[#0f032b]/5 hover:text-[#0f032b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8f74b3]";
  return (
    <>
      <div
        className="h-[104px] shrink-0 max-[1099px]:h-[92px]"
        aria-hidden="true"
      />
      <a
        href="#main-content"
        className="fixed left-6 top-3 z-[70] -translate-y-24 rounded-md bg-[#0f032b] px-4 py-3 text-sm text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={root}
        data-hidden={hidden}
        aria-hidden={hidden || undefined}
        inert={hidden || undefined}
        className="wind-header fixed inset-x-4 top-4 z-50 mx-auto max-w-[1200px] min-[1100px]:inset-x-8"
      >
        <div className="wind-surface relative flex min-h-[68px] items-center justify-between gap-5 rounded-full border border-[#0f032b]/[0.08] bg-[#f8f5fc]/85 px-5 shadow-[0_5px_24px_rgba(15,3,43,0.035)] backdrop-blur-xl min-[1100px]:px-7">
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="Unnity Media home"
            className="wind-item flex shrink-0 items-baseline gap-1.5 text-[#0f032b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8f74b3]"
          >
            <span className="text-[26px] font-semibold tracking-[-1.5px]">
              unnity<span className="text-[#89749f]">.</span>
            </span>
            <span className="text-[10px] font-medium tracking-[.12em]">
              MEDIA
            </span>
          </Link>
          <button
            ref={menuButton}
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation"
            onClick={() => {
              const next = !mobileOpen;
              setMobileOpen(next);
              setWorkOpen(false);
              menuIsOpen.current = next;
            }}
            className="grid size-10 place-items-center rounded-md border border-[#0f032b]/10 text-[#0f032b] min-[1100px]:hidden"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={mobileOpen ? "M5 5L15 15M15 5L5 15" : "M3 6H17M3 13H17"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <nav
            id="primary-navigation"
            aria-label="Main navigation"
            className={`${mobileOpen ? "block" : "hidden"} absolute inset-x-0 top-[calc(100%+10px)] max-h-[calc(100svh-120px)] overflow-y-auto rounded-xl border border-[#0f032b]/10 bg-[#faf8fd]/95 p-3 shadow-[0_12px_32px_rgba(15,3,43,0.06)] backdrop-blur-xl min-[1100px]:static min-[1100px]:block min-[1100px]:overflow-visible min-[1100px]:border-0 min-[1100px]:bg-transparent min-[1100px]:p-0 min-[1100px]:shadow-none min-[1100px]:backdrop-blur-none`}
          >
            <ul className="flex flex-col gap-1 min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:gap-2">
              {navigation.map((item) => (
                <li key={item.label} className="relative">
                  {item.children ? (
                    <>
                      <button
                        ref={workButton}
                        type="button"
                        aria-expanded={workOpen}
                        aria-controls="work-navigation"
                        onClick={() => {
                          const next = !workOpen;
                          setWorkOpen(next);
                          menuIsOpen.current = mobileOpen || next;
                        }}
                        className={`${linkClass} flex w-full items-center justify-between gap-2 ${pathname.startsWith("/work/") ? "text-[#0f032b]" : "text-[#62586f]"}`}
                      >
                        {item.label}
                        <svg
                          className={`transition-transform duration-200 ${workOpen ? "rotate-180" : ""}`}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="m3 4.5 3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {workOpen && (
                        <ul
                          id="work-navigation"
                          className="wind-dropdown mt-1 rounded-lg border border-[#0f032b]/[0.07] bg-[#fdfcfe] p-2 min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[calc(100%+12px)] min-[1100px]:w-[262px] min-[1100px]:shadow-[0_12px_32px_rgba(15,3,43,0.07)]"
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={closeMenus}
                                aria-current={
                                  pathname === child.href ? "page" : undefined
                                }
                                className="group block rounded-md px-3 py-3 transition-colors hover:bg-[#0f032b]/5 focus-visible:outline-2 focus-visible:outline-[#8f74b3]"
                              >
                                <span className="flex items-center justify-between text-[13px] font-medium text-[#0f032b]">
                                  {child.label}
                                  <span
                                    aria-hidden="true"
                                    className="text-[#91849f]"
                                  >
                                    ↗
                                  </span>
                                </span>
                                <span className="mt-1 block text-[11px] leading-relaxed text-[#80758c]">
                                  {child.description}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenus}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`${linkClass} ${pathname === item.href ? "text-[#0f032b]" : "text-[#62586f]"}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="mt-2 border-t border-[#0f032b]/10 pt-3 min-[1100px]:ml-4 min-[1100px]:mt-0 min-[1100px]:border-0 min-[1100px]:pt-0">
                <Link
                  href="/contact"
                  onClick={closeMenus}
                  aria-current={pathname === "/contact" ? "page" : undefined}
                  className="wind-item flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#2a1650] px-5 py-2.5 text-[12px] font-medium text-white transition-colors duration-200 hover:bg-[#0f032b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8f74b3]"
                >
                  Contact us <ArrowUpRight size={16} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
