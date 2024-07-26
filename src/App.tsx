import "./App.css";
import Accordion from "./components/Accordion";
import Tag from "./components/Tag";

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
    <>
      <Accordion
        title="SEAT Cars UK"
        subtitle="Automotive web apps"
        isExternalOpen={true}
      >
        <div className="tags flex gap-2">
          <Tag text="React" className="animated-element" />
          <Tag text="TypeScript" className="animated-element" />
          <Tag text="Hookstate" className="animated-element" />
          <Tag text="Jahia" className="animated-element" />
          <Tag text="Cypress" className="animated-element" />
          <Tag text="Webpack" className="animated-element" />
        </div>
        <div className="screenshots my-12 flex min-h-[212px] gap-6">
          <img
            src="/seat-finance-calculator-1-192x212.png"
            alt="SEAT Finance Calculator"
            className="animated-element overflow-hidden rounded"
          />
          <img
            src="/seat-testdrive-1-258x212.png"
            alt="SEAT Request a Test Drive"
            className="animated-element overflow-hidden rounded"
          />
          <img
            src="/seat-testdrive-2-158x212.png"
            alt="SEAT Request a Test Drive"
            className="animated-element overflow-hidden rounded"
          />
          <img
            src="/seat-testdrive-3-150x212.png"
            alt="SEAT Request a Test Drive"
            className="animated-element overflow-hidden rounded"
          />
        </div>
        {/* <h3 className="animated-element font-bold">Subtitle</h3> */}
        <p className="animated-element w-6/12 leading-snug text-gray-600">
          SEAT Finance Calculator and Request a Test Drive forms were built
          using React and TypeScript and configured using Jahia CMS.
        </p>
        <a href="" className="animated-element">
          www.seat.co.uk
        </a>
        <div className="h-8"></div>
      </Accordion>
    </>
  );
}

export default App;
