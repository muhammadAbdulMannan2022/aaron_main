import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

let navigateFn;
export const setNavigate = (fn) => {
  navigateFn = fn;
};
export const navigate = (...args) => navigateFn(...args);
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]); // runs whenever path changes

  return (
    <div>
      <Outlet />
    </div>
  );
}
