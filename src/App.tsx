import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef, useState } from "react";
import "./App.css";
import PortfolioItem from "./components/PortfolioItem";
import Tag from "./components/Tag";
import data from "./data.json";

gsap.registerPlugin(useGSAP);

function App() {
  const [itemOpen, setItemOpen] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);
  const highlightTimeout = useRef<number>(0);
  const appRef = useRef<HTMLDivElement>(null);

  // Collect all unique tags from the data
  const skills = useMemo(
    () => Array.from(new Set(data.map((item) => item.tags).flat())),
    [],
  );

  function handleOpen(id: string) {
    setItemOpen(id);
  }

  function handleTagClick(tag: string) {
    // Highlight items with the given tag
    setHighlights(
      data.filter((item) => item.tags.includes(tag)).map((item) => item.id),
    );

    // Clear highlights after 2 seconds
    clearTimeout(highlightTimeout.current);

    highlightTimeout.current = setTimeout(() => {
      setHighlights([]);
    }, 2000);
  }

  useGSAP(
    () => {
      gsap.set(".animated-hp-element", { opacity: 0 });

      gsap.timeline().to(".animated-hp-element", {
        opacity: 1,
        stagger: 0.05,
        duration: 0.2,
        delay: 0.5,
      });
    },
    { scope: appRef },
  );

  return (
    <div className="App" ref={appRef}>
      <header className="animated-hp-element mt-12 leading-tight">
        <h1 className="font-extrabold">José Espejo</h1>
        <h2>Front End Developer</h2>
      </header>
      <main className="mb-12 flex-grow leading-tight">
        <div className="my-16">
          <h4 className="animated-hp-element mb-2 text-[0.625rem] text-gray-500">
            Technical Skills
          </h4>
          <div className="flex w-9/12 flex-wrap gap-2">
            {skills.map((tag) => (
              <button key={tag} onClick={() => handleTagClick(tag)}>
                <Tag text={tag} className="animated-hp-element" />
              </button>
            ))}
          </div>
        </div>
        <h4 className="animated-hp-element mb-2 text-[0.625rem] text-gray-500">
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
      <footer className="animated-hp-element mb-8 text-[0.625rem] leading-tight text-gray-400">
        <p className="flex gap-4">
          <span>&copy; 2024 Jose Espejo</span>
          <span>m: 07977 703015</span>
          <span>e: joseespejo@yahoo.com</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
