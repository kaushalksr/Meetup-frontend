import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
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
      const searchText = searchByTitle.toLocaleLowerCase();

      const filtered = data?.filter((event) => {
        const matchTitle = event.eventTitle?.toLowerCase().includes(searchText);
        const matchTag = event.eventTags?.some((tag) =>
          tag.toLowerCase().includes(searchText)
        );

        return matchTag || matchTitle;
      });
      setSelectedEvent(filtered);
    }
  }, [searchByTitle, data]);

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
        {" "}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link className="nav-link" to="/">
              <img
                src="https://t3.ftcdn.net/jpg/02/76/15/74/240_F_276157446_vpzi561T0meuzGokF7QWYM6xGW2ASKQD.jpg"
                alt="Bootstrap"
                width="150"
                height="50"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <form className="d-flex">
                <input
                  onChange={(e) => setSearchByTitle(e.target.value)}
                  type="text"
                  placeholder="Search By Title and Tags"
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
            <div key={event._id} className="col-lg-4 col-md-12 p-2">
              <div
                className="card m-4 mx-auto"
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
                  style={{
                    height: 350,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                />
                <div
                  className="p-2"
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <NavLink
                    className="fs-5 btn"
                    to={`/eventListing/${event._id}`}>
                    <p className="card-text">{event.eventTitle}</p>
                  </NavLink>
                  <p className="card-text">
                    {new Date(event.eventDate).toDateString()}{" "}
                    {parseInt(event.eventFromTime) > 12
                      ? parseInt(event.eventFromTime) -
                        12 +
                        event.eventFromTime.slice(2, 5) +
                        " PM"
                      : event.eventFromTime + " AM"}
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
