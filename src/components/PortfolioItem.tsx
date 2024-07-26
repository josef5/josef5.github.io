import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CloseIcon from "./CloseIcon";
import Tag from "./Tag";

function PortfolioItem({
  title,
  subtitle,
  data,
  isExternalOpen,
}: {
  title: string;
  subtitle?: string;
  data: {
    tags: string[];
    screenshots: string[];
    description: string;
    link: { text: string; url: string };
  };
  isExternalOpen?: boolean;
}) {
  const mainRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const maxHeightRef = useRef<number>(0);
  const [isOpen, setIsOpen] = useState(isExternalOpen);
  const { /* title, subtitle,  */ tags, screenshots, description, link } = data;

  const tl = gsap.timeline();

  useLayoutEffect(() => {
    if (contentContainerRef?.current) {
      maxHeightRef.current = contentContainerRef?.current?.offsetHeight;
    }
  }, []);

  useEffect(() => {
    setIsOpen(isExternalOpen);
  }, [isExternalOpen]);

  useGSAP(
    () => {
      gsap.set(".accordion-content", {
        maxHeight: isOpen ? maxHeightRef.current : "0",
      });

      gsap.set(".animated-element", { opacity: 0 });
    },
    { dependencies: [], scope: mainRef },
  );

  useGSAP(
    () => {
      if (isOpen) {
        tl.to(`.accordion-content`, {
          maxHeight: maxHeightRef.current,
          duration: 0.2,
        })
          .to(".subtitle-1", {
            opacity: 0,
            duration: 0.2,
            ease: "power3.out",
          })
          .to(
            ".animated-element",
            {
              opacity: 1,
              duration: 0.2,
              ease: "power3.in",
              stagger: 0.1,
            },
            "<",
          );
      } else {
        tl.to(".animated-element", {
          opacity: 0,
          duration: 0.3,
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
              maxHeight: "0",
              duration: 0.2,
            },
            "+=0.1",
          );
      }
    },
    { dependencies: [isOpen, maxHeightRef.current], scope: mainRef },
  );

  return (
    <div
      ref={mainRef}
      className={`relative flex flex-col rounded-2xl bg-[hsl(0,0%,85%)] px-8 pb-4 text-black shadow-md shadow-black/30 transition-all duration-1000 ${isOpen ? "pt-8" : "pt-4"} `}
    >
      <div
        className="accordion-header flex cursor-pointer items-baseline gap-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="text-base font-extrabold text-gray-600">{title}</h2>
        <h3 className={`subtitle-1 text-xs font-normal text-gray-600`}>
          {subtitle}
        </h3>
        <CloseIcon
          className={`absolute right-5 top-5 size-5 fill-gray-600 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div
        className={`accordion-content overflow-hidden text-left text-[12px] leading-5`}
        ref={contentContainerRef}
      >
        <div className="subtitle-2 animated-element mt-[-0.25rem] h-14 text-gray-600">
          {subtitle}
        </div>
        <div className="accordion-body">
          <div className="tags flex gap-2">
            {tags.map((tag) => (
              <Tag text={tag} key={tag} className="animated-element" />
            ))}
          </div>
          <div className="screenshots my-12 flex min-h-[212px] gap-6">
            {screenshots.map((src) => (
              <img
                src={src}
                key={src}
                // alt="SEAT Finance Calculator"
                className="animated-element shrink-0 overflow-hidden rounded"
              />
            ))}
          </div>
          <p className="animated-element w-6/12 leading-snug text-gray-600">
            {description}
          </p>
          <a href={link.url} target="_blank" className="animated-element">
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
