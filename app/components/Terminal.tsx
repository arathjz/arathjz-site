import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";

const ORIGINAL_NAME = "Arath Jimenez";
const MAX_INPUT_LENGTH = 20;

const PAGES: Record<string, string> = {
  about: "/about",
  blog: "/blog",
  home: "/",
  "~": "/",
};

const FILES = ["about.md", "blog/", "contact.txt", ".secret"];

const NEOFETCH = [
  "       ___       arath@web",
  "      /   \\      ----------",
  "     | a.  |     OS: arathjz.com",
  "      \\___/      Role: Engineering Manager",
  "     /     \\     Stack: React, TypeScript, Remix",
  "    / coffee \\   Shell: zsh + vim motions",
  "   /___________\\  Uptime: since 2018",
  "                  Coffee: ☕☕☕☕☕",
].join("\n");

interface Line {
  type: "input" | "output";
  text: string;
}

interface TerminalProps {
  nameRef: React.RefObject<HTMLSpanElement | null>;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function Terminal({
  nameRef,
  active,
  onActivate,
  onDeactivate,
}: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const addOutput = useCallback((text: string) => {
    setLines((prev) => [...prev, { type: "output", text }]);
  }, []);

  const clearInput = useCallback(() => {
    if (nameRef.current) {
      nameRef.current.textContent = "\u200B";
      nameRef.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(nameRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [nameRef]);

  const exitTerminal = useCallback(() => {
    setLines([]);
    if (nameRef.current) {
      nameRef.current.textContent = ORIGINAL_NAME;
    }
    onDeactivate();
  }, [nameRef, onDeactivate]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      const [command, ...args] = trimmed.split(/\s+/);

      setLines((prev) => [...prev, { type: "input", text: trimmed }]);

      switch (command.toLowerCase()) {
        case "help":
          if (args[0] === "cd") {
            addOutput(
              [
                "usage: cd <page>",
                "",
                "available pages:",
                "  about   — about me",
                "  blog    — blog posts",
                "  home    — back to start",
              ].join("\n")
            );
          } else if (args[0] === "cat") {
            addOutput(
              [
                "usage: cat <file>",
                "",
                "available files:",
                "  contact.txt   — get in touch",
                "  about.md      — short bio",
                "  .secret       — ???",
              ].join("\n")
            );
          } else {
            addOutput(
              [
                "help · pwd · ls · cd <page>",
                "cat <file> · whoami · neofetch",
                "coffee · exit · clear",
                "",
                "try: help cat",
              ].join("\n")
            );
          }
          break;

        case "pwd":
          addOutput("/home/arath/website");
          break;

        case "ls":
          if (args[0] === "-la" || args[0] === "-a") {
            addOutput([".  ..  ", ...FILES].join("  "));
          } else {
            addOutput(FILES.filter((f) => !f.startsWith(".")).join("  "));
          }
          break;

        case "cd": {
          const target = args[0];
          if (!target || target === "~" || target === "/") {
            exitTerminal();
            navigate("/");
            return;
          } else if (PAGES[target.replace(/\/$/, "")]) {
            exitTerminal();
            navigate(PAGES[target.replace(/\/$/, "")]);
            return;
          } else {
            addOutput(`cd: no such directory: ${target}`);
          }
          break;
        }

        case "cat":
          if (args[0] === "contact.txt") {
            addOutput("me@arathjz.com");
          } else if (args[0] === "about.md") {
            addOutput(
              "Software engineer who believes great\nsoftware starts with understanding the problem."
            );
          } else if (args[0] === ".secret") {
            addOutput("you found it. hi there :)");
          } else if (args[0]) {
            addOutput(`cat: ${args[0]}: No such file or directory`);
          } else {
            addOutput("cat: missing operand");
          }
          break;

        case "whoami":
          addOutput("guest");
          break;

        case "neofetch":
        case "fastfetch":
          addOutput(NEOFETCH);
          break;

        case "coffee":
        case "brew":
          addOutput("brewing... ☕\n\nhere you go. it's on the house.");
          break;

        case "sudo":
          addOutput("nice try.");
          break;

        case "rm":
          if (args.join(" ").includes("-rf")) {
            addOutput("█▓▒░ CRITICAL ERROR ░▒▓█");
            setTimeout(() => {
              addOutput("just kidding. this is a static site.");
            }, 1500);
          } else {
            addOutput("rm: missing operand");
          }
          break;

        case "exit":
        case "q":
        case "quit":
          exitTerminal();
          return;

        case "clear":
          setLines([]);
          break;

        case "":
          break;

        default:
          addOutput(`command not found: ${command}`);
          break;
      }

      clearInput();
    },
    [addOutput, clearInput, exitTerminal, navigate]
  );

  // Global keydown listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isEditable = (e.target as HTMLElement).isContentEditable;

      if (active) {
        // Ctrl+L to clear
        if (e.ctrlKey && e.key === "l") {
          e.preventDefault();
          setLines([]);
          clearInput();
          return;
        }

        // Keep the span alive when empty
        if (nameRef.current && !nameRef.current.textContent) {
          nameRef.current.textContent = "\u200B";
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(nameRef.current);
          range.collapse(false);
          sel?.removeAllRanges();
          sel?.addRange(range);
        }

        // Block typing beyond max length
        const currentText = (nameRef.current?.textContent || "").replace(/\u200B/g, "");
        if (e.key.length === 1 && currentText.length >= MAX_INPUT_LENGTH && !e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          return;
        }

        if (e.key === "Enter") {
          e.preventDefault();
          processCommand(currentText);
        } else if (e.key === "Escape") {
          e.preventDefault();
          exitTerminal();
        } else if (document.activeElement !== nameRef.current) {
          // Re-focus the name if user clicked away
          if (e.metaKey || e.ctrlKey || e.altKey) return;
          if (tag === "INPUT" || tag === "TEXTAREA") return;
          e.preventDefault();
          nameRef.current?.focus();

          // Insert the character manually since we prevented default
          if (e.key.length === 1) {
            const sel = window.getSelection();
            if (sel && nameRef.current) {
              const range = document.createRange();
              range.selectNodeContents(nameRef.current);
              range.collapse(false);
              sel.removeAllRanges();
              sel.addRange(range);
              document.execCommand("insertText", false, e.key);
            }
          }
        }
        return;
      }

      // Don't activate if typing in another input
      if (tag === "INPUT" || tag === "TEXTAREA" || (isEditable && e.target !== nameRef.current)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length > 1) return;

      // Activate: clear the name and start typing
      e.preventDefault();
      onActivate();
      if (nameRef.current) {
        nameRef.current.textContent = e.key;

        // Place cursor at end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(nameRef.current);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, nameRef, onActivate, processCommand, exitTerminal]);

  // Scroll to bottom within the container only
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  if (lines.length === 0) return null;

  return (
    <div ref={containerRef} className="mb-4 font-mono text-sm text-ink-soft max-h-[40vh] overflow-y-auto scrollbar-hide">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mb-1"
        >
          {line.type === "input" ? (
            <span>
              <span className="text-terminal">$ </span>
              <span className="text-ink">{line.text}</span>
            </span>
          ) : (
            <pre className="whitespace-pre-wrap leading-relaxed">{line.text}</pre>
          )}
        </motion.div>
      ))}
    </div>
  );
}
