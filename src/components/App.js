import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [location,setLocation] = useState("");
  const [description,setDescription] = useState("");
  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "273036014308-bo837bnbh5dks6j4fnm6j06i17980f7d.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAKbUk4-JkMEuWdwR5EtGO_wm4i8dRdPok";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const onTimeChange = (e) => {
    setTime(e.target.value);
  };

  const newLocationChange = (e)=>{
     setLocation(e.target.value)
  }
  const newDescriptionChange = (e)=>{
    setDescription(e.target.value)
  }

  const handleClick = () => {

    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("hello!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: "Meeting",
            location: `${location}`,
            description: `${description}`,
            start: {
              dateTime: `${startDate.getFullYear()}-${
                startDate.getMonth() + 1
              }-${startDate.getDate()}T${time}:00-05:30`,
              timeZone: "Asia/Kolkata",
            },
            end: {
              dateTime: `${startDate.getFullYear()}-${
                startDate.getMonth() + 1
              }-${startDate.getDate()}T${time}:00-05:30`,
              timeZone: "Asia/Kolkata",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
            
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });

          /*
            Uncomment the following block to get events
        */
          /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
        });
    });
  };

  return (
    <div className="App">
      <div className="App-header container">
        <h1 className="my-2">Meeting Room Booking</h1>
        <hr className="my-2" />
        <select
          onChange={newLocationChange}
          style={{ width: "40%", marginLeft: "350px" }}
          className="form-select form-control form-select-lg mb-3"
          aria-label=".form-select-lg example"

        >
          <option>Open this select menu</option>
          <option value="Training room 1">Training room 1</option>
          <option value="Training room 1">Training room 2</option>
          <option value="Training room 1">Training room 3</option>
        </select>
        
        <input
           placeholder="Enter Your Name"
          className="form-control col-sm my-3"
          style={{ width: "40%", marginLeft: "350px" }}
        />
        
        <input
          onChange={newDescriptionChange}
          placeholder="Enter Meeting Description"
          className="form-control col-sm my-3"
          style={{ width: "40%", marginLeft: "350px" }}
        />
        <label>Select Date</label>
        <DatePicker
          placeholderText="enter date"
          className="form-control my-3"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <h4>Please Select your preferred slot</h4>
        <div className="row" style={{marginLeft:"250px"}}>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`${22 + 1}:00`}
          >
            10:00 AM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`${22 + 1}:30`}
          >
            10:30 AM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value="00:00"
          >
            11:00 AM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value="00:30"
          >
            11:30 AM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${0 + 1}:00`}
          >
            12:00 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${0 + 1}:30`}
          >
            12:30 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${1 + 1}:00`}
          >
            1:00 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${1 + 1}:30`}
          >
            1:30 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${2 + 1}:00`}
          >
            2:00 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${2 + 1}:30`}
          >
            2:30 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${3 + 1}:00`}
          >
            3:00 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${3 + 1}:30`}
          >
            3:30 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${4 + 1}:00`}
          >
            4:00 PM
          </button>
          <button
            onClick={onTimeChange}
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${4 + 1}:00`}
          >
            4:30 PM
          </button>
          <button
            onClick={onTimeChange}
            
            className="btn btn-primary btn-sm col-lg-3 mx-2 my-2"
            value={`0${5 + 1}:00`}
          >
            5:00 PM
          </button>
        </div>

        <button
          className="btn btn-primary btn-sm"
          
          onClick={handleClick}
        >
          Add Event
        </button>
      </div>
    </div>
  );
}

export default App;
