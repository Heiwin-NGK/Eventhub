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
import { ROLES } from "./constants/roles";
import { ROUTES } from "./constants/routes";
import RoleRoute from "./routes/RoleRoute";
import EventDetails from "./pages/EventDetails";
import EventAttendees from "./pages/EventAttendees";
import TicketDetails from "./pages/TicketDetails";

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
path={ROUTES.EVENT_DETAILS}
element={
<ProtectedRoute>
<EventDetails/>
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
      <RoleRoute
        roles={[
          ROLES.ADMIN,
          ROLES.ORGANIZER,
        ]}
      ><Analytics /></RoleRoute>
    </ProtectedRoute>
  }
/>
        
        <Route
  path={ROUTES.CREATE_EVENT}
  element={
    <ProtectedRoute>
      <RoleRoute
        roles={[
          ROLES.ADMIN,
          ROLES.ORGANIZER,
        ]}
      ><CreateEvent /></RoleRoute>
    </ProtectedRoute>
  }
/>

        <Route
  path={ROUTES.REPORTS}
  element={
    <ProtectedRoute>
      <RoleRoute
        roles={[
          ROLES.ADMIN,
          ROLES.ORGANIZER,
        ]}
      ><Reports /></RoleRoute>
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
  path={ROUTES.EDIT_EVENT}
  element={
    <ProtectedRoute>
      <RoleRoute roles={[ROLES.ADMIN, ROLES.ORGANIZER]}>
        <EditEvent />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

<Route
  path={ROUTES.ATTENDEES}
  element={
    <ProtectedRoute>
      <RoleRoute
        roles={[
          ROLES.ADMIN,
          ROLES.ORGANIZER,
        ]}
      >
        <EventAttendees />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

<Route
  path={ROUTES.TICKET_DETAILS}
  element={
    <ProtectedRoute>
      <TicketDetails />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;