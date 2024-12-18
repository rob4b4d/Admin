import { Fragment, useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Loader from "../app/Loader.jsx/Loader.jsx";

export default function SubAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this Admin?")) {
      return;
    }
    axiosClient
      .delete(`/users/${user.id}`)
      .then(() => {
        setNotification("Admin was successfully deleted");
        getUsers();
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data); // Save all users, we will filter later
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Filter only subadmin accounts
  const subadmins = users.filter((user) => user.role !== "conductor");

  return (
    <Fragment>
      {loading ? <Loader /> :
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin</h1>
        <Link className="btn-add" to="/users/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {subadmins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No subadmin accounts found.
                  </td>
                </tr>
              ) : (
                subadmins.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={"/users/" + u.id}>
                        Edit
                      </Link>
                      &nbsp;
                      <button className="btn-delete" onClick={(ev) => onDeleteClick(u)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>}
    </Fragment>
  );
}
