import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import EventListing from "./components/EventListing.jsx";
import EventDetails from "./components/EventDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateEvent />,
  },
  {
    path: "/createEvents",
    element: <CreateEvent />,
  },
  {
    path: "/eventListing",
    element: <EventListing />,
  },
  {
    path: "/eventListing/:eventId",
    element: <EventDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
