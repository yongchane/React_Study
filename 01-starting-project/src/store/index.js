// 리덕스를 만들건데 구독하지는 않고 스토어를 만들것이다
import { createStore } from "redux";

import { createSlice, configureStore } from "@reduxjs/toolkit";
import store from "../../../react_study_ai/src/Redux/store";

const initialState = { counter: 0, showCounter: true };

// redux-toolkit 사용법

// reduxtoolkit 전역상태의 slice를 미리 만들어 놔야함
//서로 직접적인 관계가 아닌 상태가 여러 조각으로 나뉘어 있다고 가정(인증 상태와 카운터 상태 있다고 가정)
// 모든 slice에는 이름이 있어야함 즉 상태마다 식별자가 필요
const counterSlice = createSlice({
  name: "counter",
  initialState: initialState, // 초기 상태를 initialState를 통해 선언해야함
  //리듀서 설정하기
  reducers: {
    //리듀서 안 매서드의 이름들은 마음대로 지어도 됌
    // 해당 매서드 안의 state는 최신 state를 받아오고 이 매서드들은 나중에 리덕스에 의해 호출되고 현재상태를 받음
    //어떤 액션을 했느냐에 따라 매서드가 자동으로 호출됨 ->아래와 같으 if문을 사용하지 않아도 됌
    increment(state) {
      // 매서드 안에서 상태를 변경할 수 있음
      // redux-toolkit,createSlice를 사용하면 다음과 같이 선언해도 state의 기존 상태를 바꿀 수 없다
      // 내부적으로 immer라는 다른 패키지를 사용하는데 이런상태를 감지하고 자동으로 원래 있는 상태를 복제함
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      //action에 붙어있는 데이터가 필요하면 action을 매개변수로 받아서 리듀서 함수 및 메서드에서 사용할 수 있다
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  }, // 다음과 같이 선언한후 store가 slice를 인식하게 해야함
});

// redux 사용법

const connectReducer = (state = initialState, action) => {
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

  reducer: counterSlice.reducer,
});
// configureStore에서 요구되는 설정 객체에서 리듀서 프로퍼티를 정함

//액션 개체 내보내기
export const counterActions = counterSlice.actions;
export default store;
