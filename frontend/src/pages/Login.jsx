import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          username,
          password,
        }
      );
      

      localStorage.setItem(
        "token",
        response.data.token
      );
      localStorage.setItem(
  "role",
  response.data.role
);

localStorage.setItem(
  "employee_code",
  response.data.employee_code
);

localStorage.setItem(
  "username",
  response.data.username
);

      localStorage.setItem(
       "role",
       response.data.role
);

localStorage.setItem(
  "username",
  response.data.username
);

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid username or password");
    }
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Employee Attendance Management</h1>

        <h2>Sign In</h2>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Enter username"
          />

          <label>Password</label>

          <div className="password-container">

            <input
              type= "password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
            />

            

          </div>

          <div className="button-group">

            <button
              type="submit"
              className="submit-btn"
            >
              Submit
            </button>

            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;