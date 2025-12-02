import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import CreateEvent from "./components/CreateEvent";
import EventListng from "./components/EventListing";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <>
      <CreateEvent />
      <EventListng />
    </>
  );
}

export default App;
