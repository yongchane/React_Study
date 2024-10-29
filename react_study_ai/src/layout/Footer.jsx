import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as Edit } from "../assets/footer/footeredit.svg";
import { ReactComponent as ActiveEdit } from "../assets/footer/ActiveEdit.svg";
import { ReactComponent as ActiveUp } from "../assets/footer/Activetrendingup.svg";
import { ReactComponent as Up } from "../assets/footer/trendingup.svg";
import { ReactComponent as Union } from "../assets/footer/Union.svg";
import { ReactComponent as ActiveUnion } from "../assets/footer/ActiveUnion.svg";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const selectedSection = useSelector(
    (state) => state.selectedSection.selectedSection
  );

  // 클릭된 항목의 상태를 관리하는 state 추가
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {}, [selectedSection]);

  return (
    <div className="footer-container">
      {selectedSection === "view1" ? (
        <div className="footer-item-container">
          <div
            className={`footer-item footer-item-left ${
              activeItem === "home" ? "active" : ""
            }`}
            onClick={() => {
              setActiveItem("home");
              navigate("/main");
            }}
          >
            {path === "/main" ? <ActiveUnion /> : <Union />}
            물기도문
          </div>
          <div
            className={`footer-item ${activeItem === "record" ? "active" : ""}`}
            onClick={() => {
              setActiveItem("record");
              navigate("/record");
            }}
          >
            {path === "/record" || path === "/drinkrecord" ? (
              <ActiveEdit />
            ) : (
              <Edit />
            )}
            세례기록
          </div>

          <div
            className={`footer-item footer-item-right ${
              activeItem === "statistic" ? "active" : ""
            }`}
            onClick={() => {
              setActiveItem("statistic");
              navigate("/statistic");
            }}
          >
            {path === "/statistic" || path === "/week" ? <ActiveUp /> : <Up />}
            통계
          </div>
        </div>
      ) : (
        <div className="footer-routine-view-container">
          <button className="footer-routine-view-button">목표 만들기</button>
        </div>
      )}
    </div>
  );
};

export default Footer;
