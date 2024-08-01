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
      {data.map((data) => {
        const { id, title, subtitle } = data;

        return (
          <PortfolioItem
            id={id}
            key={id}
            title={title}
            subtitle={subtitle}
            data={data}
            isExternalOpen={itemOpen === id}
            onOpen={handleOpen}
          />
        );
      })}
    </div>
  );
}

export default App;
