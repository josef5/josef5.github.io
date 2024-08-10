import React from "react";

function Header({ className }: { className?: string }) {
  return (
    <header
      className={`${className} text-lightMode-headerText dark:text-darkMode-headerText mt-12 leading-tight`}
    >
      <h1 className="font-extrabold">José Espejo</h1>
      <h2>Front End Developer</h2>
    </header>
  );
}

export default Header;
