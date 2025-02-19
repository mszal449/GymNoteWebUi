import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OAuthCallback } from "./providers/OAuthCallback";
import PrivateRoute from "./components/PrivateRoute";
import Success from "./Success";
import Dashboard from "./dashboard/Dashboard";
import Home from "./Home";
import { LightTheme } from "./themes/colorTheme";
import { mantineCssVariableResolver } from "./themes/varResolver";
import { AuthProvider } from "./providers/AuthProvider";

export default function App() {
  return (
  <MantineProvider theme={LightTheme}  cssVariablesResolver={mantineCssVariableResolver}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/oauth2/callback" element={<OAuthCallback />} />
          <Route path="/success" element={<PrivateRoute element={<Success/>}/>  } />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>  } />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </MantineProvider>
  );
}
