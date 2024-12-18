import { useEffect, useState, Fragment } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Loader from "../app/Loader.jsx/Loader.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient
      .delete(`/users/${user.id}`)
      .then(() => {
        setNotification("User was successfully deleted");
        getUsers();
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data); // Assuming the API returns an array of users
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Filter conductors only
  const conductors = users.filter((user) => user.role === "conductor");
  console.log(users);

  return (
    <Fragment>
      {loading ? <Loader /> :
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Conductors</h1>
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
              {!loading && conductors.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center">
                      No conductors found.
                    </td>
                  </tr>
                </tbody>
              )}
              {!loading && conductors.length > 0 && (
                <tbody>
                  {conductors.map((u) => (
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
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>}
    </Fragment >
  );
}
