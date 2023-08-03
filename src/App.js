// App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Detail from "./pages/Detail";
import Main from "./pages/Main";
function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
