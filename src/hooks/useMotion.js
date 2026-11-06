import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Desktop breakpoint — matches reference design threshold for tilt/magnet features. */
const BP_DESKTOP = 900;

/** Minimum scroll distance for pin features to activate — prevents pin on very short pages. */
const MIN_SCROLL_FOR_PIN = 1200;

/**
 * Orchestrates every GSAP animation on the landing page.
 * Scoped to `rootRef` so cleanup is automatic via `ctx.revert()`.
 *
 * Note: gsap.registerPlugin(ScrollTrigger) is called in App.jsx (single canonical point).
 *
 * @param {React.RefObject<HTMLElement>} rootRef  — root wrapper element
 * @param {boolean} prefersReducedMotion
 * @param {React.RefObject<import('lenis').default|null>} lenisRef
 * @param {{ onStagePhase?: (index: number) => void, onStagePinToggle?: (active: boolean) => void }} [options]
 */
export default function useMotion(rootRef, prefersReducedMotion, lenisRef, options = {}) {
  // Store options in a ref so GSAP callbacks always read the latest without re-creating the context
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  // rootRef and lenisRef are stable refs — only prefersReducedMotion triggers re-run
  useEffect(() => {
    if (prefersReducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    // Computed once per effect — intentional: reference design evaluates at page load.
    // Resize from narrow→wide doesn't activate tilt/magnet (acceptable trade-off).
    const wide = window.innerWidth > BP_DESKTOP;
    const scrolls = document.documentElement.scrollHeight - window.innerHeight > MIN_SCROLL_FOR_PIN;
    const cleanups = [];
    let cancelled = false;

    const ctx = gsap.context(() => {
      /* ──────────────────────────────────────────────
         A. Lenis Anchor Scroll
         ────────────────────────────────────────────── */
      root.querySelectorAll('a[href^="#"]').forEach((a) => {
        const handler = (e) => {
          const raw = a.getAttribute("href");
          // Validate fragment: must be # followed by valid CSS id characters
          const id = raw?.match(/^#([\w-]+)$/)?.[1];
          if (!id) return;
          // regex already validates [\w-] so direct interpolation is safe
          const target = root.querySelector(`#${id}`);
          if (target && lenisRef.current) {
            e.preventDefault();
            lenisRef.current.scrollTo(target, { offset: -20, duration: 1.6 });
          }
        };
        a.addEventListener("click", handler);
        cleanups.push(() => a.removeEventListener("click", handler));
      });

      /* ──────────────────────────────────────────────
         B. Intro Timeline (page load)
         ────────────────────────────────────────────── */
      // Set perspective once so it stays constant — no animate from/to conflicts
      gsap.set(".hero-static", { transformPerspective: 1400 });

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(".navbar", { y: -30, opacity: 0, duration: 1.1 })
        .from("#top h1 .ln > span", { yPercent: 115, rotate: 2, duration: 1.4, stagger: 0.09 }, 0.1)
        .from(".hero-prod", { x: 160, opacity: 0, duration: 2 }, 0.15)
        .from(".hero-static", { rotationY: -18, duration: 2.2 }, 0.15)
        .from(".prod-shadow", { scaleX: 0.3, opacity: 0, duration: 2 }, 0.5)
        .from(".backword", { yPercent: 40, opacity: 0, duration: 2.2 }, 0.2)
        .from(".hero-fade", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.6)
        .from(".stg", { x: 30, opacity: 0, duration: 0.9, stagger: 0.07 }, 1.0);

      /* ──────────────────────────────────────────────
         C. Hero Scroll Parallax
         ────────────────────────────────────────────── */
      const hs = {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      };

      gsap.to("#top h1 .ln:nth-child(1)", {
        yPercent: -60,
        ease: "none",
        scrollTrigger: hs,
      });
      gsap.to("#top h1 > span:last-child", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: hs,
      });
      gsap.to(".hero-prod", {
        yPercent: -22,
        scale: 0.94,
        ease: "none",
        scrollTrigger: hs,
      });
      gsap.to(".prod-shadow", {
        opacity: 0.2,
        scaleX: 0.8,
        ease: "none",
        scrollTrigger: hs,
      });
      gsap.to(".backword", {
        xPercent: -14,
        ease: "none",
        scrollTrigger: hs,
      });
      gsap.to("#top .lead, #top .btn, #top .ulink", {
        yPercent: -30,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "20% top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      /* ──────────────────────────────────────────────
         D. Product Breathing + Cursor Tilt
         ────────────────────────────────────────────── */
      const prodImg = root.querySelector(".hero-static");

      // Breathing pauses when hero is off-screen to save GPU
      gsap.to(".hero-static", {
        y: -12,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.2,
        scrollTrigger: {
          trigger: "#top",
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      });

      if (wide && prodImg) {
        const rx = gsap.quickTo(prodImg, "rotationX", {
          duration: 1,
          ease: "power3",
        });
        const ry = gsap.quickTo(prodImg, "rotationY", {
          duration: 1,
          ease: "power3",
        });
        const bw = gsap.quickTo(".backword", "x", {
          duration: 1.4,
          ease: "power3",
        });
        const sx = gsap.quickTo(".prod-shadow", "x", {
          duration: 1,
          ease: "power3",
        });
        const heroEl = root.querySelector("#top");
        const onPointerMove = (e) => {
          if (!heroEl) return;
          const rect = heroEl.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          ry(nx * 14);
          rx(-ny * 8);
          bw(-nx * 60);
          sx(nx * 30);
        };
        const onPointerLeave = () => {
          ry(0);
          rx(0);
          bw(0);
          sx(0);
        };

        if (heroEl) {
          heroEl.addEventListener("pointermove", onPointerMove);
          heroEl.addEventListener("pointerleave", onPointerLeave);
          cleanups.push(() => {
            heroEl.removeEventListener("pointermove", onPointerMove);
            heroEl.removeEventListener("pointerleave", onPointerLeave);
          });
        }
      }

      /* ──────────────────────────────────────────────
         E. Nav Hide/Show
         ────────────────────────────────────────────── */
      const navHide = gsap.quickTo(".navbar", "yPercent", {
        duration: 0.5,
        ease: "power3",
      });

      ScrollTrigger.create({
        start: "top -160",
        end: "max",
        onUpdate: (st) => navHide(st.direction === 1 ? -110 : 0),
        onLeaveBack: () => navHide(0),
      });

      /* ──────────────────────────────────────────────
         F. Stat Strip Animation
         ────────────────────────────────────────────── */
      const firstStat = root.querySelector(".stat");
      if (firstStat) {
        gsap.from(".stat", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: firstStat,
            start: "top 92%",
            once: true,
          },
        });
      }

      /* ──────────────────────────────────────────────
         G. Counter Animation
         ────────────────────────────────────────────── */
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = parseFloat(el.getAttribute("data-count"));
        if (Number.isNaN(end)) return;
        const from = parseFloat(el.getAttribute("data-from")) || 0;
        const isYear = el.hasAttribute("data-year");
        const o = { v: from };
        gsap.to(o, {
          v: end,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          // TODO(debt): textContent mutation bypasses React reconciliation.
          // Safe while ancestor components are stateless; refactor to ref-based
          // approach if any ancestor gains state that triggers re-render.
          onUpdate: () => {
            el.textContent =
              end >= 1000 && !isYear
                ? Math.round(o.v).toLocaleString("tr-TR")
                : String(Math.round(o.v));
          },
        });
      });

      /* ──────────────────────────────────────────────
         H. Section Reveals
         ────────────────────────────────────────────── */
      // .reveal (headings): ln > span slide up
      gsap.utils.toArray(".reveal").forEach((el) => {
        const spans = el.querySelectorAll(".ln > span");
        if (!spans.length) return;
        gsap.from(spans, {
          yPercent: 115,
          rotate: 1.5,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // .up (blocks): fade up
      gsap.utils.toArray(".up").forEach((el) => {
        if (el.classList.contains("stat")) return;
        gsap.from(el, {
          y: 70,
          opacity: 0,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      /* ──────────────────────────────────────────────
         I. Image Parallax
         ────────────────────────────────────────────── */
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.getAttribute("data-parallax")) || 8;
        const trigger = el.parentElement ?? el;
        gsap.fromTo(
          el,
          { yPercent: -amt, scale: 1.12 },
          {
            yPercent: amt,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      /* ──────────────────────────────────────────────
         J. Accordion Entrance
         ────────────────────────────────────────────── */
      const firstQ = root.querySelector("#cozum .q");
      if (firstQ) {
        gsap.from("#cozum .q", {
          x: 60,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: firstQ,
            start: "top 85%",
            once: true,
          },
        });
      }

      /* ──────────────────────────────────────────────
         K. Stage Step Entrance
         ────────────────────────────────────────────── */
      const stageOl = root.querySelector("#gun ol");
      if (stageOl) {
        gsap.from("#gun .step", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: stageOl,
            start: "top 92%",
            once: true,
          },
        });
      }

      /* ──────────────────────────────────────────────
         L. Financial fin-line
         ────────────────────────────────────────────── */
      const finEl = root.querySelector(".fin");
      if (finEl) {
        gsap.from(".fin-line", {
          scaleX: 0,
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: finEl, start: "top 85%", once: true },
        });
      }

      /* ──────────────────────────────────────────────
         M. Process Timeline
         ────────────────────────────────────────────── */
      const procEl = root.querySelector(".proc");
      if (procEl) {
        gsap.from(".proc-line", {
          scaleX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: procEl,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        });
        gsap.from(".proc li", {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: procEl,
            start: "top 82%",
            once: true,
          },
        });
        gsap.from(".proc li > span:first-child", {
          scale: 0,
          duration: 0.8,
          ease: "back.out(2.4)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: procEl,
            start: "top 80%",
            once: true,
          },
        });
      }

      /* ──────────────────────────────────────────────
         N. Sector Marquee
         ────────────────────────────────────────────── */
      gsap.utils.toArray(".mq").forEach((el) => {
        const dir = parseFloat(el.getAttribute("data-dir")) || -1;
        gsap.fromTo(
          el,
          { xPercent: dir < 0 ? 0 : -22 },
          {
            xPercent: dir < 0 ? -22 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      });

      const firstMq = root.querySelector(".mq");
      if (firstMq) {
        const skew = gsap.quickTo(".mq", "skewX", {
          duration: 0.6,
          ease: "power3",
        });
        ScrollTrigger.create({
          trigger: firstMq,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (st) => skew(gsap.utils.clamp(-10, 10, st.getVelocity() / -250)),
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });
      }

      /* ──────────────────────────────────────────────
         O. Form Card Parallax
         ────────────────────────────────────────────── */
      const formCard = root.querySelector(".form-card");
      if (formCard) {
        gsap.fromTo(
          ".form-card",
          { yPercent: 10 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: "#iletisim",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      /* ──────────────────────────────────────────────
         P. Magnet Buttons
         ────────────────────────────────────────────── */
      if (wide) {
        root.querySelectorAll(".magnet").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", {
            duration: 0.6,
            ease: "power3",
          });
          const yTo = gsap.quickTo(el, "y", {
            duration: 0.6,
            ease: "power3",
          });

          const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            xTo((e.clientX - cx) * 0.2);
            yTo((e.clientY - cy) * 0.3);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      /* ──────────────────────────────────────────────
         Q. Stage ClipPath Intro (always)
         ────────────────────────────────────────────── */
      const stageEl = root.querySelector(".stage");
      if (stageEl) {
        gsap.from(".stage", {
          clipPath: "inset(14% 10% 14% 10% round 6px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".stage",
            start: "top 95%",
            end: "top 35%",
            scrub: true,
          },
        });
      }

      /* ──────────────────────────────────────────────
         R. Stage Pin + Zoom (desktop only)
         ────────────────────────────────────────────── */
      if (wide && scrolls && stageEl) {
        ScrollTrigger.create({
          trigger: ".stage",
          start: "center center",
          end: "+=2400",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (st) => {
            const i = Math.min(3, Math.floor(st.progress * 4));
            optionsRef.current.onStagePhase?.(i);
          },
          onToggle: (st) => {
            optionsRef.current.onStagePinToggle?.(st.isActive);
          },
        });

        gsap.fromTo(
          ".stage-imgs",
          { scale: 1 },
          {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: ".stage",
              start: "center center",
              end: "+=2400",
              scrub: true,
            },
          },
        );
      }

      /* ──────────────────────────────────────────────
         S. Journey Pin + Timeline
         ────────────────────────────────────────────── */
      const journeyEl = root.querySelector(".journey");
      if (journeyEl && wide && scrolls) {
        const jt = gsap.timeline({
          scrollTrigger: {
            trigger: ".journey",
            start: "top top",
            end: "+=2800",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        jt.to(".j-out", { scale: 3.8, ease: "power2.in", duration: 1 }, 0)
          .to(".c1", { opacity: 0, y: -50, duration: 0.25 }, 0.05)
          .to(".j-out", { opacity: 0, duration: 0.2 }, 0.85)
          .fromTo(
            ".j-in",
            { opacity: 0, scale: 1.4 },
            { opacity: 1, scale: 1.06, duration: 0.6, ease: "power2.out" },
            0.82,
          )
          .fromTo(".c2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3 }, 1.15)
          .to(".c2", { opacity: 0, y: -50, duration: 0.25 }, 1.7)
          .to(".j-in", { scale: 1.22, xPercent: -4, ease: "none", duration: 1.2 }, 1.3)
          .fromTo(".c3", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3 }, 2.0)
          .fromTo(".j-bar", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 2.5 }, 0);
      } else if (journeyEl) {
        // Mobile fallback: simple parallax on outer image
        gsap.fromTo(
          ".j-out",
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, root);

    /* ── ScrollTrigger.refresh after images load ── */
    Promise.all(
      Array.from(root.querySelectorAll("img")).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          const done = () => {
            img.removeEventListener("load", done);
            img.removeEventListener("error", done);
            resolve();
          };
          img.addEventListener("load", done);
          img.addEventListener("error", done);
        });
      }),
    ).then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [prefersReducedMotion, rootRef, lenisRef]);
}
