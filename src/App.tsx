import { useState } from "react";
import "./App.css";
import PortfolioItem from "./components/PortfolioItem";

function App() {
  const data = [
    {
      id: "vw",
      title: "Volkswagen UK",
      subtitle: "Automotive web apps",
      tags: [
        "React",
        "TypeScript",
        "Redux",
        "Hookstate",
        "Styled Components",
        "StoryBlok",
        "Storybook",
        "Feature Hub",
        "Micro-services",
        "Webpack",
      ],
      screenshots: [
        {
          alt: "Volkswagen Configurator",
          src: "/vw-configurator-153x212.png",
        },
        {
          alt: "Volkswagen Finance Offers",
          src: "/vw-finance-offers-1-105x212.png",
        },
        {
          alt: "Volkswagen Finance Offers",
          src: "/vw-finance-offers-2-228x212.png",
        },
        {
          alt: "Volkswagen Retailer Search",
          src: "/vw-retailer-search-252x212.png",
        },
      ],
      description:
        "Volkswagen Finance Calculator and Request a Test Drive forms were built using React and TypeScript and configured using Jahia CMS.",
      link: { text: "www.vw.co.uk", url: "http://www.vw.co.uk" },
    },
    {
      id: "seat",
      title: "SEAT Cars UK",
      subtitle: "Automotive web apps",
      tags: [
        "React",
        "TypeScript",
        "Hookstate",
        "Styled Components",
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
        "Styled Components",
        "StoryBlok",
        "Storybook",
        "Jahia",
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
    {
      id: "wren",
      title: "Wren Kitchens",
      subtitle: "Kitchen showroom page",
      tags: ["HTML", "CSS", "JavaScript"],
      screenshots: [
        { alt: "Wren Kitchens", src: "/wren-levittown-1-202x212.png" },
        { alt: "Wren Kitchens", src: "/wren-levittown-2-188x212.png" },
        { alt: "Wren Kitchens", src: "/wren-levittown-3-170x212.png" },
      ],
      description:
        "Wren Kitchens was built using React and TypeScript and configured using Redux and Redux-Saga.",
      link: {
        text: "www.wrenkitchens.com",
        url: "https://www.wrenkitchens.com/us/showrooms/levittown",
      },
    },
    {
      id: "simple-pattern",
      title: "Simple Pattern",
      subtitle: "iOS app",
      tags: ["iOS", "Objective-C", "UIKit", "Swift", "Xcode"],
      screenshots: [
        { alt: "My Next Tube app", src: "/my-next-tube-1-119x212.png" },
        { alt: "My Next Tube app", src: "/my-next-tube-2-119x212.png" },
      ],
      description:
        "Simple Pattern was built using React and TypeScript and configured using Redux and Redux-Saga.",
      link: {
        text: "www.simplepattern.co.uk",
        url: "http://www.simplepattern.co.uk",
      },
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
