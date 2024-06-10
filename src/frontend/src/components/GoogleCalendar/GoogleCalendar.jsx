import React, { useEffect, useState } from "react";
import "./googlecalendar.css"
import { Link } from "react-router-dom";

export const Calendar = () => {
  const [calendarState, setCalendarState] = useState({
    authenticated: false,
    eventsContent: "",
    summary: "",
    location: "",
    description: "",
    start: "",
    end: "",
    attendees: [],
    attendeeEmail: "",
    timeZone: "UTC",
  });

  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = "488476833453-72hhlp92tt0etkav7jaihofb2g4dgnii.apps.googleusercontent.com";
  const API_KEY = "AIzaSyB_hASYeGvCSbp7TgC-X1yvccpxW_Dglj4";
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  let gapiInited = false, 
  gisInited = false,
  tokenClient;

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, []);

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;

    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: expiresIn,
      });
      setCalendarState(prevState => ({ ...prevState, authenticated: true }));
      listUpcomingEvents();
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "", 
    });

    gisInited = true;
  }

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        throw resp;
      }
      await listUpcomingEvents();
      const { access_token, expires_in } = gapi.client.getToken();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
      setCalendarState(prevState => ({ ...prevState, authenticated: true }));
    };

    if (!(accessToken && expiresIn)) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
      localStorage.clear();
      setCalendarState(prevState => ({ ...prevState, authenticated: false, eventsContent: "" }));
    }
  }

  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      document.getElementById("content").innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length === 0) {
      setCalendarState(prevState => ({ ...prevState, eventsContent: "No events found." }));
      return;
    }
    const output = events.reduce(
      (str, event) =>
        `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      "Events:\n\n"
    );
    setCalendarState(prevState => ({ ...prevState, eventsContent: output }));
  }

  function addManualEvent() {
    const { summary, location, description, start, end, timeZone, attendeeEmail } = calendarState;

    if(!summary || !location || !description || !start || !end || !timeZone)
      {
        alert("please fill complete details");
        return;
      }
    const startUTC = new Date(start).toISOString();
    const endUTC = new Date(end).toISOString();


    const evented = {
      kind: "calendar#event",
      summary: summary,
      location: location,
      description: description,
      start: {
        dateTime: startUTC,
        timeZone: timeZone,
      },
      end: {
        dateTime: endUTC,
        timeZone: timeZone,
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
      attendees: attendees.map(email => ({ email, responseStatus: "needsAction" })),
      reminders: {
        useDefault: true,
      },
      guestsCanSeeOtherGuests: true,
      conferenceData: {
        createRequest: {
          requestId: "some-random-string",
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    };

 
    // console.log(evented);
    // alert(JSON.stringify(evented));
    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: evented,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    request.execute((event) => {
      if(event && event.htmlLink){
        // alert(JSON.stringify(event.htmlLink));
      window.open(event.htmlLink);
      listUpcomingEvents();}
    },(error) => {
       alert("error");
      console.error(error.message);
      
      });
  }

  const handleAddAttendee = () => {
    if (calendarState.attendeeEmail) {
      setCalendarState(prevState => ({
        ...prevState,
        attendees: [...prevState.attendees, prevState.attendeeEmail],
        attendeeEmail: ""
      }));
    }
  };

  const { authenticated, eventsContent, summary, location, description, start, end, timeZone, attendeeEmail, attendees } = calendarState;

  return (
    <div>
      {!authenticated && (
        <button className="btn btn-primary btn-sm" onClick={handleAuthClick} style={{marginTop:"40vh"}}>
          Authorize Yourself
        </button>
      )}
      {authenticated && (
        <>
          <div className="signout">
              <Link to="/" style={{textDecoration:"none"}}> <button className="btn btn-success w-20"> Home Page</button></Link>
              <button className="btn btn-danger mb-3 w-20 " onClick={handleSignoutClick}>
                Sign Out
              </button>
              
          </div>
          <div className="Form-Event-Container">
          <div className="forms">
            <h3>Events Details:</h3>
           <form>
            <div className="mb-3">
              <label htmlFor="summary" className="form-label">Summary:</label>
              <input
                id="summary"
                className="form-control"
                type="text"
                value={summary}
                onChange={(e) => setCalendarState(prevState => ({ ...prevState, summary: e.target.value }))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location:</label>
              <input
                id="location"
                className="form-control"
                type="text"
                value={location}
                onChange={(e) => setCalendarState(prevState => ({ ...prevState, location: e.target.value }))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <input
                id="description"
                className="form-control"
                type="text"
                value={description}
                onChange={(e) => setCalendarState(prevState => ({ ...prevState, description: e.target.value }))}
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="start" className="form-label">Start:</label>
                <input
                  id="start"
                  className="form-control"
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setCalendarState(prevState => ({ ...prevState, start: e.target.value }))}
                />
              </div>
              <div className="col">
                <label htmlFor="end" className="form-label">End:</label>
                <input
                  id="end"
                  className="form-control"
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setCalendarState(prevState => ({ ...prevState, end: e.target.value }))}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Time Zone:</label>
              <input
                className="form-control"
                type="text"
                value={timeZone}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="attendeeEmail" className="form-label">Attendee Email:</label>
              <div className="input-group ">
                <input
                  id="attendeeEmail"
                  className="form-control"
                  type="email"
                  value={attendeeEmail}
                  onChange={(e) => setCalendarState(prevState => ({ ...prevState, attendeeEmail: e.target.value }))}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleAddAttendee}>Add Attendee</button>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Added Attendees:</label>
              <ul className="list-group">
                {attendees.map((email, index) => (
                  <li key={index} className="list-group-item">{email}</li>
                ))}
              </ul>
            </div>
            <button className="btn btn-success me-2" onClick={addManualEvent}>
              Add Event
            </button>
           </form>
          </div>
          <div className="Events-container" >
            <pre style={{ whiteSpace: "pre-wrap"}}>
              {eventsContent}
            </pre>
          </div>
          </div>
        </>
      )}
    </div>
  );
  
  
  
};

export default Calendar;





