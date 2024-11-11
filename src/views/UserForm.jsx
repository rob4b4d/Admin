import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const [formMode, setFormMode] = useState(id ? 'update' : 'create'); // Added formMode state

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('Admin was successfully updated');
          navigate('/users');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('Admin was successfully created');
          navigate('/users');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input 
              type="text" 
              value={user.name} 
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              readOnly={formMode === 'update'} // Conditionally set readOnly based on formMode
              placeholder="Name"
            />
            <input 
              type="email" 
              value={user.email} 
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              readOnly={formMode === 'update'} // Conditionally set readOnly based on formMode
              placeholder="Email"
            />
            <input 
              type="password" 
              value={user.password} 
              onChange={ev => setUser({ ...user, password: ev.target.value })} 
              placeholder="Password"
            />
            <input 
              type="password" 
              value={user.password_confirmation} 
              onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} 
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
