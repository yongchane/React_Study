import React from "react";
import { useNavigate } from "react-router-dom";
import Graph from "./Graph";

const Week = () => {
  const navigate = useNavigate();
  return (
    <div className="stc-container">
      {/* <Header /> */}
      <div className="stc-header-container">
        <div className="stc-header">
          <div
            className="stc-header-m-m"
            onClick={() => {
              navigate("/statistic");
            }}
          >
            일
          </div>
          <div
            className="stc-header-w-w"
            onClick={() => {
              navigate("/week");
            }}
          >
            주
          </div>
        </div>
      </div>
      <div className="stc-main-container">
        <Graph
          title="이번주 받은 물세례💧"
          comment="구원에 가까워지고 있어요!"
        />
      </div>
      <div className="stc-main-container">
        {/* <Graph
          title="주간 카페인 섭취량☕️"
          comment="카페인 섭취량이 증가했어요!"
        /> */}
        <div className="stc-main-water">
          {/* 현재 경로가 /statistic인지 확인 */}

          <div className="sta-none"></div>

          <div className="stc-main-water-sub-content">
            <div className="stc-main-water-sub-title">
              주간 카페인 섭취량☕️
            </div>

            <div className="stc-main-water-sub-comment">
              카페인 섭취량이 증가했어요!
            </div>
          </div>
          <div className="stc-main-show-graph-container">
            <div className="stc-main-show-graph-ml-container">
              <div className="stc-main-show-graph-ml">
                <div className="stc-ml">2L</div>
                <div className="stc-grahp-line"></div>
              </div>
              <div className="stc-main-show-graph-ml">
                <div className="stc-ml">1,500</div>
                <div className="stc-grahp-line"></div>
              </div>
              <div className="stc-main-show-graph-ml">
                <div className="stc-ml">1000</div>
                <div className="stc-grahp-line"></div>
              </div>
              <div className="stc-main-show-graph-ml">
                <div className="stc-ml">500</div>
                <div className="stc-grahp-line"></div>
              </div>
            </div>
          </div>

          <div className="stc-main-show-graphs">
            <div className="stc-main-show-graph-time">
              <div className="cverticall"></div>월
            </div>
            <div className="stc-main-show-graph-time">
              <div className="cvertical"></div>화
            </div>
            <div className="stc-main-show-graph-time">
              <div className="cverticall"></div>수
            </div>
            <div className="stc-main-show-graph-time">
              <div className="cverticall"></div>묵
            </div>
            <div className="stc-main-show-graph-time">
              <div className="cvertical"></div>금
            </div>
            <div className="stc-main-show-graph-time">
              <div className="cverticall"></div>토
            </div>
            <div className="stc-main-show-graph-time">
              <div className="cverticall"></div>일
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week;
