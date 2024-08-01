import { useState } from "react";
import "./App.css";
import PortfolioItem from "./components/PortfolioItem";

function App() {
  const data = [
    {
      id: "seat",
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
    },
    {
      id: "skoda",
      title: "Skoda UK",
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
          alt: "Skoda Book a Service",
          src: "/skoda-osb-1-191x212.png",
        },
        { alt: "Skoda Book a Service", src: "/skoda-osb-2-177x212.png" },
        { alt: "Skoda Book a Service", src: "/skoda-osb-3-96x212.png" },
        { alt: "Skoda Book a Service", src: "/skoda-osb-4-104x212.png" },
      ],
      description:
        "Skoda Book a Service forms were built using React and TypeScript and configured using Jahia CMS.",
      link: { text: "www.skoda.co.uk", url: "http://www.skoda.co.uk" },
    },
  ];

  const [itemOpen, setItemOpen] = useState<string | null>(null);

  function handleOpen(id: string) {
    setItemOpen(id);
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((data) => {
        const { id, title, subtitle } = data;

        return (
          <PortfolioItem
            id={id}
            key={id}
            title={title}
            subtitle={subtitle}
            data={data}
            isExternalOpen={itemOpen === id}
            onOpen={handleOpen}
          />
        );
      })}
    </div>
  );
}

export default App;
