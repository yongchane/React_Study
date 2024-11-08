import { createSlice } from "@reduxjs/toolkit";

// redux-toolkit 사용법

const initialCounterState = { counter: 0, showCounter: true };
// reduxtoolkit 전역상태의 slice를 미리 만들어 놔야함
//서로 직접적인 관계가 아닌 상태가 여러 조각으로 나뉘어 있다고 가정(인증 상태와 카운터 상태 있다고 가정)
// 모든 slice에는 이름이 있어야함 즉 상태마다 식별자가 필요
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState, // 초기 상태를 initialState를 통해 선언해야함
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

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
