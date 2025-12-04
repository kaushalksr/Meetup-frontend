import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import useFetch from "../useFetch";

const EventDetails = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-five-khaki.vercel.app/events"
  );
  const { eventId } = useParams();

  const selectedEvent = data?.find((event) => event._id == eventId);

  const date = selectedEvent?.eventDate.slice(0, 10);

  const weekDay = new Date(date)?.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const month = new Date(date).toLocaleDateString("en-US", {
    month: "short",
  });

  const day = new Date(date).getDay();
  const year = new Date(date).getFullYear();

  const dateOfEvent = weekDay + " " + month + " " + day + ", " + year + " ";

  const fromTime =
    parseInt(selectedEvent?.eventFromTime) > 12
      ? parseInt(selectedEvent?.eventFromTime) -
        12 +
        selectedEvent.eventFromTime.slice(2, 5) +
        "  PM"
      : selectedEvent?.eventFromTime + "  AM";
  const toTime =
    parseInt(selectedEvent?.eventToTime) > 12
      ? parseInt(selectedEvent?.eventToTime) -
        12 +
        selectedEvent.eventToTime.slice(2, 5) +
        "  PM"
      : selectedEvent?.eventToTime + "  AM";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <main className="mb-5">
      {/* // ------------- header start  ------ */}

      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container">
            <Link className="nav-link" to="/">
              <img
                src="https://t3.ftcdn.net/jpg/02/76/15/74/240_F_276157446_vpzi561T0meuzGokF7QWYM6xGW2ASKQD.jpg"
                alt="Bootstrap"
                width="150"
                height="50"
              />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link className="nav-link fs-3" to="/createEvents">
                    Create Event
                  </Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link fs-3" to="/eventListing">
                    Event Listing
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  onChange={(e) => setSearchByTitle(e.target.value)}
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
        <div className="row mt-4">
          <div className="col-lg-6 col-md-12">
            <p className="fs-1 fw-bolder">{selectedEvent?.eventTitle}</p>
            <div>
              <p className="fw-bolder fs-3">
                Hosted By:{" "}
                <span className="fs-3 fw-semibold">
                  {selectedEvent?.hostedBy}
                </span>
              </p>
            </div>

            
              <img
                className="img-fluid w-100"
                style={{ height: 300, objectFit: "cover" }}
                src={`${selectedEvent?.eventImage}`}
                alt="Event Image"
              />
            

            <p className="fs-3 fw-bolder">Details:</p>
            <p className="fs-4">{selectedEvent?.eventDescription}</p>
            <p className="fs-3 fw-bolder">Additional Information:</p>
            <div>
              <span className="fs-4 fw-bolder">Dress Code: </span>
              <span className="fs-4">{selectedEvent?.eventDressCode}</span>
            </div>

            <div>
              <span className="fs-4 fw-bolder">Age Restrictions: </span>
              <span className="fs-4"> {selectedEvent?.eventAge} and above</span>
            </div>
            <p className="fs-4 fw-bolder">Event Tags:</p>
            {selectedEvent?.eventTags.map((tag) => (
              <button className="btn btn-danger me-2">{tag}</button>
            ))}
          </div>
          <div className="col-lg-6 col-md-12 mb-3">
            <div className="card mt-3 p-3">
              <div className="card-body">
                <p className="card-text py-2">
                  <img
                    src="https://static.thenounproject.com/png/1495285-200.png"
                    alt="Clock Logo"
                    style={{ width: 15, height: 15 }}
                  />{" "}
                  <span>
                    {" "}
                    {dateOfEvent} at {fromTime} to {dateOfEvent}
                    at {toTime}{" "}
                  </span>
                </p>
                <p className="card-text py-2">
                  <img
                    style={{ width: 20, height: 20 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavj9_Ks_pfBuHO-3VMC8kxky4mR6ntn-iCg&s"
                    alt="Location Logo"
                  />{" "}
                  <span>{selectedEvent?.eventAddress}</span>
                </p>
                <p className="card-text py-2">
                  <img
                    style={{ width: 20, height: 20 }}
                    src="https://img.freepik.com/premium-vector/currency-symbol-icon_97886-21938.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Location Logo"
                  />{" "}
                  <span>{selectedEvent?.eventPricing}</span>
                </p>
              </div>
            </div>
            <div>
              <p className="fs-2 fw-bolder">Speaker(s):</p>
              <div
                className="card p-2"
                style={{
                  width: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <img
                  src={selectedEvent?.speakerImageUrl}
                  style={{
                    borderRadius: "50%",
                    width: 100,
                    height: 100,
                  }}
                  className="card-img-top"
                  alt="speaker image"
                />
                <div className="card-body">
                  <div className="card-text">
                    <p className="fw-bolder">{selectedEvent?.speakerName}</p>
                    <p>{selectedEvent?.speakerDesignation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
