import React from "react";
import ReactDOM from "react-dom";
import Main from "./V/main";
import Application from "./V/components/Application";
import "../styles/index.scss";
import "antd/dist/antd.css";

ReactDOM.render(
    <Main>
        <Application/>
    </Main>,
    document.getElementById("root")
);
