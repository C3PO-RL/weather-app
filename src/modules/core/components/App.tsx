import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRoutes from "../routes/AppRoutes";
import theme from "../theme/theme";
import { WeatherDataProvider } from "../context/provider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherDataProvider>
        <AppRoutes />
      </WeatherDataProvider>
    </ThemeProvider>
  );
}

export default App;
