import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routing />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
