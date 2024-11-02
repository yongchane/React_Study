// 리덕스를 만들건데 구독하지는 않고 스토어를 만들것이다
import { createStore } from "redux";

const connectReducer = (state, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  return state;
};

const store = redux.createStore(connectReducer);

export default store;
