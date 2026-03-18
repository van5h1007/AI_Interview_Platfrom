"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname(); 

  useEffect(() => {
    let current = 0;
    let target = 0;
    const ease = 0.05;

    const container = document.getElementById("smooth-scroll-container");
    const spacer = document.getElementById("scroll-spacer");
    if (!container || !spacer) return;

    const setSpacerHeight = () => {
      spacer.style.height = `${container.getBoundingClientRect().height}px`;
    };
    setSpacerHeight();

    const onResize = () => setSpacerHeight();

    const checkSectionAndUpdateURL = () => {
      const reviewsElement = document.getElementById("reviews");
      if (!reviewsElement) return; 

      const rect = reviewsElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isInView = rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5;

      if (isInView && !window.location.hash.includes("reviews")) {
        window.history.replaceState(null, "", `/#reviews`);
      } else if (!isInView && window.location.hash.includes("reviews")) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    const onScroll = () => {
      target = window.scrollY;
      checkSectionAndUpdateURL();
    };

    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.getAttribute("href")?.startsWith("/#")) {
        e.preventDefault();
        const hash = link.getAttribute("href")?.substring(2);
        const element = document.getElementById(hash || "");

        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop;

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });

          window.history.replaceState(null, "", `/#${hash}`);
        }
      }
    };

    const animate = () => {
      current += (target - current) * ease;
      container.style.transform = `translateY(-${current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    document.addEventListener("click", handleAnchorClick);

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", handleAnchorClick);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]); // ✅ re-run effect when route changes

  return (
    <>
      <div id="smooth-scroll-container" className="relative w-full">
        {children}
      </div>
      <div id="scroll-spacer" />
    </>
  );
}
