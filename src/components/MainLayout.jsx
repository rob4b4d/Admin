import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  console.log({ user })

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);

  // Define role-based links
  const links = [
    { to: '/dashboard', text: 'Dashboard', roles: [ 'admin', 'users'] },
    { to: '/users', text: 'Users', roles: ['admin'] },
    { to: '/conductor', text: 'Conductors', roles: ['admin', 'users'] },
    { to: '/income', text: 'Income', roles: ['admin', 'users'] },
  ];

  // Filter links based on user's role
  const accessibleLinks = links
  .filter(link => !link.roles || link.roles.length === 0 || link.roles.includes(user.role))
  .map(({ to, text }) => ({ to, text }));
  
  return (
    <div id="defaultLayout">
      {/* Render Sidebar with accessible links */}
      <Sidebar links={accessibleLinks} />
      <div className="content">
      <Header 
          title={user.role === 'admin' ? 'Admin' : 'User'} 
          onLogout={(e) => onLogout(e)} 
          name={user.name} 
        />
        <main>
          <Outlet />
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  );
}
