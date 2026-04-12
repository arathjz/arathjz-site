import { useState, useEffect, useCallback } from "react";
import { Link } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "~/components/ScrollReveal";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "About — Arath Jimenez" },
  {
    name: "description",
    content: "Software engineer. Engineering Manager. Fintech. Coffee.",
  },
  { property: "og:title", content: "About — Arath Jimenez" },
  {
    property: "og:description",
    content: "Software engineer. Engineering Manager. Fintech. Coffee.",
  },
  { property: "og:image", content: "https://arathjz.com/og-image.png" },
];

const recommendations = [
  {
    text: "Arath is one of the most talented software developers I have worked with in my career. He helped me scale client projects on Diey.io. Work with him means professionalism, responsibility, and productivity.",
    author: "Oliver Cambrano",
    role: "Sr. Product Experience Designer",
  },
  {
    text: "I had the pleasure to work with Arath for a few months. Despite he was new to the project he was able to grow and step into the front line very quickly. He is an awesome communicator! I wouldn't hesitate to work with him again.",
    author: "Alessandro Mitelli",
    role: "Software Engineer at Monte Carlo",
  },
  {
    text: "He has an incredible mind that can build amazing software — not only code, he knows how to build something that people want to use and enjoy. If you are a recruiter or CEO and have doubts about working with Arath, the answer is YES.",
    author: "Francisco Valdovines",
    role: "QA & Operations Lead",
  },
  {
    text: "Arath is a purposeful person, who is always looking to improve his knowledge and skills. He is good at communicating his doubts, ideas and proposals.",
    author: "Araceli Heredia",
    role: "Product Designer",
  },
];

const experience = [
  {
    company: "Keep",
    period: "2023–present",
    roles: [
      {
        title: "Engineering Manager",
        period: "Nov 2024–present",
        current: true,
        description:
          "Leading the Capital team. Built an in-house funding ledger and own the loan management system — ensuring accuracy while maintaining a culture of continuous shipping.",
      },
      {
        title: "Senior Software Engineer",
        period: "Oct 2023–Nov 2024",
        current: false,
        description:
          "Drove architecture improvements across multiple teams, introduced RFCs and planning processes, and designed UI guidelines and design tokens later adopted as company-wide standards.",
      },
    ],
  },
  {
    company: "Neurelo",
    period: "2023",
    roles: [
      {
        title: "Founding Software Engineer",
        period: "Jan 2023–Oct 2023",
        current: false,
        description:
          "API platform for databases. Created the design system foundations, introduced tiering service, environment observability, and dynamic API docs.",
      },
    ],
  },
  {
    company: "ShipHero",
    period: "2021–2023",
    roles: [
      {
        title: "Senior Frontend Engineer",
        period: "Jul 2021–Jan 2023",
        current: false,
        description:
          "Logistics web application. Migrated ~70% of the codebase from JavaScript to TypeScript and led the new UI library architecture.",
      },
    ],
  },
  {
    company: "Codelitt",
    period: "2020–2021",
    roles: [
      {
        title: "Software Engineer",
        period: "Jul 2020–Jul 2021",
        current: false,
        description:
          "Full-stack applications in real estate. Championed web accessibility practices and led the frontend team for a client project.",
      },
    ],
  },
  {
    company: "Debt Collective",
    period: "2020–2021",
    roles: [
      {
        title: "Frontend Engineer",
        period: "Jun 2020–May 2021",
        current: false,
        description:
          "Built tools to dispute debt in the US. Co-created a donation widget that increased the organization's revenue by 20%.",
      },
    ],
  },
  {
    company: "100 Ladrillos",
    period: "2019–2020",
    roles: [
      {
        title: "Software Engineer",
        period: "Jul 2019–Jul 2020",
        current: false,
        description:
          "Real estate marketplace. Designed the session management API, built the property marketplace, and introduced frontend testing practices.",
      },
    ],
  },
  {
    company: "Blockdemy",
    period: "2018–2019",
    roles: [
      {
        title: "Full Stack Developer",
        period: "Nov 2018–Jul 2019",
        current: false,
        description:
          "Second engineer on the team. Built applications for tracking students' progress across learning programs.",
      },
    ],
  },
];

