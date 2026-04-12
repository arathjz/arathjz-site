import { useState, useEffect, useCallback, useRef } from "react";
import { useLoaderData, Link } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { getRecentPosts } from "~/lib/posts.server";
import RecentPosts from "~/components/RecentPosts";
import Typewriter from "~/components/Typewriter";
import Terminal from "~/components/Terminal";

const EMAIL = "me@arathjz.com";

export async function loader() {
  const posts = await getRecentPosts(3);
  return { posts };
}

const INTRO_KEY = "intro-played";

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();
  const [ready, setReady] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);
  const [mobileHint, setMobileHint] = useState(false);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem(INTRO_KEY)) {
      setFirstVisit(true);
      sessionStorage.setItem(INTRO_KEY, "1");
    } else {
      setNameDone(true);
    }
    setReady(true);
  }, []);

  const onNameComplete = useCallback(() => setNameDone(true), []);

  const activateTerminal = useCallback(() => {
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isMobile) return;
    setTerminalActive(true);
    setTimeout(() => nameRef.current?.focus(), 0);
  }, []);

  const deactivateTerminal = useCallback(() => {
    setTerminalActive(false);
    nameRef.current?.blur();
  }, []);

  return (
    <div className={`flex-1 flex flex-col justify-center page-container pt-20 pb-8 transition-opacity duration-100 ${ready ? "opacity-100" : "opacity-0"}`}>
      <p className="t-prompt mb-7">
        {firstVisit ? <Typewriter text="$ whoami" speed={80} /> : "$ whoami"}
      </p>

      <div className="mb-4">
        <Terminal
          nameRef={nameRef}
          active={terminalActive}
          onActivate={activateTerminal}
          onDeactivate={deactivateTerminal}
        />
        <h1 className="t-display">
          {firstVisit && !nameDone ? (
            <Typewriter
              text="Arath Jimenez."
              speed={45}
              startDelay={800}
              showCursorAfter
              onComplete={onNameComplete}
            />
          ) : (
            <>
              <span
                ref={nameRef}
                contentEditable={terminalActive}
                suppressContentEditableWarning
                onClick={() => {
                  if (!terminalActive) {
                    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
                    if (isMobile) {
                      setMobileHint(true);
                      setTimeout(() => setMobileHint(false), 3000);
                      return;
                    }
                    activateTerminal();
                    setTimeout(() => {
                      if (nameRef.current) {
                        nameRef.current.textContent = "";
                        nameRef.current.focus();
                      }
                    }, 0);
                  }
                }}
                className={`outline-none transition-all duration-300 ${
                  terminalActive
                    ? "caret-transparent border-b border-dashed border-accent/30 text-xl md:text-2xl"
                    : "cursor-text border-b border-dashed border-transparent hover:border-accent/30"
                }`}
              >
                Arath Jimenez
              </span>
              <AnimatePresence mode="wait">
                {terminalActive ? (
                  <motion.span
                    key="terminal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block bg-accent animate-blink text-xl md:text-2xl"
                      style={{ width: "1.5px", height: "1.2em", verticalAlign: "-0.15em" }}
                    />
                    <span className="block font-mono text-xs text-ink-faint mt-2 font-normal">
                      type help + enter for commands · esc to exit
                    </span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-accent">.</span>
                    <span
                      aria-hidden="true"
                      className="inline-block bg-accent ml-2 animate-blink"
                      style={{ width: "0.08em", height: "0.85em", verticalAlign: "-0.08em" }}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {mobileHint && (
                  <motion.span
                    key="mobile-hint"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="block font-mono text-xs text-ink-faint mt-2 font-normal"
                  >
                    this easter egg is desktop-only — feel free to explore the rest of the site!
                  </motion.span>
                )}
              </AnimatePresence>
            </>
          )}
        </h1>
      </div>

      <p className="t-lead max-w-md mb-10">
        <span className="text-accent">Software engineer</span>. Finance
        enthusiast.
        <br />
        Powered by coffee <span className="text-accent">☕</span>
      </p>

      <div className="max-w-xl space-y-5 mb-10">
        <p className="t-body">
          Hi! I&apos;m Arath, a software engineer who believes great
          software starts with{" "}
          <span className="text-accent">understanding the problem</span> —
          not the code. I love digging into the business side, listening to
          users, and turning that into technology that actually makes their
          lives easier.
        </p>
        <p className="t-body">
          Currently an Engineering Manager at{" "}
          <a
            href="https://trykeep.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Keep
          </a>
          , leading the Capital team.
        </p>
        <p className="t-body">
          <Link
            to="/about"
            className="text-ink-faint hover:text-accent transition-colors text-sm font-mono"
          >
            more about me &rarr;
          </Link>
        </p>
      </div>

      <div>
        <p className="font-mono text-sm text-ink-faint mb-4">get in touch</p>
        <a
          href={`mailto:${EMAIL}`}
          className="font-mono text-lg md:text-xl text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-2 group"
        >
          <span className="text-terminal opacity-80">$</span>
          <span className="border-b border-accent/30 group-hover:border-accent transition-colors pb-0.5">
            <Typewriter text={EMAIL} speed={90} />
          </span>
        </a>
      </div>

      <div className="mt-12">
        <RecentPosts posts={posts} />
      </div>
    </div>
  );
}
