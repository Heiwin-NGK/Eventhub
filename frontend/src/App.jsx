import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import MyTickets from "./pages/MyTickets";
import ProtectedRoute from "./routes/ProtectedRoute";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/events"
  element={
    <ProtectedRoute>
      <Events />
    </ProtectedRoute>
  }
/>

        <Route
  path="/tickets"
  element={
    <ProtectedRoute>
      <MyTickets />
    </ProtectedRoute>
  }
/>

        <Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        

      </Routes>

    </BrowserRouter>
  );
}

export default App;