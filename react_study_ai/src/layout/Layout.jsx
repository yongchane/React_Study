import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  // Footer를 표시하지 않을 경로를 지정

  const hideFooterPaths = ["/login1", "/login2", "/login3", "/login4", "/"];

  // 현재 경로가 hideFooterPaths에 포함되어 있는지 확인
  const showFooter = !hideFooterPaths.includes(path); // showFooter는 path가 hideFooterPaths에 없으면 true

  return (
    <>
      <div className="content-container">
        <Outlet />
      </div>
      {/* showFooter가 true일 때만 Footer 렌더링 */}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
