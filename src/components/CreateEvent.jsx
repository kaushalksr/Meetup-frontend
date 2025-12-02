import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateEvent = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDate: "",
    eventTime: "",
    eventType: "",
    eventImage: "",
    hostedBy: "",
    eventDescription: "",
    eventDressCode: "",
    eventAge: "",
    eventTags: [],
    speakerName: "",
    speakerImageUrl: "",
    speakerDesignation: "",
    eventPricing: "",
    eventAddress: "",
  });

  const handleChange = (e) => {
    const { value, name, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleTags = (e) => {
    const { value, name } = e.target;
    name === "eventTag" ? formData.eventTags.push(value) : "ERROR IN EVENT TAG";
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://meetup-five-khaki.vercel.app/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (!response.ok) {
        throw "Failed to add event!";
      } else {
        setMessage("Event added sucessfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-5">
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
      <main className="container">
        <h1>Create New Event</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label className="form-label" htmlFor="eventTitle">
                Event Title:{" "}
              </label>
              <input
                onChange={handleChange}
                value={formData.eventTitle}
                className="form-control"
                type="text"
                placeholder="Title of the event"
                name="eventTitle"
              />
              <br />
              <label className="form-label" htmlFor="eventDate">
                Event Date:
              </label>
              <input
                onChange={handleChange}
                value={formData.eventDate}
                className="form-control"
                type="date"
                name="eventDate"
              />
              <br />
              <label className="form-label" htmlFor="eventTime">
                Event Time:
              </label>
              <input
                onChange={handleChange}
                type="time"
                value={formData.eventTime}
                name="eventTime"
                className="form-control"
              />
              <br />
              <label htmlFor="eventType" className="form-label">
                Event Type:
              </label>
              <select
                onChange={handleChange}
                name="eventType"
                value={formData.eventType}
                className="form-control">
                <option value="Both">-- Select --</option>
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
              </select>
              <br />
              <label htmlFor="eventImage" className="form-label">
                Event Image
              </label>
              <input
                onChange={handleChange}
                value={formData.eventImage}
                type="text"
                placeholder="Image Url Of Event"
                className="form-control"
                name="eventImage"
              />
              <br />
              <label htmlFor="hostedBy" className="form-label">
                Hosted By:
              </label>
              <input
                onChange={handleChange}
                value={formData.hostedBy}
                type="text"
                placeholder="Host Of the event"
                className="form-control"
                name="hostedBy"
              />
              <br />
              <label htmlFor="eventDescription" className="form-label">
                Event Description:
              </label>
              <input
                onChange={handleChange}
                value={formData.eventDescription}
                placeholder="Details about the event"
                type="text"
                className="form-control"
                name="eventDescription"
              />
              <br />
              <label htmlFor="eventDressCode" className="form-label">
                Event Dress Code:
              </label>
              <input
                onChange={handleChange}
                value={formData.eventDressCode}
                type="text"
                placeholder="Dress for event (if any)"
                name="eventDressCode"
                className="form-control"
              />
              <br />
            </div>
            <div className="col-lg-6">
              <label htmlFor="eventAge" className="form-label">
                Event Age:{" "}
              </label>
              <input
                onChange={handleChange}
                value={formData.eventAge}
                type="number"
                placeholder="Age limit for event"
                name="eventAge"
                className="form-control"
              />
              <br />
              <label htmlFor="eventTag" className="form-label">
                Event Tags:
              </label>{" "}
              <br />
              <label>
                <input
                  type="checkbox"
                  name="eventTag"
                  onChange={handleTags}
                  value="Marketing"
                />
                Marketing
              </label>{" "}
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={handleTags}
                  name="eventTag"
                  value="Digital"
                />
                Digital
              </label>{" "}
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={handleTags}
                  name="eventTag"
                  value="Research"
                />
                Research
              </label>{" "}
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={handleTags}
                  name="eventTag"
                  value="Technology"
                />
                Technology
              </label>{" "}
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={handleTags}
                  name="eventTag"
                  value="Education"
                />
                Education
              </label>{" "}
              <br />
              <label>
                <input
                  type="checkbox"
                  onChange={handleTags}
                  name="eventTag"
                  value="Health"
                />
                Health
              </label>{" "}
              <br />
              <br />
              <label htmlFor="speakerName" className="form-label">
                Speaker Name :
              </label>
              <input
                onChange={handleChange}
                value={formData.speakerName}
                type="text"
                name="speakerName"
                placeholder="Speaker Name"
                className="form-control"
              />
              <br />
              <label htmlFor="speakerImageUrl" className="form-label">
                Speaker Image Url :
              </label>
              <input
                onChange={handleChange}
                value={formData.speakerImageUrl}
                type="text"
                name="speakerImageUrl"
                placeholder="Speaker Image Url"
                className="form-control"
              />
              <br />
              <label htmlFor="speakerDesignation" className="form-label">
                Speaker Designation:
              </label>
              <input
                onChange={handleChange}
                value={formData.speakerDesignation}
                type="text"
                name="speakerDesignation"
                placeholder="Speaker Designation"
                className="form-control"
              />
              <br />
              <label htmlFor="eventPricing" className="form-label">
                Event Pricing:
              </label>
              <input
                onChange={handleChange}
                value={formData.eventPricing}
                type="number"
                placeholder="Price for event"
                name="eventPricing"
                className="form-control"
              />
              <br />
              <label htmlFor="eventAddress" className="form-label">
                Event Address:
              </label>
              <input
                onChange={handleChange}
                value={formData.eventAddress}
                type="text"
                placeholder="Address of event"
                name="eventAddress"
                className="form-control"
              />
              <br />
            </div>
          </div>

          <button
            style={{ textAlign: "center" }}
            className="btn btn-primary d-grid gap-2 col-6 mx-auto"
            type="submit">
            Add Event
          </button>
          <span
            style={{
              color: "green",
              textAlign: "center",
              justifyContent: "center",
            }}>
            {"   "}
            {message}
          </span>
        </form>
      </main>
    </div>
  );
};

export default CreateEvent;
