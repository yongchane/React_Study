const redux = require("redux"); // 서드파티 패키지를 import하기 위한 기본 노드 js import구문 -> 리덕스 패키지로부터 리덕스를 import

const counterReduer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
}; // 현재 state와 action을 받음
// 저장소의 상태 변환을 위한 리듀서 함수 생성 리덕스 라이브러리에 의해서 생성된것이고 항상 두개의 입력(2개의 파라미터를 받을 것이다)
// -> 기존상태,발송된 액션, 그리고 항상 새로운 상태 객체를 리턴할 것이다
// 순수한 입력에 대한 순수한 출력이 있어야하니 HTTP요청, 로컬 저장소에 저장되거나 같은 기능은 ㄴㄴ

// 리듀서 내부에 다른action을 사용하여 다른 일을 하는게 목표, 현재상태를 받고 디스패치돈 액션을 받으면 그게 리듀서 돌아가게함

const store = redux.createStore(counterReduer); // 리덕스 라이브러리에서 온거고 리덕스 저장소를 형성
//counterReducer을 넣어야 하는 이유는 어떤리듀서가 그 저장소를 변경하는지 저장소가 알아야하기 때문 즉, 저장소는 리듀서 함수가 어떤 함수 인지 알아야함

//리듀서와 저장소를 만들었으니 해당 저장소를 구독할 컴포넌트와 액션이 필요

const counterSubscribeer = () => {
  // 구독함수는 상태가 변경될때 마다 곧 트리거가 될것이다 트리거가 되면 getState 매소드로 변경된 후의 최신상태를 받을 수 있다
  const latestState = store.getState(); // getState()는 createStore()로 생성된 저장소에서 사용할 수 있는 매소드,그리고 업데이트된 최신 상태의 스냅샷을 제공
  console.log(latestState);
};

// 리덕스가 counterSubscribeer의 구독함수를 인식하고 상태가 변경될 때마다 이함수를 실행하라고 명시해야함
store.subscribe(counterSubscribeer); // counterSubscribeer()를 안하는 이유는 실행시키지 않고 가르키기만 하기 위해서

store.dispatch({ type: "increment" }); //dispatch는 액션을 발송하는 매소드,액선은 자바스크립드 object,다음과 같은 type액션은 쓸모가 없음
store.dispatch({ type: "decrement" });
