import { combineReducers } from "redux";

import counter from "./counter/counter.store";
import placeholder from "./placeholder/Placeholder.store";

const rootReducer = combineReducers({
  counter,
  placeholder
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
