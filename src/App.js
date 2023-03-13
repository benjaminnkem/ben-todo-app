import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <div id="todo">
          <Todo />
        </div>
      </main>
    </div>
  );
}

export default App;
