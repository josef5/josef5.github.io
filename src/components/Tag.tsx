function Tag({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`${className} bg-lightMode-tagBgColor text-lightMode-tagText dark:bg-darkMode-tagBgColor dark:text-darkMode-tagText rounded-[10px] px-3 py-1 text-[0.5625rem] leading-5 transition-colors duration-300`}
    >
      {text}
    </div>
  );
}

export default Tag;
