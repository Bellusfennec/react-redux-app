import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChanges,
  taskDeleted,
  completeTask,
  getTasks,
} from "./store/task";
import configureStore from "./store/store";

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  const changeTitle = (id) => {
    store.dispatch(titleChanges(id));
  };
  const deleteTask = (id) => {
    store.dispatch(taskDeleted(id));
  };

  useEffect(() => {
    store.dispatch(getTasks());
    store.subscribe(() => setState(store.getState()));
  }, []);

  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Compelete: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
