import Tag from "./Tag";

function TagList({
  tags,
  selectedTag,
  onTagClick,
  className,
  tagClassName,
}: {
  tags: string[];
  selectedTag?: string | null;
  onTagClick?: (tag: string) => void;
  className?: string;
  tagClassName?: string;
}) {
  return (
    <div className={`${className} flex flex-wrap gap-2`}>
      {tags.map((tag) => {
        const tagComponent = (
          <Tag
            text={tag}
            className={`${tagClassName} ${tag === selectedTag && "!bg-lightMode-highlightColor dark:!bg-darkMode-highlightColor"}`}
          />
        );

        return onTagClick ? (
          <button key={tag} onClick={() => onTagClick(tag)}>
            {tagComponent}
            {/* <Tag
              text={tag}
              className={`${tagClassName} ${tag === selectedTag && "!bg-lightMode-highlightColor dark:!bg-darkMode-highlightColor"}`}
            /> */}
          </button>
        ) : (
          <span key={tag}>{tagComponent}</span>
        );
      })}
    </div>
  );
}

export default TagList;
