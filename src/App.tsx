import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PortfolioList from "./components/PortfolioList";
import TagList from "./components/TagList";
import data from "./data.json";
import useLocalStorage from "./hooks/useLocalStorage";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

// TODO:
// - Add testing

function App() {
  const [itemOpen, setItemOpen] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);
  const highlightTimeout = useRef<number>(0);
  const HIGHLIGHT_TIMEOUT_DURATION = 2000;

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
    }, HIGHLIGHT_TIMEOUT_DURATION) as unknown as number;
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
      <Header className="animated-hp-element" />
      <main className="mb-12 flex-grow leading-tight">
        <div className="my-16">
          <h4 className="animated-hp-element text-lightMode-subheading dark:text-darkMode-subheading mb-2 text-[0.625rem]">
            Technical Skills
          </h4>
          <TagList
            selectedTag={selectedTag}
            tags={skills}
            onTagClick={handleTagClick}
            className="w-9/12"
            tagClassName="animated-hp-element"
          />
        </div>
        <h4 className="animated-hp-element text-lightMode-subheading dark:text-darkMode-subheading mb-2 text-[0.625rem]">
          Selected Work
        </h4>
        <PortfolioList
          data={data}
          itemOpen={itemOpen}
          highlights={highlights}
          handleOpen={handleOpen}
        />
      </main>
      <Footer
        isDarkMode={isDarkMode}
        onDarkModeClick={handleDarkModeClick}
        className="animated-hp-element"
      />
    </div>
  );
}

export default App;
