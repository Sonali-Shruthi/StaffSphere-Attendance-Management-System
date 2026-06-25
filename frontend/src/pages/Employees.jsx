import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [designation, setDesignation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
const [currentPage, setCurrentPage] = useState(1);

const employeesPerPage = 7;
const [editEmployeeCode, setEditEmployeeCode] = useState("");
const role =
  localStorage.getItem("role");
const [editEmployeeName, setEditEmployeeName] = useState("");
const [editEmail, setEditEmail] = useState("");
const [editMobile, setEditMobile] = useState("");
const [editDepartmentId, setEditDepartmentId] = useState("");
const [editDesignation, setEditDesignation] = useState("");
const [editStatus, setEditStatus] = useState("");
  useEffect(() => {
    fetchEmployees();
  }, [search]);
//fetchemp runs automatically and runs whenever search val is changed
  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/employees?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(response.data);

    } catch (error) {
      console.error(error);
      alert("Failed to load employees");
    }
  };
  const handleAddEmployee = async () => {
  const token = localStorage.getItem("token");

  try {
    await axios.post(
      "http://127.0.0.1:5000/employees",
      {
        employee_code: employeeCode,
        employee_name: employeeName,
        email: email,
        mobile: mobile,
        department_id: departmentId,
        designation: designation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Employee Added Successfully");

    setEmployeeCode("");
    setEmployeeName("");
    setEmail("");
    setMobile("");
    setDepartmentId("");
    setDesignation("");

    setShowForm(false);

    fetchEmployees();

  } catch (error) {
    console.error(error);
    alert("Failed to add employee");
  }
};

    const handleDeleteEmployee = async (employeeCode) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this employee?"
);

if (!confirmDelete) {
  return;
}

const token = localStorage.getItem("token");

try {
  await axios.delete(
    `http://127.0.0.1:5000/employees/${employeeCode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Employee Deleted Successfully");

  fetchEmployees();

} catch (error) {
  console.error(error);
  alert("Failed to delete employee");
}

};

const handleEditClick = (employee) => {

  setIsEditing(true);

  setEditEmployeeCode(
    employee.employee_code
  );

  setEditEmployeeName(
    employee.employee_name
  );

  setEditEmail(
    employee.email
  );

  setEditMobile(
    employee.mobile
  );

  setEditDepartmentId(
    employee.department_id
  );

  setEditDesignation(
    employee.designation
  );

  setEditStatus(
    employee.status
  );
};
const handleUpdateEmployee = async () => {

  const token =
    localStorage.getItem("token");

  try {

    await axios.put(
      `http://127.0.0.1:5000/employees/${editEmployeeCode}`,
      {
        employee_name: editEmployeeName,
        email: editEmail,
        mobile: editMobile,
        department_id: editDepartmentId,
        designation: editDesignation,
        status: editStatus,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert(
      "Employee Updated Successfully"
    );

    setIsEditing(false);

    fetchEmployees();

  } catch (error) {

    console.error(error);

    alert(
      "Failed to update employee"
    );
  }
};
const indexOfLastEmployee =
  currentPage * employeesPerPage;

const indexOfFirstEmployee =
  indexOfLastEmployee - employeesPerPage;

const currentEmployees =
  employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

const totalPages = Math.ceil(
  employees.length / employeesPerPage
);
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
  Employee Management
</h1>
        <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
          style={{
            padding: "10px",
            width: "300px",
            marginBottom: "20px",
          }}
        />
        {
  role === "admin" && (
    <button
      onClick={() =>
        setShowForm(!showForm)
      }
      style={{
      marginLeft: "10px",
    }}
    >
      Add Employee
    </button>
    
  )
}
</div>
        {
  showForm && (
     <div
      style={{
        width: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#ffffff",
      }}
    >

      <h3>Add Employee</h3>

      <input
        placeholder="Employee Code"
        style={{
  width: "90%",
  padding: "10px",
}}
        value={employeeCode}
        onChange={(e) =>
          setEmployeeCode(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Employee Name"
        value={employeeName}
        style={{
  width: "90%",
  padding: "10px",
}}
        onChange={(e) =>
          setEmployeeName(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        style={{
  width: "90%",
  padding: "10px",
}}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Mobile"
        value={mobile}
        style={{
  width: "90%",
  padding: "10px",
}}
        onChange={(e) =>
          setMobile(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Department ID"
        value={departmentId}
        style={{
  width: "90%",
  padding: "10px",
}}
        onChange={(e) =>
          setDepartmentId(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Designation"
        value={designation}
        style={{
  width: "90%",
  padding: "10px",
}}
        onChange={(e) =>
          setDesignation(e.target.value)
        }
      />

      <br /><br />
        <button
  onClick={handleAddEmployee}
  style={{
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Save
</button>
      <button
  onClick={() => setShowForm(false)}
  style={{
    marginLeft: "10px",
  }}
>
  Hide Form
</button>

      <hr />

    </div>
  )
}
    {
  isEditing && (
    <div
      style={{
        width: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#ffffff",
      }}
    >

      <h3>Edit Employee</h3>

      <input
      style={{
    width: "90%",
    padding: "10px",
  }}
        value={editEmployeeName}
        onChange={(e) =>
          setEditEmployeeName(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
        style={{
    width: "90%",
    padding: "10px",
  }}
        value={editEmail}
        onChange={(e) =>
          setEditEmail(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
      style={{
    width: "90%",
    padding: "10px",
  }}
        value={editMobile}
        onChange={(e) =>
          setEditMobile(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
      style={{
    width: "90%",
    padding: "10px",
  }}
        value={editDepartmentId}
        onChange={(e) =>
          setEditDepartmentId(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
      style={{
    width: "90%",
    padding: "10px",
  }}
        value={editDesignation}
        onChange={(e) =>
          setEditDesignation(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
      style={{
    width: "90%",
    padding: "10px",
  }}
        value={editStatus}
        onChange={(e) =>
          setEditStatus(
            e.target.value
          )
        }
      />

      <br /><br />

      <button
  onClick={handleUpdateEmployee}
  style={{
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Update
</button>

<button
  onClick={() => setIsEditing(false)}
  style={{
    marginLeft: "10px",
    padding: "10px 20px",
  }}
>
  Hide Form
</button>

      <hr />

    </div>
  )
}
    <div
  style={{
    marginTop: "20px",
    overflowX: "auto",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    alignItems: "center",
    }}
  >
        <table border="1" cellPadding="10" >
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Status</th>
               {
                    role === "admin" && (
                    <th>Actions</th>
                            )
                }
            </tr>
          </thead>

          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.employee_code}>
                <td>{employee.employee_code}</td>
                <td>{employee.employee_name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.status}</td>
                
  {
  role === "admin" && (
    <td>
    <button
      onClick={() =>
        handleEditClick(employee)
      }
    >
      Edit
    </button>
  


  {" "}

  
    <button
      onClick={() =>
        handleDeleteEmployee(
          employee.employee_code
        )
      }
    >
      Delete
    </button>
     </td>
  ) 
}

   </tr>
            ))}
          </tbody>
        </table>
        <div
  style={{
    textAlign: "center",
    marginTop: "20px",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
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
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    Next
  </button>
</div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Employees;