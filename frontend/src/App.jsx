import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import MyTickets from "./pages/MyTickets";
import ProtectedRoute from "./routes/ProtectedRoute";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import CreateEvent from "./pages/CreateEvent";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <BrowserRouter>

      <Routes>
<Route path="/auth" element={<Auth />} />
<Route path="/register" element={<Auth />} />

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
  path="/create-event"
  element={
    <ProtectedRoute>
      <CreateEvent />
    </ProtectedRoute>
  }
/>

        <Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
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

        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;