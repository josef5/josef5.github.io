import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import PortfolioItem from "./components/PortfolioItem";
import Tag from "./components/Tag";
import data from "./data.json";
import useLocalStorage from "./hooks/useLocalStorage";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

// TODO:
// - Constant-ify magic numbers
// - Decompose App component into smaller components
// - Add testing

function App() {
  const [itemOpen, setItemOpen] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);
  const highlightTimeout = useRef<number>(0);

  // Collect all unique tags from the data
  const skills = useMemo(
    () => Array.from(new Set(data.map((item) => item.tags).flat())),
    [],
  );

  function handleOpen(id: string) {
    setItemOpen(id);
  }

  function handleTagClick(tag: string) {
    setSelectedTag(tag);

    // Highlight items with the given tag
    setHighlights(
      data.filter((item) => item.tags.includes(tag)).map((item) => item.id),
    );

    // Clear highlights after 2 seconds
    clearTimeout(highlightTimeout.current);

    highlightTimeout.current = setTimeout(() => {
      setSelectedTag(null);
      setHighlights([]);
    }, 2000);
  }

  function handleDarkModeClick() {
    setIsDarkMode((prev) => !prev);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useGSAP(() => {
    gsap.set(".animated-hp-element", { opacity: 0 });

    gsap
      .timeline()
      .to(window, { scrollTo: 0, duration: 0.05 })
      .to(".animated-hp-element", {
        opacity: 1,
        stagger: 0.05,
        duration: 0.2,
        delay: 0.75,
      });
  });

  return (
    <div className="App flex min-h-screen flex-col">
      <header className="animated-hp-element text-lightMode-headerText dark:text-darkMode-headerText mt-12 leading-tight">
        <h1 className="font-extrabold">José Espejo</h1>
        <h2>Front End Developer</h2>
      </header>
      <main className="mb-12 flex-grow leading-tight">
        <div className="my-16">
          <h4 className="animated-hp-element text-lightMode-subheading dark:text-darkMode-subheading mb-2 text-[0.625rem]">
            Technical Skills
          </h4>
          <div className="flex w-9/12 flex-wrap gap-2">
            {skills.map((tag) => (
              <button key={tag} onClick={() => handleTagClick(tag)}>
                <Tag
                  text={tag}
                  className={`animated-hp-element ${tag === selectedTag && "!bg-lightMode-highlightColor dark:!bg-darkMode-highlightColor"}`}
                />
              </button>
            ))}
          </div>
        </div>
        <h4 className="animated-hp-element text-lightMode-subheading dark:text-darkMode-subheading mb-2 text-[0.625rem]">
          Selected Work
        </h4>
        <div className="flex flex-col gap-4">
          {data.map((item) => {
            const { id, title, subtitle, ...rest } = item;

            return (
              <PortfolioItem
                id={id}
                key={id}
                title={title}
                subtitle={subtitle}
                data={rest}
                isExternalOpen={itemOpen === id}
                isHighlighted={highlights.includes(id)}
                onOpen={handleOpen}
                className="animated-hp-element"
              />
            );
          })}
        </div>
      </main>
      <footer className="animated-hp-element text-lightMode-footerText dark:text-darkMode-footerText mb-8 text-[0.625rem] leading-tight">
        <p className="flex gap-4">
          <span>&copy; 2024 Jose Espejo</span>
          <span>m: 07977 703015</span>
          <span>e: jose@joseespejo.info</span>
          <button onClick={() => handleDarkModeClick()}>
            dark mode: {isDarkMode ? "on" : "off"}
          </button>
        </p>
      </footer>
    </div>
  );
}

export default App;
