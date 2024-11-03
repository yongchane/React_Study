import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
//redux에서 사용하는 커스텀 훅, useStore 훅을 통해서도 저장소에 직접 액세스 할 수 있다
//useSelector 사용하는 이유: 저장소가 관리하는 상태 부분을 우리가 자동으로 선택할 수 있다
// connect: 우리의 클래스 컴포넌트를 감싸는 래퍼로 사용해서 그 클래스 컴포넌트를 저장소에 연결 가능
// action을 보내기 위한 임포트 ->useDispatch

const Counter = () => {
  const dispatch = useDispatch(); // 리덕스 저장소에 대한 action을 보냄

  const counter = useSelector((state) => state.counter); // 저장소에서 데이터를 받음
  // useSelector안에 redux가 실행할 함수 넣어주기 그리고 해당 함수는 redux가 실행할거고 우리가 저장소에서 추출하려는 데이터 부분을 결정
  // 리덕스 내의 state
  // 리덕스 내부의 state 가 변경될때마다 해당 값을 컴포넌트가 가지게 된다. 즉 리덕스 내부 state가 변경되면 해당 컴포넌트는 재렌더링 됨

  const incrementHandlre = () => {
    dispatch({ type: "increment" });
  };
  const decrementHandlre = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandlre}>increment</button>
        <button onClick={decrementHandlre}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;