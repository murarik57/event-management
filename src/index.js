import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/event-management">
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#494b4e",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
