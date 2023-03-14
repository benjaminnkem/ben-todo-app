import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Todo from "./components/Todo";
import TodoDetails from "./components/TodoDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
        </header>

        <main>
          <div id="main___content">
            <Routes>
              <Route exact path="/" element={<Todo />}></Route>
              <Route path="/todos/:id" element={<TodoDetails />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
