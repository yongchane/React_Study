import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="container">
      <div className="title">
        <div className="main-title">GDG_React-Router 수업</div>
        <div className="exam">
          <Link className="ex1" to="/one">
            예시1
          </Link>
          <Link className="ex2" to="/two">
            예시2
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
