import PortfolioItem from "./PortfolioItem";

function PortfolioList({
  data,
  itemOpen,
  highlights,
  handleOpen,
  className,
}: {
  data: {
    id: string;
    title: string;
    subtitle?: string;
    tags: string[];
    screenshots: { alt: string; src: string }[];
    description: string;
    link: { text: string; url: string };
  }[];
  itemOpen: string | null;
  highlights: string[];
  handleOpen: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={`${className} flex flex-col gap-4`}>
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
  );
}

export default PortfolioList;
