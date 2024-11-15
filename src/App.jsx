import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [users, setUsers] = useState([]);

  // Fetch users from JSON server
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users", formData)
      .then((response) => {
        setUsers([...users, response.data]);
        setFormData({ name: "", email: "", phone: "" });
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  // Handle user deletion
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="h2">User Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="name">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="phone">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          POST
        </button>
      </form>

      <h2 id="h2">Users List</h2>
      <ul>
        <ol>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.phone}
            </li>
          ))}
        </ol>
      </ul>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.phone}
            <button className="btn1" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
