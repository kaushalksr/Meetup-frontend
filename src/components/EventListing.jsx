import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const EventListing = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-five-khaki.vercel.app/events"
  );
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState("");

  useEffect(() => {
    if (data) {
      setSelectedEvent(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((event) =>
        event.eventTitle.toLowerCase().includes(searchByTitle.toLowerCase())
      );
      setSelectedEvent(filtered);
    }
  }, [searchByTitle, data]);

  const searchByTitleHandler = (value) => {
    setSearchByTitle(value);
  };

  const eventTypeHandler = (event) => {
    const value = event.target.value;

    const filteredEvent = data.filter((type) => type.eventType === value);

    setSelectedEvent(value === "Both" || value === "" ? data : filteredEvent);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ocurred!!</p>;
  return (
    <div>
      {/* // ------------- header start  ------ */}

      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="container-fluid">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      <img
                        src="https://t3.ftcdn.net/jpg/02/76/15/74/240_F_276157446_vpzi561T0meuzGokF7QWYM6xGW2ASKQD.jpg"
                        alt="Bootstrap"
                        width="150"
                        height="50"
                      />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-3" to="/createEvents">
                      Create Event
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-3" to="/eventListing">
                      Event Listing
                    </Link>
                  </li>
                </ul>
              </div>
              {/* ----------- */}
              <form className="d-flex">
                <input
                  onChange={(e) => searchByTitleHandler(e.target.value)}
                  type="text"
                  placeholder="Search By Title"
                  role="search"
                  className="form-control"
                />
              </form>
            </div>
          </div>
        </nav>
      </div>

      {/* // ------------- header end  ------ */}
      <div className="container">
        <nav className="navbar">
          <div className="container-fluid">
            <p className="fs-1">Meetup Events</p>
            <form className="d-flex">
              <select className="form-control" onChange={eventTypeHandler}>
                <option value="">-- Select Event --</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </form>
          </div>
        </nav>

        <div className="row mt-5">
          {selectedEvent?.map((event) => (
            <div key={event._id} className="col-lg-4">
              <div
                className="card m-4"
                style={{ width: 350, height: 350, border: 0 }}>
                <span
                  className="btn btn-light btn-sm"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    color: "black",
                  }}>
                  {event.eventType} Event
                </span>
                <img
                  src={event.eventImage}
                  className="card-img-top"
                  alt="Event Image"
                  style={{ height: 350 }}
                />
                <div className="p-2" style={{textAlign:"center",justifyContent:"center",alignItems:"center"}}>
                  <NavLink
                    className="fs-5 btn"
                    to={`/eventListing/${event._id}`}>
                    <p className="card-text">{event.eventTitle}</p>
                  </NavLink>
                  <p className="card-text">
                    {event.eventDate.slice(0, 10)} ,{" "}
                    {parseInt(event.eventTime.slice(0, 2)) > 12
                      ? parseInt(event.eventTime.slice(0, 2)) -
                        12 +
                        ":" +
                        event.eventTime.slice(3, 6) +
                        " PM"
                      : event.eventTime + " AM"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListing;
