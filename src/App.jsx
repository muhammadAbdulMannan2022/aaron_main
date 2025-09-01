import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]); // runs whenever path changes

  return (
    <div>
      <Outlet />
    </div>
  );
}