function useCarousel(length: number, intervalMs = 5000) {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % length),
    [length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + length) % length),
    [length]
  );
  const goTo = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [next, intervalMs]);

  return { index, next, prev, goTo };
}

export default function About() {
  const carousel = useCarousel(recommendations.length);

  return (
    <div className="page-container pt-28 pb-16 min-h-screen">
      <p className="t-prompt mb-6">
        $ cat ~/about.md
      </p>

      {/* Intro */}
      <div className="max-w-2xl mb-20">
        <h1 className="t-headline text-accent mb-6">About me</h1>
        <div className="space-y-5">
          <p className="t-body">
            I&apos;ve been building software since 2018 — starting as the second
            engineer at a small startup in Guadalajara, Mexico, and growing
            through roles across fintech, real estate, logistics, and
            developer tools. I currently work in fintech and hold a
            bachelor&apos;s in Finance and Banking, which gives me a unique
            perspective when building financial products.
          </p>
          <p className="t-body">
            These days I split my time between engineering leadership,
            hands-on work, and AI consulting. I enjoy mentoring engineers,
            building reliable systems, and occasionally nerding out about
            coffee brewing.
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <ScrollReveal className="mb-20">
        <p className="font-mono text-sm text-ink-faint mb-8 uppercase tracking-widest">
          What people say
        </p>
        <div className="max-w-2xl">
          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={carousel.index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-l-2 border-accent pl-6"
              >
                <p className="font-serif text-lg text-ink-soft leading-relaxed italic mb-4">
                  &ldquo;{recommendations[carousel.index].text}&rdquo;
                </p>
                <footer>
                  <span className="font-mono text-sm text-accent">
                    {recommendations[carousel.index].author}
                  </span>
                  <span className="font-mono text-xs text-ink-faint ml-2">
                    — {recommendations[carousel.index].role}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={carousel.prev}
              aria-label="Previous recommendation"
              className="font-mono text-sm text-ink-faint hover:text-ink transition-colors"
            >
              &larr;
            </button>
            <div className="flex gap-2">
              {recommendations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => carousel.goTo(i)}
                  aria-label={`Go to recommendation ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === carousel.index
                      ? "bg-accent"
                      : "bg-line-dim hover:bg-line-hover"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={carousel.next}
              aria-label="Next recommendation"
              className="font-mono text-sm text-ink-faint hover:text-ink transition-colors"
            >
              &rarr;
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Experience */}
      <ScrollReveal>
        <p className="font-mono text-sm text-ink-faint mb-8 uppercase tracking-widest">
          Experience
        </p>
        <div className="space-y-10 max-w-2xl">
          {experience.map((company, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center pt-2">
                  <motion.div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      company.roles[0].current ? "bg-accent" : "bg-line-dim"
                    }`}
                    initial={company.roles[0].current ? { scale: 1 } : undefined}
                    animate={
                      company.roles[0].current
                        ? { scale: [1, 1.4, 1] }
                        : undefined
                    }
                    transition={
                      company.roles[0].current
                        ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        : undefined
                    }
                  />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-line-dim mt-2" />
                  )}
                </div>
                <div className="pb-2 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                    <span className="font-mono text-base text-ink">
                      {company.company}
                    </span>
                    <span className="font-mono text-xs text-ink-faint ml-auto">
                      {company.period}
                    </span>
                  </div>
                  <div className="space-y-6">
                    {company.roles.map((role, j) => (
                      <div key={j}>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                          <span className="font-serif text-ink-soft">
                            {role.title}
                          </span>
                          <span className="font-mono text-xs text-ink-faint">
                            {role.period}
                          </span>
                        </div>
                        <p className="font-serif text-sm text-ink-dim leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal className="mt-16">
        <Link
          to="/"
          className="t-nav text-ink-faint hover:text-accent transition-colors"
        >
          &larr; back home
        </Link>
      </ScrollReveal>
    </div>
  );
}
