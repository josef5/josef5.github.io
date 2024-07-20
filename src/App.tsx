import "./App.css";
import Accordion from "./components/Accordion";

function App() {
  return (
    <>
      <Accordion title="Lorem Ipsum" maxHeight="400px">
        <h3 className="animated-element fade-in-1 font-bold">Subtitle</h3>
        <p className="animated-element fade-in-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quae
          culpa veritatis. Corporis fugiat laboriosam modi perspiciatis magni
          cum est earum harum, ea consequatur laudantium, ab ex enim porro nisi!
        </p>
        <div className="animated-element fade-in-3 w-48 h-60 bg-white my-8"></div>
      </Accordion>
    </>
  );
}

export default App;
