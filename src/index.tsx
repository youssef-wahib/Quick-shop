import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
