// 리덕스를 만들건데 구독하지는 않고 스토어를 만들것이다
import { createStore } from "redux";

import { createSlice, configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counter";
import authSlice from "./auth";

// redux 사용법
const initialCounterState = { counter: 0, showCounter: true };

const connectReducer = (state = initialCounterState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter, // increment에서는 바꾸지 않길 원해서 기존의 shoCounter로 잡음
      // state.counter ++ ; 처럼 직접 state 를 변경하면 안되고 새로운 state를 선언해서 변경시켜야함
      // 즉 redux로 작업할때 절대 state를 변형해서는 안됌 -> 이로인한 버그가 발생 가능 위처럼 항상 새로운 값 나와야함
    };
  }
  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      // action.amount(action payload 라고 불림) 같은 파라미터 값은 맘대로 설정 가능
      showCounter: state.showCounter,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }
  return state;
};

// redux를 사용했을때 store을 부르는 방법
// const store = createStore(connectReducer);

// redux-toolkit을 사용했을때 store을 부르는 방법
// const store= createStore(counterSlice.reducer)
// 앱의 규모가 커지면 하나의 리듀서만 전달해야하는데 slice가 여러개면 .reducer를 이용해 서로 다른 slice에 접근하는 리듀서도 여러개

// 여러개의 리듀서를 하나로 합칠때 configureStore을 import해서 사용하기
//configureStore는 createStore 처러 storedmf 만듬

//액션 식별자 받는법 위에서 선언한 key(increment,decrement와같은)값들이 있음
//counterSlice.actions.toggleCounter // 해당 매서드가 호출되면 액션 객체가 생성

const store = configureStore({
  // 전역 상태를 담당하는 주요 리듀서로 사용하는 방법
  // 1. reducer: counterSlice.reducer -> 주로 리듀서가 하나있을때 주요 리듀서로 할당하게함
  // 2. reducer: { counter(원하는 대로 속성 이름 정하기):counterSlice.reducer, 원하는 키값:리듀서.reducer }
  //-> 리듀서들을 map 처럼 묶어서 하나의 리듀서로 만드는 작업

  reducer: { counter: counterSlice, auth: authSlice },
});
// configureStore에서 요구되는 설정 객체에서 리듀서 프로퍼티를 정함

//액션 개체 내보내기
// export const counterActions = counterSlice.actions;
// export const authActions = authSlice.actions;

export default store;
