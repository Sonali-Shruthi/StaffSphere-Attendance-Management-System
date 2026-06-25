import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const dashboardResponse = await axios.get(
          "http://127.0.0.1:5000/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const departmentResponse = await axios.get(
          "http://127.0.0.1:5000/dashboard/department-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(dashboardResponse.data);
        setDepartments(departmentResponse.data);

      } catch (error) {
        console.error(error);
        alert("Failed to load dashboard");
      }
    };

    fetchDashboardData();
  }, []);

   return (
  <>
    <Navbar />

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
  Dashboard
</h1>

      {stats && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
            marginBottom: "30px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fef3c7",
              borderRadius: "10px",
              padding: "20px",
              width: "220px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Total Employees</h3>
            <h1>{stats.total_employees}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#dbeafe",
              borderRadius: "10px",
              padding: "20px",
              width: "220px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Active Employees</h3>
            <h1>{stats.active_employees}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#dcfce7",
              borderRadius: "10px",
              padding: "20px",
              width: "220px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Present Today</h3>
            <h1>{stats.present_today}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#fee2e2",
              borderRadius: "10px",
              padding: "20px",
              width: "220px",
              textAlign: "center",
              
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Absent Today</h3>
            <h1>{stats.absent_today}</h1>
          </div>
        </div>
      )}

      <h2
  style={{
    textAlign: "center",
  }}
>
  Department Wise Employee Count
</h2>
    <div
  style={{
    display: "flex",
    justifyContent: "center",
  }}
>
      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "500px",
          marginTop: "15px",
           textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Department</th>
            <th>Employee Count</th>
          </tr>
        </thead>

        <tbody>
  {departments.map((dept) => (
    <tr key={dept.department}>
      <td>{dept.department}</td>

      <td
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
             {dept.employee_count}
             </td>
         </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  </>
);
}

export default Dashboard;