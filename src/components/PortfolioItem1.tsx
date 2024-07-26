import Accordion from "./Accordion";
import Tag from "./Tag";

function PortfolioItem({
  data,
}: {
  data: {
    title: string;
    subtitle: string;
    tags: string[];
    screenshots: string[];
    description: string;
    link: { text: string; url: string };
  };
}) {
  const { title, subtitle, tags, screenshots, description, link } = data;

  return (
    <>
      <Accordion title={title} subtitle={subtitle} isExternalOpen={false}>
        <div className="tags flex gap-2">
          {tags.map((tag) => (
            <Tag text={tag} key={tag} className="animated-element" />
          ))}
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
        <p className="animated-element w-6/12 leading-snug text-gray-600">
          {description}
        </p>
        <a href={link.url} target="_blank" className="animated-element">
          {link.text}
        </a>
        <div className="h-8"></div>
      </Accordion>
    </>
  );
}

export default PortfolioItem;
