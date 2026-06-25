import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Attendance() {
const [attendance, setAttendance] = useState([]);
const role =
  localStorage.getItem("role");
const [employeeId, setEmployeeId] = useState("");
const [attendanceDate, setAttendanceDate] = useState("");
const [checkIn, setCheckIn] = useState("");
const [checkOut, setCheckOut] = useState("");
const [attendanceStatus, setAttendanceStatus] = useState("");
const [summaryCode, setSummaryCode] = useState("");
const [summary, setSummary] = useState(null);
const [historyCode, setHistoryCode] = useState("");
const [history, setHistory] = useState([]);
const [showAttendanceForm,
setShowAttendanceForm] =
useState(true);


const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 5;
const loggedEmployeeCode =
  localStorage.getItem("employee_code");
useEffect(() => {
fetchAttendance();
}, []);

const fetchAttendance = async () => {
const token = localStorage.getItem("token");

try {
  const response = await axios.get(
    "http://127.0.0.1:5000/attendance",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setAttendance(response.data);
  setCurrentPage(1);

} catch (error) {
  console.error(error);
  alert("Failed to load attendance");
}


};

const handleMarkAttendance = async () => {
const token = localStorage.getItem("token");


try {
  await axios.post(
    "http://127.0.0.1:5000/attendance",
    {
      employee_id: employeeId,
      attendance_date: attendanceDate,
      check_in: checkIn,
      check_out: checkOut,
      attendance_status: attendanceStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Attendance Marked Successfully");

  setEmployeeId("");
  setAttendanceDate("");
  setCheckIn("");
  setCheckOut("");
  setAttendanceStatus("");

  fetchAttendance();

} catch (error) {
  console.error(error);
  alert(
    error.response?.data?.message ||
    "Failed to mark attendance"
  );
}


};

const fetchSummary = async () => {

  const token = localStorage.getItem("token");

  const employeeCode =
    role === "admin"
      ? summaryCode
      : loggedEmployeeCode;

  try {

    const response = await axios.get(
      `http://127.0.0.1:5000/attendance/summary/${employeeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSummary(response.data);

  } catch (error) {

    setSummary(null);

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to load summary"
    );
  }
};
const fetchHistory = async () => {

  const token = localStorage.getItem("token");

  const employeeCode =
    role === "admin"
      ? historyCode
      : loggedEmployeeCode;

  try {

    const response = await axios.get(
      `http://127.0.0.1:5000/attendance/employee/${employeeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHistory(response.data);

  } catch (error) {

    setHistory([]);

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to load history"
    );
  }
};

const lastIndex =
  currentPage * recordsPerPage;

const firstIndex =
  lastIndex - recordsPerPage;

const currentRecords =
  attendance.slice(
    firstIndex,
    lastIndex
  );

const totalPages =
  Math.ceil(
    attendance.length /
    recordsPerPage
  );
return (
<> <Navbar />


  <div
  style={{
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
  }}
>
    <h1
  style={{
    textAlign: "center",
    marginBottom: "30px",
  }}
>
  Attendance Management
</h1>
{
  role === "admin" &&
  !showAttendanceForm && (
    <div
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={() =>
          setShowAttendanceForm(true)
        }
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Mark Attendance
      </button>
    </div>
  )
}
{
  role === "admin" && (
    <>
      {showAttendanceForm && (
        <div
          style={{
            width: "550px",
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#dbeafe",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Mark Attendance
          </h3>

          {/* Employee ID */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <label style={{ width: "150px", fontWeight: "bold" }}>
  Employee Code:
</label>

<input
  type="text"
  placeholder="EMP001"
  value={employeeId}
  onChange={(e) => setEmployeeId(e.target.value)}
  style={{ flex: 1, padding: "8px" }}
/>
          </div>

          {/* Date */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <label style={{ width: "150px", fontWeight: "bold" }}>
              Attendance Date:
            </label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>

          {/* Check-in */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <label style={{ width: "150px", fontWeight: "bold" }}>
              Check In Time:
            </label>
            <input
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>

          {/* Check-out */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <label style={{ width: "150px", fontWeight: "bold" }}>
              Check Out Time:
            </label>
            <input
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <label style={{ width: "150px", fontWeight: "bold" }}>
              Status:
            </label>
            <select
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
              <option value="WFH">WFH</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleMarkAttendance}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Mark Attendance
            </button>

            <button
              onClick={() => setShowAttendanceForm(false)}
              style={{
                padding: "10px 20px",
                marginLeft: "10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </>
  )
}
<div
  style={{
    textAlign: "center",
    marginTop: "30px",
    
  }}>
<h3>
  {
    role === "admin"
      ? "Attendance Summary"
      : "My Attendance Summary"
  }
</h3>

{
  role === "admin" && (
    <input
      type="text"
      placeholder="Employee Code"
      value={summaryCode}
      onChange={(e) =>
        setSummaryCode(e.target.value)
      }
    />
  )
}

<button
  onClick={fetchSummary}
  style={{
    marginLeft: "10px",
    backgroundColor: "blue",
    border: "none",
    
    color: "white"
  }}
>
  Get Summary
</button>

<button
  onClick={() => {
    setSummary(null);
    setSummaryCode("");
  }}
  style={{
    marginLeft: "10px",
    backgroundColor: "red",
    border: "none",
    color: "white"
  }}
>
  Clear
</button>
 {
  summary && (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginTop: "15px",
        marginBottom: "20px",
        backgroundColor: "#fee2e2"

      }}
    >
      <h4>
        {summary.employee_name}
      </h4>

      <p>
        Present: {summary.present}
      </p>

      <p>
        Absent: {summary.absent}
      </p>

      <p>
        Leave: {summary.leave}
      </p>

      <p>
        WFH: {summary.wfh}
      </p>

    </div>
  )
}
</div>
    <hr />
<div
  style={{
    textAlign: "center",
    marginTop: "40px",
  }}
>
<h3>
  {
    role === "admin"
      ? "Employee Attendance History"
      : "My Attendance History"
  }
</h3>

{
  role === "admin" && (
    <input
      type="text"
      placeholder="Employee Code"
      value={historyCode}
      onChange={(e) =>
        setHistoryCode(e.target.value)
      }
    />
  )
}

<button
  onClick={fetchHistory}
  style={{
    marginLeft: "10px",
    backgroundColor: "blue",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer"
  }}
>
  Get History
</button>

<button
  onClick={() => {
    setHistory([]);
    setHistoryCode("");
  }}
  style={{
    marginLeft: "10px",
    backgroundColor: "red",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer"
  }}
>
  Clear
</button>
    <hr />
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  }}
>
    {
  history.length > 0 && (
    <table
      border="1"
      cellPadding="10"
      style={{
        marginTop: "15px",
        marginBottom: "20px",
      }}
    >
      <thead>
        <tr>
          <th>Date</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {history.map((record, index) => (
          <tr key={index}>
            <td>
              {record.attendance_date}
            </td>

            <td>
              {record.check_in}
            </td>

            <td>
              {record.check_out}
            </td>

            <td>
              {record.attendance_status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
  )
}
</div>
</div>
{
  role === "admin" && (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Attendance Records
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          overflowX: "auto",
        }}
      >
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.employee_code}</td>
                <td>{record.employee_name}</td>
                <td>{record.attendance_date}</td>
                <td>{record.check_in}</td>
                <td>{record.check_out}</td>
                <td>{record.attendance_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
  style={{
    textAlign: "center",
    marginTop: "20px",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(
        currentPage - 1
      )
    }
  >
    Previous
  </button>

  <span
    style={{
      margin: "0 15px",
      fontWeight: "bold",
    }}
  >
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={
      currentPage === totalPages
    }
    onClick={() =>
      setCurrentPage(
        currentPage + 1
      )
    }
  >
    Next
  </button>
</div>
    </>
  )
}
</div>
</>
);
}
export default Attendance;
