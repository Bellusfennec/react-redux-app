import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from "redux";
import taskReducer from "./task";
import { logger } from "./middleware/logger";
import { thunk } from "./middleware/thunk";

const middlewareEnchancer = applyMiddleware(logger, thunk);

function configureStore() {
  return createStore(
    taskReducer,
    compose(
      middlewareEnchancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
export default configureStore;
