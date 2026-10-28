import { useEffect, useRef } from "react";
import gsap from "gsap";
import { STORYBOARD } from "../../constants/content.js";
import useReducedMotion from "../../hooks/useReducedMotion.js";

/** Scene cuts can be configured in STORYBOARD.frames[].startSeconds. */
export default function StoryboardStrip() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const selectRef = useRef(() => {});
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const panels = [...root.querySelectorAll("[data-stage-panel]")];
    const buttons = [...root.querySelectorAll("[data-stage-button]")];
    const progress = root.querySelector("[data-progress]");
    const connection = navigator.connection;
    gsap.set(panels, { opacity: 0, y: 0 });
    gsap.set(panels[0], { opacity: 1 });
    panels.forEach((panel, i) => panel.setAttribute("aria-hidden", String(i !== 0)));
    buttons.forEach((button, i) => i === 0 ? button.setAttribute("aria-current", "step") : button.removeAttribute("aria-current"));
    let active = 0;
    let loaded = false;
    let visible = false;
    let failed = false;
    let usingMobile = window.matchMedia("(max-width: 767px)").matches;
    let animation;
    const cuts = () => STORYBOARD.frames.map((frame, i) => frame.startSeconds ?? (Number.isFinite(video.duration) ? video.duration * i / 3 : 0));
    const activate = (index) => {
      if (index === active) return;
      animation?.kill();
      const outgoing = panels[active];
      const incoming = panels[index];
      buttons[active].removeAttribute("aria-current");
      buttons[index].setAttribute("aria-current", "step");
      outgoing.setAttribute("aria-hidden", "true");
      incoming.removeAttribute("aria-hidden");
      if (reducedMotion) {
        gsap.set(outgoing, { opacity: 0, y: 0 });
        gsap.set(incoming, { opacity: 1, y: 0 });
      } else {
        gsap.set(panels.filter(p => p !== outgoing && p !== incoming), { opacity: 0 });
        animation = gsap.timeline().to(outgoing, { opacity: 0, duration: 0.15 })
          .fromTo(incoming, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
      }
      active = index;
    };
    const sync = () => {
      if (!Number.isFinite(video.duration) || !video.duration) return;
      const index = cuts().reduce((result, start, i) => video.currentTime >= start ? i : result, 0);
      activate(index);
      progress.style.transform = `scaleX(${Math.min(1, video.currentTime / video.duration)})`;
    };
    selectRef.current = index => {
      if (loaded && !failed && Number.isFinite(video.duration)) video.currentTime = cuts()[index];
      activate(index);
    };
    const play = () => {
      if (visible && !document.hidden && !failed && !reducedMotion && !connection?.saveData) video.play().catch(() => {});
      else video.pause();
    };
    const onError = () => {
      if (usingMobile) {
        usingMobile = false;
        video.src = STORYBOARD.video;
        video.load();
        return;
      }
      failed = true;
      video.style.opacity = "0";
      root.querySelector("[data-video-status]").hidden = false;
    };
    const onReady = () => { video.style.opacity = "1"; play(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !loaded && !reducedMotion && !connection?.saveData) {
        loaded = true;
        video.src = usingMobile ? STORYBOARD.mobileVideo : STORYBOARD.video;
        video.load();
      }
      play();
    }, { threshold: 0.05 });
    observer.observe(root);
    video.addEventListener("timeupdate", sync);
    video.addEventListener("loadedmetadata", sync);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", play);
    connection?.addEventListener("change", play);
    return () => {
      observer.disconnect();
      animation?.kill();
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.removeEventListener("timeupdate", sync);
      video.removeEventListener("loadedmetadata", sync);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", play);
      connection?.removeEventListener("change", play);
      gsap.set(panels, { clearProps: "all" });
      selectRef.current = () => {};
    };
  }, [reducedMotion]);

  return (
    <section id="storyboard" ref={rootRef} aria-labelledby="process-heading" className="cinematic-process">
      <div className="process-intro">
        <p className="text-label text-brand-primary-light">{STORYBOARD.sectionLabel}</p>
        <h2 id="process-heading" className="text-display-lg mt-5 text-white">{STORYBOARD.headline}</h2>
        <p className="mt-6 text-body text-white/65">{STORYBOARD.description}</p>
      </div>
      <div className="process-film">
        <img src={STORYBOARD.poster} alt="Enerji projesinin saha ve mühendislik süreci" loading="lazy" width="1280" height="720" />
        <video ref={videoRef} autoPlay muted playsInline loop preload="none" poster={STORYBOARD.poster} aria-label="Saha analizi, mühendislik ve kurulum süreci" />
        <span data-video-status hidden className="sr-only">Süreç videosu yüklenemedi. Poster gösteriliyor.</span>
      </div>
      <div className="process-stages">
        <div className="flex gap-6" role="group" aria-label="Proje aşamaları">
          {STORYBOARD.frames.map((frame, i) => (
            <button type="button" key={frame.id} data-stage-button aria-current={i === 0 ? "step" : undefined} aria-label={`${frame.id} ${frame.title}`} onClick={() => selectRef.current(i)} className="process-stage-button font-display">{frame.id}</button>
          ))}
        </div>
        <div className="process-progress" aria-hidden="true"><div data-progress /></div>
        <div className="process-stage-copy">
          {STORYBOARD.frames.map((frame, i) => (
            <div key={frame.id} data-stage-panel aria-hidden={i !== 0 ? true : undefined} style={{ opacity: i === 0 ? 1 : 0 }}>
              <h3 className="text-headline-md text-white">{frame.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{frame.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
