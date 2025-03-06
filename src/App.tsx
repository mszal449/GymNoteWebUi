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
import './index.css'
import { Notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import TemplatePage from "./template/TemplatePage";
import WorkoutPage from "./workout/WorkoutPage";

export default function App() {
  return (
  <MantineProvider theme={LightTheme}  cssVariablesResolver={mantineCssVariableResolver}>
    <Notifications position="top-right" zIndex={1000} />
      <AuthProvider>
        <BrowserRouter>
            <Routes>
            <Route path="/oauth2/callback" element={<OAuthCallback />} />
            <Route path="/success" element={<PrivateRoute element={<Success/>}/>  } />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>  } />
            <Route path="/template/:id" element={<PrivateRoute element={<TemplatePage/>}/>  } />
            <Route path="/workouts/:id" element={<PrivateRoute element={<WorkoutPage/>}/>  } />
            <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
  </MantineProvider>
  );
}
