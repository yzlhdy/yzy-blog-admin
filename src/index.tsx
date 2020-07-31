import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

import { SnackbarProvider } from 'notistack'

ReactDOM.render(
    <SnackbarProvider><App /></SnackbarProvider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
