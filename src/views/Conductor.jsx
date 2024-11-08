import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Conductors() {
  const [conductors, setConductors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getConductors();
  }, []);

  const onDeleteClick = (conductor) => {
    if (!window.confirm("Are you sure you want to delete this conductor?")) {
      return;
    }
    axiosClient.delete(`/conductors/${conductor.id}`)
      .then(() => {
        setNotification("Conductor was successfully deleted");
        getConductors();
      });
  };

  const getConductors = () => {
    setLoading(true);
    axiosClient.get("/conductors")
      .then(({ data }) => {
        setLoading(false);
        setConductors(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Conductor</h1>
        <Link className="btn-add" to="/conductors/new">Add new</Link>
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
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {conductors.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={`/conductors/${c.id}`}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => onDeleteClick(c)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
}
