import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import HighlightIcon from "./icons/HighlightIcon";
import Tag from "./Tag";

function PortfolioItem({
  id,
  title,
  subtitle,
  data,
  isExternalOpen,
  isHighlighted = false,
  onOpen,
  className,
}: {
  id: string;
  title: string;
  subtitle?: string;
  data: {
    tags: string[];
    screenshots: { alt: string; src: string }[];
    description: string;
    link: { text: string; url: string };
  };
  isExternalOpen?: boolean;
  isHighlighted: boolean;
  onOpen: (id: string) => void;
  className?: string;
}) {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(isExternalOpen);
  const { tags, screenshots, description, link } = data;

  const LAYOUT = {
    LEFT_PADDING_OPEN: "2rem",
    LEFT_PADDING_CLOSE: "1.4rem",
    TOP_PADDING_OPEN: "2rem",
    TOP_PADDING_CLOSE: "1rem",
    WIDTH_OPEN: "100%",
    WIDTH_CLOSE: "75%",
  };

  function handleClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      onOpen(id);
      setIsOpen(true);

      trackClick();
    }
  }

  function trackClick() {
    // Send statcounter event
    window._statcounter.push({
      tags: { event_name: `Click Open: ${title}` },
    });

    // Record statcounter pageview
    window._statcounter.record_pageview();
  }

  useEffect(() => {
    setIsOpen(isExternalOpen);
  }, [isExternalOpen]);

  useGSAP(
    () => {
      gsap.set(mainDivRef.current, {
        paddingTop: LAYOUT.TOP_PADDING_CLOSE,
        paddingLeft: LAYOUT.LEFT_PADDING_CLOSE,
        width: LAYOUT.WIDTH_CLOSE,
      });

      gsap.set(".accordion-content", {
        height: 0,
      });

      gsap.set(".animated-pfitem-element", { opacity: 0 });
      gsap.set(".subtitle-1", { opacity: 1 });
      gsap.set(".close-icon", { opacity: 0 });
    },
    { dependencies: [], scope: mainDivRef },
  );

  useGSAP(
    () => {
      if (isOpen) {
        gsap
          .timeline()
          .to(mainDivRef.current, {
            width: LAYOUT.WIDTH_OPEN,
            duration: 0.2,
          })
          .to(`.accordion-content`, {
            height: "auto",
            duration: 0.2,
          })
          .to(
            ".close-icon",
            {
              opacity: 1,
              duration: 0.1,
            },
            "<",
          )
          .to(
            mainDivRef.current,
            {
              paddingTop: LAYOUT.TOP_PADDING_OPEN,
              paddingLeft: LAYOUT.LEFT_PADDING_OPEN,
              duration: 0.2,
            },
            "<",
          )
          .to(
            ".subtitle-1",
            {
              opacity: 0,
              duration: 0.1,
              ease: "power3.out",
            },
            "<",
          )
          .to(
            ".animated-pfitem-element",
            {
              opacity: 1,
              duration: 0.2,
              ease: "power3.in",
              stagger: 0.1,
            },
            "<0.1",
          );
      } else {
        gsap
          .timeline()
          .to(".animated-pfitem-element", {
            opacity: 0,
            duration: 0.2,
            ease: "power3.out",
          })
          .to(".subtitle-1", {
            opacity: 1,
            duration: 0.3,
            ease: "power3.in",
          })
          .to(
            `.accordion-content`,
            {
              height: 0,
              duration: 0.2,
            },
            "<0.1",
          )
          .to(
            ".close-icon",
            {
              opacity: 0,
              duration: 0.1,
            },
            "<",
          )
          .to(mainDivRef.current, {
            width: LAYOUT.WIDTH_CLOSE,
            duration: 0.2,
          })
          .to(
            mainDivRef.current,
            {
              paddingTop: LAYOUT.TOP_PADDING_CLOSE,
              paddingLeft: LAYOUT.LEFT_PADDING_CLOSE,
              duration: 0.2,
            },
            "<",
          );
      }
    },
    { dependencies: [isOpen], scope: mainDivRef },
  );

  return (
    <div
      ref={mainDivRef}
      className={`${className} bg-lightMode-pfItemBgColor text-lightMode-pfItemText dark:bg-darkMode-pfItemBgColor dark:text-darkMode-pfItemText relative flex w-9/12 flex-col rounded-xl px-8 pb-4`}
    >
      <div
        className="accordion-header flex cursor-pointer items-baseline gap-2"
        onClick={handleClick}
      >
        <h2 className="text-base font-extrabold">{title}</h2>
        <h3 className={`subtitle-1 text-xs font-normal`}>{subtitle}</h3>
        <CloseIcon className={`close-icon absolute right-5 top-5 size-5`} />
        <HighlightIcon
          className={`highlight-icon fill-lightMode-highlightColor dark:fill-darkMode-highlightColor absolute right-5 top-5 size-4 transition-opacity duration-300 ${isHighlighted && !isOpen ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div
        className={`accordion-content overflow-hidden text-left text-[12px] leading-5`}
        ref={contentContainerRef}
      >
        <div className="subtitle-2 animated-pfitem-element mt-[-0.25rem] h-14">
          {subtitle}
        </div>
        <div className="accordion-body">
          <div className="tags flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag text={tag} key={tag} className="animated-pfitem-element" />
            ))}
          </div>
          <div className="screenshots my-12 flex min-h-[212px] snap-x snap-mandatory gap-6 overflow-x-scroll">
            {screenshots.map(({ src, alt }) => (
              <img
                src={src}
                key={src}
                alt={alt}
                className="animated-pfitem-element shrink-0 snap-start snap-always overflow-hidden rounded"
              />
            ))}
          </div>
          <p className="animated-pfitem-element w-8/12 leading-snug">
            {description}
          </p>
          <a
            href={link.url}
            target="_blank"
            className="animated-pfitem-element font-bold"
          >
            {link.text}
          </a>
          <div className="h-8"></div>
        </div>
        <div className="h-4">{/* spacer */}</div>
      </div>
    </div>
  );
}

export default PortfolioItem;
