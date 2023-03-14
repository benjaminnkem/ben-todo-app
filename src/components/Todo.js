import { useEffect, useState } from "react";
import TodoDetails from "./TodoDetails";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [noTodo, setNoTodo] = useState(false);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [emptyTodo, setEmptyTodo] = useState(false);

  const [blogShow, setBlogShow] = useState(false);
  const [singleTodoData, setSingleTodoData] = useState({});

  function handleFetch(url) {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setIsPending(false);
          setIsError(true);
        }
        return res.json();
      })
      .then((data) => {
        setIsError(false);
        setIsPending(false);
        if (data.length > 0) {
          setTodos(data);
          setNoTodo(false);
        } else {
          setTodos(null);
          setNoTodo(true);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  }

  useEffect(() => {
    handleFetch("http://localhost:8000/todos");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (title.length === 0 || note.length === 0) {
      setEmptyTodo(true);
      setTimeout(() => {
        setEmptyTodo(false);
      }, 2000);
      return;
    }

    setEmptyTodo(false);
    const body = {
      title: title,
      note: note,
      date: new Date(),
    };

    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => {
      setTitle("");
      setNote("");
      handleFetch("http://localhost:8000/todos");
    });
  }

  function handleShow(todoId) {
    fetch(`http://localhost:8000/todos/${todoId}`)
      .then((res) => {
        if (!res.ok) {
          setBlogShow(false);
        }
        return res.json();
      })
      .then((todoData) => {
        setSingleTodoData(todoData);
        setBlogShow(true);
      })
      .catch((err) => console.log(err));
  }

  function handleTodoDelete(todoId) {
    fetch(`http://localhost:8000/todos/${todoId}`, {
      method: "DELETE",
    }).then(() => {
      handleFetch("http://localhost:8000/todos");
    });
  }

  return (
    <div id="todo__body">
      {emptyTodo && (
        <div id="empty__input__con">
          <p>Please don't leave the fields empty</p>
        </div>
      )}
      <div id="todo_con">
        <div id="first_part">
          <form id="todo_form" onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                id="todo_input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Note</label>
              <textarea
                id="note"
                rows="10"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            <button id="add__btn">Add</button>
          </form>
        </div>
        <div id="second_part">
          <h2 id="todo_heading">MY TODO</h2>
          <div id="todo_data">
            {isError && <p>An error occurred...</p>}
            {isPending && (
              <div style={{ padding: "10px 0", textAlign: "center" }}>
                Loading...
              </div>
            )}
            {noTodo && <p>No todo, Add some!</p>}
            {todos &&
              todos.map((todo) => {
                return (
                  <div key={todo.id} className="todo_">
                    <p>
                      {todo.title.length > 20
                        ? `${todo.title.substring(0, 20)}...`
                        : todo.title}
                    </p>
                    <span className="showd_con">
                      <button
                        onClick={() => {
                          handleShow(todo.id);
                        }}
                      >
                        Show
                      </button>
                      <button onClick={() => handleTodoDelete(todo.id)}>
                        Delete
                      </button>
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* TODO DETAIL PAGE POP */}
        <div id="todo_det_pop">
          {blogShow && (
            <TodoDetails
              singleTodoData={singleTodoData}
              setBlogShow={setBlogShow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
