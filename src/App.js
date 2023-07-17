import React from "react";
import { Route, Routes } from "react-router-dom";
import AddEvent from "./components/AddEvent";
import Eventstable from "./components/Eventstable";
import { routes } from "./utils/constants";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={routes.ROOT} element={<AddEvent />} />
        <Route path={routes.EDIT_EVENT} element={<AddEvent />} />
        <Route path={routes.EVENTS} element={<Eventstable />} />
        <Route path={"*"} element={<div>Page does not exists</div>} />
      </Routes>
    </div>
  );
};

export default App;
