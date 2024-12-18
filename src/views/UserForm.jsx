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
    password_confirmation: '',
    bus_num: '', // Added bus_num
    role: ''
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const roles = ['admin', 'subadmin', 'conductor'];

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

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated');
          navigate('/dashboard');
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
          setNotification('User was successfully created');
          navigate('/dashboard');
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
      {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
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
              placeholder="Name"
            />
            <input 
              type="email" 
              value={user.email} 
              onChange={(e) => setUser({ ...user, email: e.target.value })} 
              placeholder="Email"
            />
            <input 
              type="password" 
              value={user.password} 
              onChange={(e) => setUser({ ...user, password: e.target.value })} 
              placeholder="Password"
            />
            <input 
              type="password" 
              value={user.password_confirmation} 
              onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })} 
              placeholder="Password Confirmation"
            />

            {/* Bus Number Field Before Role */}
            <input 
              type="text" 
              value={user.bus_num || ''} 
              onChange={(e) => setUser({ ...user, bus_num: e.target.value })} 
              placeholder="Bus Number"
            />

            {/* Conditionally hide the role selection if the user is a conductor */}
            {user.role !== 'conductor' && (
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  className="form-control"
                  value={user.role || ''}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
