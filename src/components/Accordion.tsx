import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
      }).to(".animated-element", {
        opacity: 1,
        duration: 0.2,
        ease: "power3.in",
        stagger: 0.2,
      });
    } else {
      tl.to(".animated-element", {
        opacity: 0,
        duration: 0.1,
        ease: "power3.in",
      }).to(
        `.accordion-content`,
        {
          maxHeight: "0",
          duration: 0.2,
        },
        "+=0.1"
      );
    }
  }, [isOpen, maxHeightRef.current]);

  return (
    <div className="flex flex-col rounded-lg bg-blue-500 p-4">
      <div
        className="accordion-header flex cursor-pointer justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="font-bold">{title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`size-4 transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
            clipRule="evenodd"
          />
        </svg>
          {subtitle}
      </div>
      <div
        className={`accordion-content overflow-hidden text-left text-[13px]`}
        ref={contentContainerRef}
      >
        <div className="animated-element mt-[-0.25rem] h-14 text-gray-600">
          {subtitle}
        </div>
        <div className="accordion-body">{children}</div>
        <div className="h-4">{/* spacer */}</div>
      </div>
    </div>
  );
}

export default Accordion;
