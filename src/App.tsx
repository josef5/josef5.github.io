import { useState } from "react";
import "./App.css";
import PortfolioItem from "./components/PortfolioItem";

function App() {
  const data = {
    title: "SEAT Cars UK",
    subtitle: "Automotive web apps",
    tags: [
      "React",
      "TypeScript",
      "Hookstate",
      "Storybook",
      "Jahia",
      "Cypress",
      "Webpack",
    ],
    screenshots: [
      {
        alt: "SEAT Finance Calculator",
        src: "/seat-finance-calculator-1-192x212.png",
      },
      { alt: "SEAT Test Drive", src: "/seat-testdrive-1-258x212.png" },
      { alt: "SEAT Test Drive", src: "/seat-testdrive-2-158x212.png" },
      { alt: "SEAT Test Drive", src: "/seat-testdrive-3-150x212.png" },
    ],
    description:
      "SEAT Finance Calculator and Request a Test Drive forms were built using React and TypeScript and configured using Jahia CMS.",
    link: { text: "www.seat.co.uk", url: "http://www.seat.co.uk" },
  };

  const { title, subtitle } = data;

  const [itemOpen, setItemOpen] = useState<number | null>(null);

  function handleOpen(id: number) {
    setItemOpen(id);
  }

  return (
    <div className="flex flex-col gap-4">
      <PortfolioItem
        id={1}
        title={title}
        subtitle={subtitle}
        data={data}
        isExternalOpen={itemOpen === 1}
        onOpen={handleOpen}
      />
      <PortfolioItem
        id={2}
        title={title}
        subtitle={subtitle}
        data={data}
        isExternalOpen={itemOpen === 2}
        onOpen={handleOpen}
      />
      <PortfolioItem
        id={3}
        title={title}
        subtitle={subtitle}
        data={data}
        isExternalOpen={itemOpen === 3}
        onOpen={handleOpen}
      />
    </div>
  );
}

export default App;
