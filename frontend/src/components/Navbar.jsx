import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const username =
    localStorage.getItem("username");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("employee_code");

    navigate("/");
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h2
          style={{
            margin: "0",
          }}
        >
          Attendance Management System
        </h2>

        <p
          style={{
            marginTop: "8px",
            marginBottom: "0",
          }}
        >
          Logged in as: {username} ({role})
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#374151",
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/employees"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Employees
        </Link>

        <Link
          to="/attendance"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Attendance
        </Link>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Navbar;