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
    <main className="min-h-screen leading-tight">
      <h1 className="font-extrabold">José Espejo</h1>
      <h2>Front End Developer</h2>
      <h3>Selected Work</h3>
      <div className="my-16">
        <h4 className="mb-2 text-[0.6875rem]">Professional Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((tag) => (
            <Tag key={tag} text={tag} className="animated-element" />
          ))}
        </div>
      </div>
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
  );
}

export default App;
