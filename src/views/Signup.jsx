import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  // Email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = (ev) => {
    ev.preventDefault();

    // Reset the form errors on each submit attempt
    setFormErrors({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });
    setEmailError(''); // Reset the email error

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;

    let valid = true;

    // Check if any required fields are empty and show error messages
    if (!name) {
      setFormErrors((prev) => ({ ...prev, name: 'The name field is required.' }));
      valid = false;
    }
    if (!email) {
      setFormErrors((prev) => ({ ...prev, email: 'The email field is required.' }));
      valid = false;
    }
    if (!password) {
      setFormErrors((prev) => ({ ...prev, password: 'The password field is required.' }));
      valid = false;
    }
    if (!passwordConfirmation) {
      setFormErrors((prev) => ({
        ...prev,
        passwordConfirmation: 'The password confirmation field is required.',
      }));
      valid = false;
    }

    // Email validation
    if (email && !emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    if (!valid) return; // Prevent form submission if validation fails

    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>

          {/* Display form-wide error if any field is empty */}
          {Object.values(formErrors).some((error) => error) && (
            <div className="alert">
              {Object.values(formErrors).map((error, idx) =>
                error ? <p key={idx} className="error-message">{error}</p> : null
              )}
            </div>
          )}

          {/* Display email validation error if present */}
          {emailError && (
            <div className="alert">
              <p className="error-message">{emailError}</p>
            </div>
          )}

          {/* Display other validation errors from backend */}
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key} className="error-message">{errors[key][0]}</p>
              ))}
            </div>
          )}

          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
