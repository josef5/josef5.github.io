function Footer({
  isDarkMode,
  onDarkModeClick,
  className,
}: {
  isDarkMode: boolean;
  onDarkModeClick: () => void;
  className?: string;
}) {
  return (
    <footer
      className={`${className} text-lightMode-footerText dark:text-darkMode-footerText mb-8 text-[0.625rem] leading-tight`}
    >
      <p className="flex gap-4">
        <span>&copy; 2024 Jose Espejo</span>
        <span>m: 07977 703015</span>
        <span>e: jose@joseespejo.info</span>
        <button onClick={() => onDarkModeClick()}>
          dark mode: {isDarkMode ? "on" : "off"}
        </button>
      </p>
    </footer>
  );
}

export default Footer;
