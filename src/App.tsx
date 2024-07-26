import "./App.css";
import PortfolioItem from "./components/PortfolioItem";
// import PortfolioItem from "./components/PortfolioItem";

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
      "/seat-finance-calculator-1-192x212.png",
      "/seat-testdrive-1-258x212.png",
      "/seat-testdrive-2-158x212.png",
      "/seat-testdrive-3-150x212.png",
    ],
    description:
      "SEAT Finance Calculator and Request a Test Drive forms were built using React and TypeScript and configured using Jahia CMS.",
    link: { text: "www.seat.co.uk", url: "http://www.seat.co.uk" },
  };

  const { title, subtitle /* , tags, screenshots, description, link */ } = data;

  return (
    <div className="flex flex-col gap-4">
      <PortfolioItem
        title={title}
        subtitle={subtitle}
        data={data}
        isExternalOpen={true}
      />
      <PortfolioItem title={title} subtitle={subtitle} data={data} />
    </div>
  );
}

export default App;
