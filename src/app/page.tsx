'use client'

import { useEffect, useState } from "react";
import Dashboard from "./dashboard/page";
import Login from "./login/page";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  )
}
