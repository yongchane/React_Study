import { authActions } from "../store/auth";
import classes from "./Auth.module.css";
import { useSelector, useDispatch } from "react-redux";

const Auth = () => {
  const dispath = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault(); // 리액트가 http 요청을 보내지 않도록 함

    // 로그인하는 액션을 다루기 위한 작업

    dispath(authActions.login());
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
