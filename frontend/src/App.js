import React from "react";
import NavBar from "./components/NavBar/NavBar";
import SubNavbar from "./components/SubNavbar/SubNavbar";
import MainCard from "./components/MainCard/MainCard";
import { ToastContainer } from "react-toastify";
import "./App.scss";

const App = () => {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <main className="main container">
        <SubNavbar />
        <MainCard />
        <div className="footer-style"></div>
      </main>
    </>
  );
};

export default App;
