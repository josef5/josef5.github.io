import { useMemo, useState } from "react";
import "./App.css";
import PortfolioItem from "./components/PortfolioItem";
import Tag from "./components/Tag";
import data from "./data.json";

function App() {
  const [itemOpen, setItemOpen] = useState<string | null>(null);

  // Collect all unique tags from the data
  const skills = useMemo(
    () => Array.from(new Set(data.map((item) => item.tags).flat())),
    [],
  );

  function handleOpen(id: string) {
    setItemOpen(id);
  }

  return (
    <>
      <header className="mt-2 leading-tight">
        <h1 className="font-extrabold">José Espejo</h1>
        <h2>Front End Developer</h2>
      </header>
      <main className="mb-12 leading-tight">
        <div className="my-16">
          <h4 className="mb-2 text-[0.625rem] text-gray-500">
            Technical Skills
          </h4>
          <div className="flex w-9/12 flex-wrap gap-2">
            {skills.map((tag) => (
              <Tag key={tag} text={tag} className="animated-element" />
            ))}
          </div>
        </div>
        <h4 className="mb-2 text-[0.625rem] text-gray-500">Selected Work</h4>
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
                onOpen={handleOpen}
              />
            );
          })}
        </div>
      </main>
      <footer className="mb-16 text-[0.625rem] leading-tight text-gray-400">
        <p className="flex gap-4">
          <span>&copy; 2024 Jose Espejo</span>
          <span>m: 07977 703015</span>
          <span>e: joseespejo@yahoo.com</span>
        </p>
      </footer>
    </>
  );
}

export default App;
