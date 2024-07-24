import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CloseIcon from "./CloseIcon";

function Accordion({
  title,
  subtitle,
  children,
  isExternalOpen,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  isExternalOpen?: boolean;
}) {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const maxHeightRef = useRef<number>(0);
  const [isOpen, setIsOpen] = useState(isExternalOpen);

  const tl = gsap.timeline();

  useLayoutEffect(() => {
    if (contentContainerRef?.current) {
      maxHeightRef.current = contentContainerRef?.current?.offsetHeight;
    }
  }, []);

  useEffect(() => {
    setIsOpen(isExternalOpen);
  }, [isExternalOpen]);

  useGSAP(() => {
    gsap.set(".accordion-content", {
      maxHeight: isOpen ? maxHeightRef.current : "0",
    });

    gsap.set(".animated-element", { opacity: 0 });
  }, []);

  useGSAP(() => {
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
  }, [isOpen, maxHeightRef.current]);

  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-[hsl(0,0%,85%)] pr-6 ${isOpen ? "pl-8 pt-8" : "pl-8 pt-4"} pb-4 text-black shadow-md shadow-black/30 transition-all duration-1000`}
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
        <div className="accordion-body">{children}</div>
        <div className="h-4">{/* spacer */}</div>
      </div>
    </div>
  );
}

export default Accordion;
