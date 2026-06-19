export const ROUTES = {
  AUTH: "/auth",
  DASHBOARD: "/",
  EVENTS: "/events",
  EVENT_DETAILS: "/events/:id",
  CREATE_EVENT: "/create-event",
  TICKETS: "/tickets",
  NOTIFICATIONS: "/notifications",
  ANALYTICS: "/analytics",
  REPORTS: "/reports",
  PROFILE: "/profile",
  EDIT_EVENT: "/edit-event/:id",  
  EVENT_DETAILS: "/events/:id",
};

export const getEventDetailsRoute = (id) => `/events/${id}`;
export const getEditEventRoute = (id) => `/edit-event/${id}`;