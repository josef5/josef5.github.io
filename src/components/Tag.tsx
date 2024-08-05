import React from "react";

function Tag({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={`${className} rounded-[10px] bg-[hsl(0,0%,35%)] px-3 py-1 text-[0.5625rem] leading-5 text-white`}
    >
      {text}
    </div>
  );
}

export default Tag;
