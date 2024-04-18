import "./App.css";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import SubNavbar from "./components/SubNavbar/SubNavbar";
import MainCard from "./components/MainCard";
import Test from "./components/Test/test";

const App = () => {
  return (
    <>
      <body>
        <main className="container">
          <NavBar />
          <SubNavbar />
          {/* <MainCard /> */}
          <div className="footer-style"></div>
        </main>
      </body>
    </>
  );
};

export default App;
