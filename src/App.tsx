import { useState } from "react";
import "./App.css";
import PortfolioItem from "./components/PortfolioItem";
import data from "./data.json";

function App() {
  const [itemOpen, setItemOpen] = useState<string | null>(null);

  function handleOpen(id: string) {
    setItemOpen(id);
  }

  return (
    <div className="flex flex-col gap-4">
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
            onOpen={handleOpen}
          />
        );
      })}
    </div>
  );
}

export default App;
