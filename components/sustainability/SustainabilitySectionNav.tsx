"use client";

import { useEffect, useState } from "react";
import { sustainabilitySectionNav } from "@/lib/sustainability-page";

export default function SustainabilitySectionNav() {
  const [active, setActive] = useState<string>(sustainabilitySectionNav[0].href);

  useEffect(() => {
    const sectionIds = sustainabilitySectionNav.map((link) => link.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sustainability-sticky-nav" aria-label="Page sections">
      <div className="page-container flex gap-2 overflow-x-auto py-3 [-webkit-overflow-scrolling:touch]">
        {sustainabilitySectionNav.map((link) => {
          const isActive = active === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`sustainability-nav-pill shrink-0 ${isActive ? "sustainability-nav-pill-active" : ""}`}
              aria-current={isActive ? "location" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
