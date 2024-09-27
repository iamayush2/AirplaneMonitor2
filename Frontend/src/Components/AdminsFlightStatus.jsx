import React from "react";

const AdminsFlightStatus = ({ userSpeechData }) => {
  return (
    <div className="mx-auto flex flex-col w-[90%] h-[30%] px-8 text-xl  gap-7  shadow-glow rounded-2xl p-5">
      <h1 className="text-3xl font-bold">Flight Details</h1>
      <div className="flex flex-wrap gap-8 ml-5 w-[98%]">
        <p>
          <strong>✈️ Flight Number:</strong> AI-302
        </p>
        <p>
          <strong>🛫 Airline Name:</strong> Air India
        </p>
        <p>
          <strong>🌍 Departure City / Airport:</strong> New Delhi, Indira Gandhi
          International Airport (DEL)
        </p>
        <p>
          <strong>🌍 Destination City / Airport:</strong> New York, John F.
          Kennedy International Airport (JFK)
        </p>
        <p>
          <strong>🕰️ Scheduled Departure Time:</strong> 10:30 AM (IST)
        </p>
        <p>
          <strong>🕰️ Scheduled Arrival Time:</strong> 2:00 PM (EST)
        </p>
        <p>
          <strong>🚪 Gate Number:</strong> A12
        </p>
        <p>
          <strong>🏢 Terminal:</strong> Terminal 3
        </p>
        <p>
          <strong>📶 Flight Status:</strong> On Time
        </p>
        <p>
          <strong>🛬 Current Flight Status:</strong> In Air
        </p>
        <p className="text-blue-900 font-bold">
          <strong>🖥️ Monitor Status:</strong>{" "}
          {userSpeechData.length === 0 ? "OFF" : "ON"}
        </p>
      </div>
    </div>
  );
};

export default AdminsFlightStatus;
