import {BrowserRouter,Routes,Route,} from "react-router-dom";
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
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>

      <Routes>
<Route path={ROUTES.AUTH} element={<Auth />} />

        <Route
  path={ROUTES.EVENTS}
  element={
    <ProtectedRoute>
      <Events />
    </ProtectedRoute>
  }
/>

        <Route
  path={ROUTES.TICKETS}
  element={
    <ProtectedRoute>
      <MyTickets />
    </ProtectedRoute>
  }
/>

        <Route
  path={ROUTES.NOTIFICATIONS}
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path={ROUTES.ANALYTICS}
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
        
        <Route
  path={ROUTES.CREATE_EVENT}
  element={
    <ProtectedRoute>
      <CreateEvent />
    </ProtectedRoute>
  }
/>

        <Route
  path={ROUTES.REPORTS}
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
        <Route
  path={ROUTES.PROFILE}
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
          path={ROUTES.DASHBOARD}
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