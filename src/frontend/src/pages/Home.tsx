import Hero from "../components/Hero";
import UnivSection from "../components/UnivSection";
import React, { useState, useEffect } from "react";



import { login, logout as destroy, isAuthenticated, getPrincipalText } from "../auth/auth"
const Home = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus as boolean);
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchPrincipal = async () => {
      const principal = await getPrincipalText();
      setPrincipal(principal);
    };
    fetchPrincipal();
  }, []);

   

  return (
    <main className="min-h-screen">
      {authenticated ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Welcome, {principal}!</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={destroy}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={login}
          >
            Login
          </button>
        </div>
      )}
      {authenticated && (
        <>
          <Hero />
          <UnivSection />
        </>
      )}

    </main>
  );
};

export default Home;
