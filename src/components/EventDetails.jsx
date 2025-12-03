import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";

const EventDetails = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-five-khaki.vercel.app/events"
  );
  const { eventId } = useParams();

  const selectedEvent = data?.find((event) => event._id == eventId);

  const fromTime = data?.eventFromTime;
  console.log(fromTime);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <main className="mb-5">
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
              {/* ---- header end ------- */}
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
          <div className="col-lg-6">
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
              style={{ width: 500, height: 300 }}
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
              <span className="fs-4"> {selectedEvent?.eventAge}</span>
            </div>
            <p className="fs-4 fw-bolder">Event Tags:</p>
            {selectedEvent?.eventTags.map((tag) => (
              <button className="btn btn-danger me-2">{tag}</button>
            ))}
          </div>
          <div className="col-lg-6 mb-3">
            <div className="card mt-3 p-3">
              <div className="card-body">
                <p className="card-text">
                  <img
                    src="https://static.thenounproject.com/png/1495285-200.png"
                    alt="Clock Logo"
                    style={{ width: 15, height: 15 }}
                  />{" "}
                  <span>
                    {" "}
                    {parseInt(selectedEvent?.eventFromTime) > 12
                      ? parseInt(selectedEvent?.eventFromTime) -
                        12 +
                        selectedEvent.eventFromTime.slice(2, 5) +
                        "  PM"
                      : selectedEvent?.eventFromTime + "  AM"}{" "}
                  </span>
                </p>
                <p className="card-text">
                  <img
                    style={{ width: 20, height: 20 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavj9_Ks_pfBuHO-3VMC8kxky4mR6ntn-iCg&s"
                    alt="Location Logo"
                  />{" "}
                  <span>{selectedEvent?.eventAddress}</span>
                </p>
                <p className="card-text">
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
                  <p className="card-text">
                    <p className="fw-bolder">{selectedEvent?.speakerName}</p>
                    <p>{selectedEvent?.speakerDesignation}</p>
                  </p>
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
