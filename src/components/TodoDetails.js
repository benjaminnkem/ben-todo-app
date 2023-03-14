const TodoDetails = ({ singleTodoData, setBlogShow }) => {
  const { title, note, date } = singleTodoData;

  function closeDetailsPage() {
    setBlogShow(false);
  }

  return (
    <div id="todo_det_con">
      <div className="todo_content">
        <div>
          <h3 className="todo_tit">{title}</h3>
          {/* <span className="indicators_">Title</span> */}
          <button onClick={closeDetailsPage}>Close</button>
        </div>
        <div className="other_con">
          <div>
            <span className="indicators_">Note</span>
            <p className="todo_not">{note}</p>
          </div>
          <div>
            <span className="indicators_">Date Added</span>
            <p className="todo_date">
              {new Date(date).toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
