import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";
// import { compose, pipe } from "lodash/fp";

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  const completeTask = (id) => {
    store.dispatch(actions.taskCompleted(id));
  };
  const changeTitle = (id) => {
    store.dispatch(actions.titleChanges(id));
  };

  useEffect(() => {
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
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
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
