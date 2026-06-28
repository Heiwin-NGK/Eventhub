import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Auth from "./pages/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import { ROLES } from "./constants/roles";
import { ROUTES } from "./constants/routes";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Events = lazy(() => import("./pages/Events"));
const MyTickets = lazy(() => import("./pages/MyTickets"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Analytics = lazy(() => import("./pages/Analytics"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const Reports = lazy(() => import("./pages/Reports"));
const Profile = lazy(() => import("./pages/Profile"));
const EditEvent = lazy(() => import("./pages/EditEvent"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const EventAttendees = lazy(() => import("./pages/EventAttendees"));
const TicketDetails = lazy(() => import("./pages/TicketDetails"));
const ScanTicket = lazy(() => import("./pages/ScanTicket"));
const CheckInHistory = lazy(() => import("./pages/CheckInHistory"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
                <EventDetails />
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
                <RoleRoute roles={[ROLES.ADMIN, ROLES.ORGANIZER]}>
                  <Analytics />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.CREATE_EVENT}
            element={
              <ProtectedRoute>
                <RoleRoute roles={[ROLES.ADMIN, ROLES.ORGANIZER]}>
                  <CreateEvent />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.REPORTS}
            element={
              <ProtectedRoute>
                <RoleRoute roles={[ROLES.ADMIN, ROLES.ORGANIZER]}>
                  <Reports />
                </RoleRoute>
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
            path={ROUTES.SCAN_TICKET}
            element={
              <ProtectedRoute>
                <RoleRoute roles={[ROLES.ADMIN, ROLES.ORGANIZER]}>
                  <ScanTicket />
                </RoleRoute>
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
                <RoleRoute roles={[ROLES.ADMIN, ROLES.ORGANIZER]}>
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

          <Route
            path={ROUTES.CHECKIN_HISTORY}
            element={
              <ProtectedRoute>
                <CheckInHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;